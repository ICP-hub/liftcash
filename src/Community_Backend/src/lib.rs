// mod statehandler;

// pub use statehandler::{
//     submit_survey, submit_vote, submit_ratification,
//     calculate_total_claim, get_survey_results,
//     get_average_votes, get_ratification_results,
//     get_weekly_survey_results, get_weekly_vote_results,
//     get_weekly_ratification_counts,
// };

use ic_cdk_macros::export_candid;
#[macro_use]
extern crate lazy_static;
use ic_cdk::storage;
use serde::{Deserialize, Serialize};
use candid::{CandidType, Decode,Encode};
use candid::utils::ArgumentDecoder;
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

type SurveyData =HashMap<String, SurveyResponse>;
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
    ratification_results: HashMap<String, u64>,
    weekly_participation: HashMap<String, UserClaim>, // Ensure this is defined
    weekly_survey_results: HashMap<u64, Vec<(String, String)>>,
    weekly_vote_results: HashMap<u64, HashMap<String, VoteResponse>>, // Store vote results per week
    weekly_ratification_counts: HashMap<u64, HashMap<String, u64>>, 
}      


const STAGE_DURATION: u64 = 2 * 24 * 60 * 60 + 8 * 60 * 60; // 2 days and 8 hours in seconds

impl VotingSystem {
    fn new() -> Self {
        let mut instance = VotingSystem {
            current_week: 0,
            last_week: 0,
            iteration_count: 0,
            participation_count: HashMap::new(),
            last_stage_timestamp: time(),
            survey_responses: HashMap::new(),
            voting_responses: HashMap::new(),
            ratification_responses: HashMap::new(),
            ratification_results: HashMap::new(),
            weekly_participation: HashMap::new(), // Initialize to match type
            weekly_survey_results: HashMap::new(), // Initialize to match type
            weekly_vote_results: HashMap::new(), // Store vote results per week
            weekly_ratification_counts: HashMap::new(),
        };
        instance
    }

    fn start_new_week(&mut self) {
        self.last_week = self.current_week;
        let results = self.calculate_survey_results(self.last_week);
        self.weekly_survey_results.insert(self.last_week, results);// Ensure this function is defined and returns the expected type
        let vote_results = self.calculate_average_votes(self.last_week);
        self.weekly_vote_results.insert(self.last_week, vote_results);
        let ratification_results = self.calculate_ratification_results(self.last_week);
        self.weekly_ratification_counts.insert(self.last_week, ratification_results);
        self.current_week += 1;
        self.iteration_count += 1;
        self.survey_responses.clear();
        self.voting_responses.clear(); 
        self.ratification_responses.clear(); 
        for (_user_id, claim) in self.weekly_participation.iter_mut() {
        claim.has_voted = false;       // Reset voting status
        claim.has_ratified = false;    // Reset ratification status
        claim.claim_percentage = 0;    // Reset claim percentage if necessary
        }
    }
    
    fn check_and_close_stage(&mut self) {
        let current_time = time();
        if current_time >= self.last_stage_timestamp + STAGE_DURATION {
            self.start_new_week();
        }
    }

    fn submit_survey(&mut self, user_id: &str, answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
        // self.check_and_close_stage();
        self.survey_responses.insert(user_id.to_string(), answers);

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
        // self.check_and_close_stage();
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
        // Check if the current week is valid
        if self.current_week == 0 {
            return Err("No current week available".to_string());
        }
    
        if let Some(claim) = self.weekly_participation.get_mut(user_id) {
            // Check if the user has voted in the current week using the mutable reference
            if claim.has_voted {
                self.ratification_responses.insert(user_id.to_string(), _approve);
                // Update the ratification results count
                let vote_key = if _approve { "Yes" } else { "No" };
                *self.ratification_results.entry(vote_key.to_string()).or_insert(0) += 1;
    
                let week_counts = self.weekly_ratification_counts.entry(self.current_week).or_insert_with(HashMap::new);
                *week_counts.entry(vote_key.to_string()).or_insert(0) += 1;
    
                claim.has_ratified = true;
                claim.claim_percentage += 10;
    
                return Ok(());
            } else {
                return Err("User has not voted in the current week".to_string());
            }
        } else {
            Err("User not eligible for ratification vote".to_string())
        }
    }
    

    fn calculate_survey_results(&mut self, current_week: u64) -> Vec<(String, String)> {
        let mut results = Vec::new(); // Store results as tuples of (question_id, result)
    
        let mut average_data: HashMap<String, (u32, u32)> = HashMap::new(); // (total, count)
        let mut majority_data: HashMap<String, HashMap<String, usize>> = HashMap::new(); // Counts for choices
    
        // Iterate through all survey responses
        for (_user_id, answers) in &self.survey_responses {
            for (question_id, response) in answers{
                match response {
                    SurveyResponse::PercentageSlider(value) => {
                        let entry = average_data.entry(question_id.clone()).or_insert((0, 0));
                        entry.0 += *value as u32; // No need to dereference value
                        entry.1 += 1; // Increment count
                    }
                    SurveyResponse::MultipleChoice(ref choice) => {
                        let entry = majority_data.entry(question_id.clone()).or_insert(HashMap::new());
                        *entry.entry(choice.clone()).or_insert(0) += 1; // Count each choice
                    }
                    SurveyResponse::Dropdown(ref options) => {
                        let entry = majority_data.entry(question_id.clone()).or_insert(HashMap::new());
                        for option in options {
                            *entry.entry(option.clone()).or_insert(0) += 1; // Count each selected option
                        }
                    }
                }
            }
        }

        for (question_id, (total, count)) in average_data {
            if count > 0 {
                let average = total as u32 / count as u32; // Cast to f32 for accurate division
                results.push((question_id, format!("Average: {:.2}", average))); // Store as "Average: X.XX"
            } else {
                results.push((question_id, format!("Average: N/A"))); // Handle no responses case
            }
        }
    
        // Calculate majority responses for MultipleChoice and Dropdown questions
        for (question_id, counts) in majority_data {
            if let Some((majority_response, _)) = counts.iter().max_by_key(|entry| entry.1) {
                results.push((question_id, format!("Majority: {}", majority_response))); // Store as "Majority: X"
            } else {
                results.push((question_id, format!("Majority: N/A"))); // Handle no responses case
            }
        }
    
        // Store the results for the current week
        self.weekly_survey_results.insert(current_week, results.clone());
    
        // Return the results vector
        results
    }
    
    
    fn calculate_average_votes(&mut self,current_week: u64) -> HashMap<String,VoteResponse> {
        
        let mut result: HashMap<String, VoteResponse> = HashMap::new(); 
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

        
        for (question_id, (total, count)) in average_responses {
            let average = total as u8 / count as u8;
            let average_vote = VoteResponse::PercentageVote(average);
            result.insert(question_id, average_vote);
        }

        self.weekly_vote_results.insert(current_week, result.clone());
        result
    }

    fn calculate_ratification_results(&self, week: u64) -> HashMap<String, u64> {
        if let Some(week_results) = self.weekly_ratification_counts.get(&week) {
            week_results.clone()
        } else {
            HashMap::new()
        }
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
fn get_survey_results() -> Vec<(String, String)> {
    let mut voting_system = VOTING_SYSTEM.write().expect("Failed to acquire write lock"); // Change to write lock
    let last_week = voting_system.last_week;
    voting_system.calculate_survey_results(last_week) // Call remains the same
}

#[query]
fn get_average_votes() -> HashMap<String, VoteResponse> {
    let mut voting_system = VOTING_SYSTEM.write().expect("Failed to acquire read lock");
    let last_week = voting_system.last_week;
    voting_system.calculate_average_votes(last_week)
}

#[query]
fn get_ratification_results() -> HashMap<String, u64> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    voting_system.calculate_ratification_results(voting_system.last_week)
}


#[query]
fn get_weekly_survey_results() -> Vec<(u64, Vec<(String, String)>)> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    let mut results = Vec::new();

    // Get the week numbers in descending order
    let mut weeks: Vec<u64> = voting_system.weekly_survey_results.keys().cloned().collect();
    weeks.sort_unstable_by(|a, b| b.cmp(a)); // Sort descending

    // Fetch up to 4 weeks of results
    for week in weeks.iter().take(4) {
        if let Some(week_results) = voting_system.weekly_survey_results.get(week) {
            results.push((*week, week_results.clone()));
        }
    }

    results // Return the vector of week and corresponding results
}

#[query]
fn get_weekly_vote_results() -> HashMap<u64, HashMap<String, VoteResponse>> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");

    // Collect the last 4 weeks of vote results
    let mut results: HashMap<u64, HashMap<String, VoteResponse>> = HashMap::new();
    let mut weeks: Vec<u64> = voting_system.weekly_vote_results.keys().cloned().collect();
    weeks.sort_unstable_by(|a, b| b.cmp(a)); // Sort descending

    for week in weeks.iter().take(4) {
        if let Some(week_results) = voting_system.weekly_vote_results.get(week) {
            results.insert(*week, week_results.clone());
        }
    }

    results
}

#[query]
fn get_weekly_ratification_counts() -> HashMap<u64, HashMap<String, u64>> {
    let voting_system = VOTING_SYSTEM.read().expect("Failed to acquire read lock");
    voting_system.weekly_ratification_counts.clone()
}

export_candid!();