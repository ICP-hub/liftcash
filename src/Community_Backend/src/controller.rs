use crate::constants::{PHASE_DURATION, RESULTS_DURATION};
use crate::Phase;
use crate::STATE;
use crate::USERNAME_SET;
use crate::USER_MAP;
use crate::{
    SurveyResponse, VoteResponse, VotingSystem, MEMORY_MANAGER, VOTING_SYSTEM_CELL,
    VOTING_SYSTEM_MEMORY_ID,
};
use candid::Principal;
use ic_cdk::api::call::CallResult;
use ic_cdk::{api, call, caller, init, query, update};
use ic_stable_structures::StableCell;
use std::collections::BTreeMap;
use std::collections::HashMap;

pub fn read_voting_system<R>(f: impl FnOnce(&VotingSystem) -> R) -> R {
    VOTING_SYSTEM_CELL.with(|cell| {
        let voting_system = cell.borrow();
        f(voting_system.get())
    })
}

// #[query]
// pub fn tsts(){
//     read_voting_system(|state| state.)
// }

pub fn mutate_voting_system<R>(f: impl FnOnce(&mut VotingSystem) -> R) -> R {
    VOTING_SYSTEM_CELL.with(|cell| {
        let mut state = cell.borrow_mut();
        let mut voting_system = state.get().clone(); // Make sure to clone if needed for mutability
        let result = f(&mut voting_system);
        state
            .set(voting_system)
            .expect("Failed to update VotingSystem in stable memory"); // Save the new state
        result
    })
}

#[init]
pub fn init() {
    VOTING_SYSTEM_CELL.with(|cell| {
        *cell.borrow_mut() = StableCell::init(
            MEMORY_MANAGER.with(|mm| mm.borrow().get(VOTING_SYSTEM_MEMORY_ID)),
            VotingSystem::default(),
        )
        .expect("Failed to initialize VotingSystem");
    });
    mutate_voting_system(|voting_system| {
        voting_system.start_new_week();
    });
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.current_phase = Phase::Survey;
        state.phase_start_time = ic_cdk::api::time();
    });
}

// #[update]
// pub fn start_new_week() {
//     mutate_voting_system(|voting_system| {
//         voting_system.start_new_week();
//     });
// }
#[update]
pub fn start_new_week() {
    mutate_voting_system(|voting_system| {
        // Record the votes for the week
        if let Some(current_week) = voting_system.current_week.checked_sub(1) {
            if !voting_system
                .weekly_vote_results
                .contains_key(&current_week)
            {
                let vote_results = voting_system.calculate_average_votes(current_week);
                voting_system
                    .weekly_vote_results
                    .insert(current_week, vote_results);
            }
        }
        // Start a new week
        voting_system.start_new_week();
    });
}

#[update]
pub fn submit_survey(answers: HashMap<String, SurveyResponse>) -> Result<(), String> {
    let current_phase = STATE.with(|state| state.borrow().current_phase.clone());

    if current_phase != Phase::Survey {
        return Err("Survey submissions are only allowed during the Survey phase.".to_string());
    }
    mutate_voting_system(|voting_system| voting_system.submit_survey(caller(), answers))
}

#[update]
pub fn submit_vote(votes: HashMap<String, VoteResponse>) -> Result<(), String> {
    let current_phase = STATE.with(|state| state.borrow().current_phase.clone());

    ic_cdk::println!("hey {:?}",votes);

    if current_phase != Phase::Vote {
        return Err("Vote submissions are only allowed during the vote phase.".to_string());
    }
    mutate_voting_system(|voting_system| voting_system.submit_vote(caller(), votes))
}

#[update]
pub fn submit_ratification(ratify: bool) -> Result<(), String> {
    let current_phase = STATE.with(|state| state.borrow().current_phase.clone());
    if current_phase != Phase::Ratify {
        return Err("Ratify submissions are only allowed during the Ratify phase.".to_string());
    }
    mutate_voting_system(|voting_system| voting_system.submit_ratification(caller(), ratify))
}

#[query]
pub fn calculate_total_claim(principal: Principal) -> Option<u8> {
    read_voting_system(|voting_system| {
        // voting_system.calculate_total_claim(user_id)
        voting_system.calculate_total_claim(principal)
    })
}

#[query]
pub fn get_survey_results() -> Vec<(String, String)> {
    mutate_voting_system(|voting_system| {
        let current_phase = STATE.with(|state| state.borrow().current_phase.clone());
        if current_phase != Phase::SurveyResults {
            return Vec::new();
        }
        let last_week = voting_system.last_week;
        voting_system.calculate_survey_results(last_week)
    })
}

#[query]
pub fn get_average_votes() -> HashMap<String, VoteResponse> {
    read_voting_system(|voting_system| {
        let current_phase = STATE.with(|state| state.borrow().current_phase.clone());
        if current_phase != Phase::Ratify && current_phase != Phase::RatifyResults {
            return HashMap::new(); // Return empty if the phase is not completed
        }
        let last_week = voting_system.last_week;
        voting_system.calculate_average_votes(last_week)
    })
}

#[query]
pub fn get_ratification_results() -> HashMap<String, u64> {
    read_voting_system(|voting_system| {
        let current_phase = STATE.with(|state| state.borrow().current_phase.clone());
        if current_phase != Phase::RatifyResults {
            return HashMap::new();
        }
        voting_system.calculate_ratification_results(voting_system.current_week)
    })
}

#[query]
pub fn get_weekly_survey_results() -> Vec<(u64, Vec<(String, String)>)> {
    mutate_voting_system(|voting_system| {
        let mut results = Vec::new();
        let mut weeks: Vec<u64> = voting_system
            .weekly_survey_results
            .keys()
            .cloned()
            .collect();
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
    read_voting_system(|voting_system| voting_system.weekly_ratification_counts.clone())
}

#[query]
pub fn chck_userparticipation_vote() -> &'static str {
    let principal = caller();

    read_voting_system(|voting_system| {
        if voting_system.has_voted_in_current_week(principal) {
            "Yes"
        } else {
            "No"
        }
    })
}

#[ic_cdk_macros::heartbeat]
pub fn heartbeat() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let now = ic_cdk::api::time();
        if state.current_phase == Phase::Uninitialized {
            start_new_week();
            state.current_phase = Phase::Survey;
            state.phase_start_time = now;
        }

        let elapsed = now - state.phase_start_time;

        let phase_duration = match state.current_phase {
            Phase::Survey | Phase::Vote | Phase::Ratify => PHASE_DURATION,
            Phase::SurveyResults | Phase::RatifyResults => RESULTS_DURATION,
            _ => 0,
        };

        // Calculate remaining time for the current phase
        let remaining_time = phase_duration - elapsed;
        state.remaining_time = remaining_time;

        match state.current_phase {
            Phase::Survey if elapsed >= PHASE_DURATION => {
                mutate_voting_system(|voting_system| {
                    let week = voting_system.last_week;
                    voting_system.calculate_survey_results(week);
                });
                state.current_phase = Phase::SurveyResults;
                state.phase_start_time = now;
            }
            Phase::SurveyResults if elapsed >= RESULTS_DURATION => {
                state.current_phase = Phase::Vote;
                state.phase_start_time = now;
            }
            Phase::Vote if elapsed >= PHASE_DURATION => {
                mutate_voting_system(|voting_system| {
                    let week = voting_system.last_week;
                    // Calculate and store vote results
                    let vote_results = voting_system.calculate_average_votes(week);
                    voting_system
                        .weekly_vote_results
                        .insert(week + 1, vote_results);
                });
                state.current_phase = Phase::Ratify;
                state.phase_start_time = now;
            }
            Phase::Ratify if elapsed >= PHASE_DURATION => {
                mutate_voting_system(|voting_system| {
                    let week = voting_system.last_week;
                    voting_system.calculate_ratification_results(week);
                });
                ic_cdk::spawn(async move {
                    trigger_reward_mechanism().await;
                });
                state.current_phase = Phase::RatifyResults;
                state.phase_start_time = now;
            }
            Phase::RatifyResults if elapsed >= RESULTS_DURATION => {
                start_new_week();
                state.current_phase = Phase::Survey;
                state.phase_start_time = now;
            }
            _ => {}
        }
    });
}

fn sort_records(
    data: HashMap<u64, HashMap<String, VoteResponse>>,
) -> Vec<(u64, BTreeMap<String, VoteResponse>)> {
    // Step 1: Sort the inner hashmap (questions) by key
    let mut sorted_data: Vec<(u64, BTreeMap<String, VoteResponse>)> = data
        .into_iter()
        .map(|(week, votes)| {
            // Convert the inner HashMap into a sorted BTreeMap
            let sorted_votes: BTreeMap<_, _> = votes.into_iter().collect();
            (week, sorted_votes)
        })
        .collect();

    // Step 2: Sort the outer array by week number
    sorted_data.sort_by_key(|(week, _)| *week);

    sorted_data
}

#[update]
pub async fn trigger_reward_mechanism() -> () {
    ic_cdk::println!("Triggering reward mechanism: Distributing rewards for the week.");

    // Fetch weekly issuance percentage
    let weekly_issuance_percentage = get_weekly_vote_results(); // fetch vote results instead of get_average_votes

    // Sort the weekly issuance percentage in ascending order
    let sorted_data = sort_records(weekly_issuance_percentage);

    ic_cdk::println!("Weekly issuance percentage: {:#?}", sorted_data);

    // Fetch the last element of the sorted data
    match sorted_data.last() {
        Some((week, votes)) => {
            ic_cdk::println!("Last week: {}", week);

            // Fetch the first item from the votes map
            match votes.iter().next() {
                Some((question, response)) => {
                    match response {
                        VoteResponse::PercentageVote(value) => {
                            ic_cdk::println!("First question: {}, Value: {}", question, value);

                            // Inter-Canister call to the Economics Canister
                            // let economics_canister_id =
                            //     Principal::from_text("bd3sg-teaaa-aaaaa-qaaba-cai").unwrap();

                            let economics_canister_id = option_env!("CANISTER_ID_ECONOMY_BACKEND")
                                .expect("ECONOMICS_CANISTER_ID env var not set")
                                .parse::<Principal>()
                                .expect("Invalid Economics Canister ID");

                            let float_value = *value as f64;

                            let res = kaires::call_inter_canister::<f64, String>(
                                "distribute_rewards",
                                float_value,
                                economics_canister_id,
                            )
                            .await
                            .expect("Error in inter canister");
                            ic_cdk::println!("response is: {}", res);
                        }
                    }
                }
                None => {
                    ic_cdk::println!("Votes map is empty.");
                }
            }
        }
        None => {
            ic_cdk::println!("No data available.");
        }
    }
}

#[query]
pub fn get_current_phase_info() -> (Phase, u64) {
    STATE.with(|state| {
        let state = state.borrow();
        (state.current_phase.clone(), state.remaining_time)
    })
}

#[update]
fn set_user(username: String) -> Result<String, String> {
    let principal = caller();

    USER_MAP.with(|user_map| {
        USERNAME_SET.with(|username_set| {
            let mut map = user_map.borrow_mut();
            let mut set = username_set.borrow_mut();

            // Check if the principal already exists in the map
            if let Some(existing_username) = map.get(&principal) {
                if existing_username == &username {
                    return Ok("Username is already set and correct.".to_string());
                } else {
                    return Err(
                        "Error: The provided username does not match the existing one.".to_string(),
                    );
                }
            }

            // Ensure the username is not already used by another principal
            if set.contains(&username) {
                return Err("Error: The username is already taken.".to_string());
            }

            // If the username and principal are unique, add to both USER_MAP and USERNAME_SET
            map.insert(principal, username.clone());
            set.insert(username.clone());

            Ok(format!("Username '{}' set successfully.", username))
        })
    })
}

#[update]
fn get_user() -> Option<(Principal, String)> {
    let principal = caller();
    USER_MAP.with(|user_map| {
        user_map
            .borrow()
            .get(&principal)
            .map(|username| (principal, username.clone()))
    })
}

#[update]
fn get_all_users() -> Vec<(Principal, String)> {
    USER_MAP.with(|user_map| {
        user_map
            .borrow()
            .iter()
            .map(|(principal, username)| (*principal, username.clone()))
            .collect()
    })
}

#[query]
pub fn whoiam() -> Principal {
    api::caller()
}

#[update]
pub fn get_all_claim_percentages() -> Vec<(Principal, u8)> {
    read_voting_system(|voting_system| voting_system.get_all_claim_percentages())
}

#[query]
pub fn get_week_count() -> u64 {
    let weekly_vote_result = get_weekly_vote_results();
    let sorted_data = sort_records(weekly_vote_result);

    match sorted_data.last() {
        Some((week, _)) => *week,
        None => 0,
    }
}
