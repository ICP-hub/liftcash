use candid::{CandidType, Decode, Encode, Principal};
use ic_cdk::api::time;
use ic_stable_structures::{StableCell, memory_manager::{MemoryManager, MemoryId, VirtualMemory}, DefaultMemoryImpl, Storable};
use serde::Deserialize;
use std::{borrow::Cow, cell::RefCell, collections::HashMap};

use crate::{SurveyData, SurveyResponse, UserClaim, VoteData, VoteResponse, STAGE_DURATION};

pub type VMem = VirtualMemory<DefaultMemoryImpl>;
pub const VOTING_SYSTEM_MEMORY_ID: MemoryId = MemoryId::new(1);

thread_local! {
    pub static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );
    
    pub static VOTING_SYSTEM_CELL: RefCell<StableCell<VotingSystem, VMem>> = RefCell::new({
        let memory = MEMORY_MANAGER.with(|mm| mm.borrow().get(VOTING_SYSTEM_MEMORY_ID));
        StableCell::init(memory, VotingSystem::new()).expect("Failed to initialize VotingSystem")
    });
}

#[derive(Default,CandidType,Deserialize,Clone)]
pub struct VotingSystem {
    pub current_week: u64,
    pub last_week: u64,
    pub iteration_count: u64,
    pub participation_count: HashMap<u8, u64>,
    pub last_stage_timestamp: u64,
    pub survey_responses: HashMap<Principal, SurveyData>,
    pub voting_responses: HashMap<Principal, VoteData>,
    pub ratification_responses: HashMap<Principal, bool>,
    pub ratification_results: HashMap<String, u64>,
    pub weekly_participation: HashMap<Principal, UserClaim>, // Ensure this is defined
    pub weekly_survey_results: HashMap<u64, Vec<(String, String)>>,
    pub weekly_vote_results: HashMap<u64, HashMap<String, VoteResponse>>, // Store vote results per week
    pub weekly_ratification_counts: HashMap<u64, HashMap<String, u64>>, 
}


impl Storable for VotingSystem {
    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;

    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), VotingSystem).unwrap()
    }
}

impl VotingSystem {
    pub fn new() -> Self {
        let mut instance: VotingSystem = VotingSystem {
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

    pub fn start_new_week(&mut self) {
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
    
    pub fn check_and_close_stage(&mut self) {
        let current_time = time();
        if current_time >= self.last_stage_timestamp + STAGE_DURATION {
            self.start_new_week();
        }
    }

    pub fn submit_survey(&mut self, user_id: Principal, answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
        // self.check_and_close_stage();
        // let user_id_str = user_id.to_text(); 
        self.survey_responses.insert(user_id.clone(), answers);

        self.participation_count.entry(0).or_insert(0);
        *self.participation_count.get_mut(&0).unwrap() += 1;

        self.weekly_participation.entry(user_id).and_modify(|claim| {
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

    pub fn submit_vote(&mut self, user_id: Principal, votes: HashMap<String, VoteResponse>) -> Result<(), String> {
        // self.check_and_close_stage();
        self.voting_responses.insert(user_id, votes.clone());

        self.participation_count.entry(1).or_insert(0);
        *self.participation_count.get_mut(&1).unwrap() += 1;

        self.weekly_participation.entry(user_id).and_modify(|claim| {
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

    pub fn submit_ratification(&mut self, user_id: Principal, _approve: bool) -> Result<(), String> {
        // Check if the current week is valid
        if self.current_week == 0 {
            return Err("No current week available".to_string());
        }
    
        if let Some(claim) = self.weekly_participation.get_mut(&user_id) {
            // Check if the user has voted in the current week using the mutable reference
            if claim.has_voted {
                self.ratification_responses.insert(user_id, _approve);
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
    

    pub fn calculate_survey_results(&self, current_week: u64) -> Vec<(String, String)> {
        let mut results = Vec::new(); // Store results as tuples of (question_id, result)
    
        let mut average_data: HashMap<String, (u32, u32)> = HashMap::new(); // (total, count)
        let mut majority_data: HashMap<String, HashMap<String, usize>> = HashMap::new(); // Counts for choices
    
        // Iterate through all survey responses
        for (_user_id, answers) in &self.survey_responses {
            for (question_id, response) in answers {
                match response {
                    SurveyResponse::PercentageSlider(value) => {
                        let entry = average_data.entry(question_id.clone()).or_insert((0, 0));
                        entry.0 += *value as u32; // Increment total
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
    
        // Process average data
        for (question_id, (total, count)) in average_data {
            if count > 0 {
                let average = total as u32 / count as u32; // Calculate average
                results.push((question_id, format!("Average: {:.2}", average)));
            } else {
                results.push((question_id, format!("Average: N/A")));
            }
        }
    
        // Process majority data for MultipleChoice and Dropdown questions
        for (question_id, counts) in majority_data {
            if let Some((majority_response, _)) = counts.iter().max_by_key(|entry| entry.1) {
                results.push((question_id, format!("Majority: {}", majority_response)));
            } else {
                results.push((question_id, format!("Majority: N/A")));
            }
        }
    
        results // Return results without modifying state
    }
    
    
    pub fn calculate_average_votes(&self, current_week: u64) -> HashMap<String, VoteResponse> {
        let mut result: HashMap<String, VoteResponse> = HashMap::new(); 
        let mut average_responses: HashMap<String, (u32, u32)> = HashMap::new();
    
        // Iterate through all voting responses
        for (_user_id, user_votes) in &self.voting_responses {
            for (question_id, vote) in user_votes {
                match vote {
                    VoteResponse::PercentageVote(value) => {
                        let entry = average_responses.entry(question_id.clone()).or_insert((0, 0));
                        entry.0 += *value as u32; // Add vote value to total
                        entry.1 += 1; // Increment count
                    }
                }
            }
        }
    
        // Compute average votes
        for (question_id, (total, count)) in average_responses {
            let average = total as u8 / count as u8; // Calculate average
            let average_vote = VoteResponse::PercentageVote(average);
            result.insert(question_id, average_vote);
        }
    
        result // Return results without modifying state
    }

    pub fn calculate_ratification_results(&self, week: u64) -> HashMap<String, u64> {
        if let Some(week_results) = self.weekly_ratification_counts.get(&week) {
            week_results.clone()
        } else {
            HashMap::new()
        }
    }
    

    pub fn calculate_total_claim(&self, user_id: Principal) -> Option<u8> {
        if let Some(claim) = self.weekly_participation.get(&user_id) {
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


    pub fn return_self(&self) -> Self{
        return  self.clone();
    }
}