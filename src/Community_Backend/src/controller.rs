use std::collections::HashMap;
use ic_cdk::{caller, init, query, update};
use crate::{SurveyResponse, VoteResponse, VotingSystem, MEMORY_MANAGER, VOTING_SYSTEM_CELL, VOTING_SYSTEM_MEMORY_ID};
use ic_stable_structures::StableCell;


pub fn read_voting_system<R>(f: impl FnOnce(&VotingSystem) -> R) -> R {
    VOTING_SYSTEM_CELL.with(|cell| {
        let voting_system = cell.borrow();
        f(voting_system.get()) // Directly use the reference to VotingSystem
    })
}

pub fn mutate_voting_system<R>(f: impl FnOnce(&mut VotingSystem) -> R) -> R {
    VOTING_SYSTEM_CELL.with(|cell| {
        let mut state = cell.borrow_mut();
        let mut voting_system = state.get().clone(); // Make sure to clone if needed for mutability
        let result = f(&mut voting_system);
        state.set(voting_system).expect("Failed to update VotingSystem in stable memory"); // Save the new state
        result
    })
}


#[init]
pub fn init() {
    VOTING_SYSTEM_CELL.with(|cell| {
        *cell.borrow_mut() = StableCell::init(
            MEMORY_MANAGER.with(|mm| mm.borrow().get(VOTING_SYSTEM_MEMORY_ID)),
            VotingSystem::default(),
        ).expect("Failed to initialize VotingSystem");
    });
}

// #[update (guard = check_anonymous)]
#[update]
pub fn start_new_week() {
    mutate_voting_system(|voting_system| {
        voting_system.start_new_week();
    });
}

#[update]
// fn submit_survey(user_id: Principal, answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
pub fn submit_survey(answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
    // let principal_id = Principal::from_text(&user_id)
    //     .map_err(|e| format!("Invalid Principal format for user_id: {}", e))?;
    mutate_voting_system(|voting_system| {
        voting_system.submit_survey(caller(), answers)
    })
}

#[update]
pub fn submit_vote(votes: HashMap<String, VoteResponse>) -> Result<(), String> {
    mutate_voting_system(|voting_system| {
        voting_system.submit_vote(caller(), votes)
    })
}

#[update]
pub fn submit_ratification(ratify: bool) -> Result<(), String> {
    mutate_voting_system(|voting_system| {
        voting_system.submit_ratification(caller(), ratify)
    })
}

#[query]
pub fn calculate_total_claim() -> Option<u8> {
    read_voting_system(|voting_system| {
        // voting_system.calculate_total_claim(user_id)
        voting_system.calculate_total_claim(caller())
    })
}

#[query]
pub fn get_survey_results() -> Vec<(String, String)> {
    read_voting_system(|voting_system| {
        let last_week = voting_system.last_week;
        voting_system.calculate_survey_results(last_week)
    })
}

#[query]
pub fn get_average_votes() -> HashMap<String, VoteResponse> {
    read_voting_system(|voting_system| {
        let last_week = voting_system.last_week;
        voting_system.calculate_average_votes(last_week)
    })
}

#[query]
pub fn get_ratification_results() -> HashMap<String, u64> {
    read_voting_system(|voting_system| {
        voting_system.calculate_ratification_results(voting_system.last_week)
    })
}

#[query]
pub fn get_weekly_survey_results() -> Vec<(u64, Vec<(String, String)>)> {
    read_voting_system(|voting_system| {
        let mut results = Vec::new();
        let mut weeks: Vec<u64> = voting_system.weekly_survey_results.keys().cloned().collect();
        weeks.sort_unstable_by(|a, b| b.cmp(a)); // Sort descending
        for week in weeks.iter().take(4) {
            if let Some(week_results) = voting_system.weekly_survey_results.get(week) {
                results.push((*week, week_results.clone()));
            }
        }
        results
    })
}

#[query]
pub fn get_weekly_vote_results() -> HashMap<u64, HashMap<String, VoteResponse>> {
    read_voting_system(|voting_system| {
        let mut results = HashMap::new();
        let mut weeks: Vec<u64> = voting_system.weekly_vote_results.keys().cloned().collect();
        weeks.sort_unstable_by(|a, b| b.cmp(a)); // Sort descending
        for week in weeks.iter().take(4) {
            if let Some(week_results) = voting_system.weekly_vote_results.get(week) {
                results.insert(*week, week_results.clone());
            }
        }
        results
    })
}

#[query]
pub fn get_weekly_ratification_counts() -> HashMap<u64, HashMap<String, u64>> {
    read_voting_system(|voting_system| {
        voting_system.weekly_ratification_counts.clone()
    })
}


