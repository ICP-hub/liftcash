use ic_cdk_macros::export_candid;
#[macro_use]
extern crate lazy_static;

use candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, query, update};
use std::collections::HashMap;
use std::sync::RwLock;
use ic_cdk::api::time;
use std::collections::HashSet;


#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, Hash)]
enum SurveyResponse {
    PercentageSlider(u8),
    MultipleChoice(String),
    Dropdown(Vec<String>)
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, Hash)]
enum VoteResponse {
    PercentageVote(u8),
}

#[derive(CandidType, Deserialize, Clone)]
struct UserClaim {
    has_surveyed: bool,
    has_voted: bool,
    has_ratified: bool,
    claim_percentage: u8,
}

type SurveyData = Vec<HashMap<String, SurveyResponse>>;
type VoteData = HashMap<String, VoteResponse>;

#[derive(Default)]
struct VotingSystem {
    current_week: u64,
    last_week: u64,
    iteration_count: u64,
    participation_count: HashMap<u8, u64>,
    last_stage_timestamp: u64,
    survey_responses: HashMap<String, SurveyData>,
    voting_responses: HashMap<String, VoteData>,
    ratification_responses: HashMap<String, bool>,
    last_week_majority_vote: VoteData,
    last_week_ratification: HashMap<String, bool>,
    weekly_participation: HashMap<String, UserClaim>,
    weekly_survey_results: HashMap<u64, (Vec<(String, u8)>, Vec<(String, String)>,Vec<(String, String)>)>,
}

const STAGE_DURATION: u64 = 2 * 24 * 60 * 60 + 8 * 60 * 60; // 2 days and 8 hours in seconds

impl VotingSystem {
    fn new() -> Self {
        VotingSystem {
            current_week: 1,
            last_week: 0,
            iteration_count: 0,
            participation_count: HashMap::new(),
            last_stage_timestamp: time(),
            survey_responses: HashMap::new(),
            voting_responses: HashMap::new(),
            ratification_responses: HashMap::new(),
            last_week_majority_vote: HashMap::new(),
            last_week_ratification: HashMap::new(),
            weekly_participation: HashMap::new(),
            weekly_survey_results: HashMap::new(),
        }
    }

    fn start_new_week(&mut self) {
    
        self.last_week = self.current_week;
        self.last_week_majority_vote = self.calculate_average_votes();
        self.last_week_ratification = self.ratification_responses.clone();
    
        let mut weekly_results: Vec<(String, u8)> = Vec::new();
        let mut weekly_mcq_results: Vec<(String, String)> = Vec::new();
        let mut weekly_dropdown_results: Vec<(String, String)> = Vec::new();

    
        // // Calculate survey results here before modifying self
        // let result = self.calculate_survey_results(self.current_week);
        // weekly_results.extend(result.0);
        // weekly_mcq_results.extend(result.1);
        // weekly_dropdown_results.extend(result.2);
    
        self.weekly_survey_results.insert(self.current_week, (weekly_results, weekly_mcq_results,weekly_dropdown_results));
    
        self.current_week += 1;
        self.iteration_count += 1;
    }
    

    fn check_and_close_stage(&mut self) {
        let current_time = time();
        if current_time >= self.last_stage_timestamp + STAGE_DURATION {
            self.start_new_week();
        }
    }

    fn submit_survey(&mut self, user_id: &str, answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
        self.check_and_close_stage();
        self.survey_responses
            .entry(user_id.to_string())
            .or_insert_with(Vec::new)
            .push(answers.clone());

        self.participation_count.entry(0).or_insert(0);
        *self.participation_count.get_mut(&0).unwrap() += 1;


        self.weekly_participation.entry(user_id.to_string()).and_modify(|claim| {
            claim.has_surveyed = true;
            claim.claim_percentage+=20;
        }).or_insert(UserClaim {
            has_surveyed: true,
            has_voted: false,
            has_ratified: false,
            claim_percentage: 20,
        });

        Ok(())
    }

    fn submit_vote(&mut self, user_id: &str, votes: HashMap<String, VoteResponse>) -> Result<(), String> {
        self.check_and_close_stage();
        self.voting_responses.insert(user_id.to_string(), votes.clone());

        self.participation_count.entry(1).or_insert(0);
        *self.participation_count.get_mut(&1).unwrap() += 1;

        self.weekly_participation.entry(user_id.to_string()).and_modify(|claim| {
            claim.has_voted = true;
            claim.claim_percentage+=70;
        }).or_insert(UserClaim {
            has_surveyed: false,
            has_voted: true,
            has_ratified: false,
            claim_percentage: 70,
        });

        Ok(())
    }

    fn submit_ratification(&mut self, user_id: &str, _approve: bool) -> Result<(), String> {
        self.check_and_close_stage();
        if let Some(claim) = self.weekly_participation.get_mut(user_id) {
            if claim.has_voted {
                claim.has_ratified = true;
                claim.claim_percentage+=10;
                return Ok(())
            }else{
                return  Err("User not eligible for ratification vote".to_string());
            }
        } else {
            Err("User not eligible for ratification vote".to_string())
        }
    }

    fn calculate_survey_results(&mut self, current_week: u64) -> (Vec<(String, u8)>, Vec<(String, String)>, Vec<(String, String)>) {
        let mut average_responses = Vec::new();
        let mut majority_responses = Vec::new();
        let mut dropdown_responses = Vec::new();
    
        let mut average_data: HashMap<String, (u32, u32)> = HashMap::new();
        let mut majority_data: HashMap<String, HashMap<String, usize>> = HashMap::new();
        let mut dropdown_data: HashMap<String, HashMap<String, usize>> = HashMap::new(); // Separate data for Dropdown
    
        // Iterate through all survey responses
        for (_user_id, answer_vec) in &self.survey_responses {
            for answers in answer_vec {
                for (question_id, response) in answers {
                    match response {
                        SurveyResponse::PercentageSlider(value) => {
                            let entry = average_data.entry(question_id.clone()).or_insert((0, 0));
                            entry.0 += *value as u32;
                            entry.1 += 1;
                        }
                        SurveyResponse::MultipleChoice(ref choice) => {
                            let entry = majority_data.entry(question_id.clone()).or_insert(HashMap::new());
                            *entry.entry(choice.clone()).or_insert(0) += 1;
                        }
                        SurveyResponse::Dropdown(ref options) => {
                            let entry = dropdown_data.entry(question_id.clone()).or_insert(HashMap::new());
                            for option in options {
                                *entry.entry(option.clone()).or_insert(0) += 1;  // Count each selected option
                            }
                        }
                    }
                }
            }
        }
    
        // Calculate average responses for slider questions
        for (question_id, (total, count)) in average_data {
            let average = total as u8 / count as u8;
            average_responses.push((question_id, average));
        }
    
        // Calculate majority responses for MultipleChoice questions
        for (question_id, counts) in majority_data {
            if let Some((majority_response, _)) = counts.iter().max_by_key(|entry| entry.1) {
                majority_responses.push((question_id, majority_response.clone()));
            }
        }
    
        // Calculate most selected options for Dropdown questions
        for (question_id, dropdown_counts) in dropdown_data {
            if let Some((most_selected_option, _)) = dropdown_counts.iter().max_by_key(|entry| entry.1) {
                dropdown_responses.push((question_id, most_selected_option.clone()));
            }
        }
    
        // Store the results for the current week with three sets of data (average, majority, and dropdown responses)
        self.weekly_survey_results.insert(current_week, (average_responses.clone(), majority_responses.clone(), dropdown_responses.clone()));
    
        // Return all three sets of responses
        (average_responses, majority_responses, dropdown_responses)
    }
    

    fn calculate_average_votes(&self) -> HashMap<String, VoteResponse> {
        let mut average_responses: HashMap<String, (u32, u32)> = HashMap::new();

        for (_user_id, user_votes) in &self.voting_responses {
            for (question_id, vote) in user_votes {
                match vote {
                    VoteResponse::PercentageVote(value) => {
                        let entry = average_responses.entry(question_id.clone()).or_insert((0, 0));
                        entry.0 += *value as u32;
                        entry.1 += 1;
                    }
                }
            }
        }

        let mut result = HashMap::new();
        for (question_id, (total, count)) in average_responses {
            let average = total as u8 / count as u8;
            let average_vote = VoteResponse::PercentageVote(average);
            result.insert(question_id, average_vote);
        }

        result
    }

    fn calculate_total_claim(&self, user_id: &str) -> Option<u8> {
        if let Some(claim) = self.weekly_participation.get(user_id) {
            let mut total_claim = 0;

            if claim.has_surveyed {
                total_claim += 20;
            }
            if claim.has_voted {
                total_claim += 70;
            }
            if claim.has_ratified {
                total_claim += 10;
            }

            Some(total_claim.min(100))
        } else {
            None
        }
    }

    // fn get_active_users(&self) -> Vec<String> {
    //     self.weekly_participation.iter()
    //         .filter_map(|(user_id, claim)| {
    //             if claim.has_surveyed && claim.has_voted && claim.has_ratified {
    //                 Some(user_id.clone())
    //             } else {
    //                 None
    //             }
    //         })
    //         .collect()
    // }

    // fn get_weekly_survey_results(&self, week: u64) -> Option<&(Vec<(String, u8)>, Vec<(String, String)>)> {
    //     self.weekly_survey_results.get(&week)
    // }
}

lazy_static! {
    static ref VOTING_SYSTEM: RwLock<VotingSystem> = RwLock::new(VotingSystem::new());
}

#[init]
fn init() {
    let mut voting_system = VOTING_SYSTEM.write().expect("Failed to acquire write lock");
    *voting_system = VotingSystem::new();
}

#[update]
fn start_new_week() {
    let mut voting_system = VOTING_SYSTEM.write().expect("Failed to acquire write lock");
    voting_system.start_new_week();
}

#[update]
fn submit_survey(user_id: String, answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
    let mut voting_system = VOTING_SYSTEM.write().map_err(|_| "Failed to acquire write lock")?;
    voting_system.submit_survey(&user_id, answers)
}

#[update]
fn submit_vote(user_id: String, votes: HashMap<String, VoteResponse>) -> Result<(), String> {
    let mut voting_system = VOTING_SYSTEM.write().map_err(|_| "Failed to acquire write lock")?;
    voting_system.submit_vote(&user_id, votes)
}

#[update]
fn submit_ratification(user_id: String, ratify: bool) -> Result<(), String> {
    let mut voting_system = VOTING_SYSTEM.write().map_err(|_| "Failed to acquire write lock")?;
    voting_system.submit_ratification(&user_id, ratify)
}

#[query]
fn calculate_total_claim(user_id: String) -> Option<u8> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    voting_system.calculate_total_claim(&user_id)
}

#[query]
fn get_survey_results() -> (Vec<(String, u8)>, Vec<(String, String)>, Vec<(String, String)>) {
    let mut voting_system = VOTING_SYSTEM.write().expect("Failed to acquire write lock");
    let current_week = voting_system.current_week;
    voting_system.calculate_survey_results(current_week)
}

#[query]
fn get_average_votes() -> HashMap<String, VoteResponse> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    voting_system.calculate_average_votes()
}

// #[query]
// fn get_active_user_ids() -> Vec<String> {
//     let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
//     voting_system.get_active_users()
// }

#[query]
fn get_weekly_survey_results(week: u64) -> Option<(Vec<(String, u8)>, Vec<(String, String)>, Vec<(String, String)>)>{
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    voting_system.weekly_survey_results.get(&week).cloned()
}

export_candid!();