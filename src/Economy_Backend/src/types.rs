// types.rs

use ic_principal::Principal;
use candid::CandidType; // Correct import for CandidType
use serde::Deserialize;
use std::collections::HashMap;

/// Holds information on a staker's staked amount and when they began staking.
#[derive(CandidType, Deserialize, Clone)]
pub struct StakerInfo {
    pub amount: u64,       // The amount of tokens staked.
    pub start_time: u64,   // The time the staking began.
}

impl StakerInfo {
    /// Calculates the number of days staked based on the current time.
    pub fn days_staked(&self) -> u64 {
        let current_time = ic_cdk::api::time(); // Get current time in nanoseconds
        let duration = current_time - self.start_time; // Duration in nanoseconds
        duration / (24 * 60 * 60 * 1_000_000_000) // Convert to days
    }
}

/// Maintains the state of the DAO, tracking stakers, treasury, and reward pools.
#[derive(CandidType, Deserialize, Clone)]
pub struct DAOState {
    pub stakers: HashMap<Principal, StakerInfo>, // Map of stakers and their info.
    pub treasury_pool: u64, // Tokens available in the treasury.
    pub reward_pool: u64,   // Tokens available for rewards.
}
