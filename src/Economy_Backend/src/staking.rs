// staking.rs

use ic_cdk::api::time; // Ensure this is correctly imported
use ic_principal::Principal;
use crate::types::{StakerInfo, DAOState};

/// Stakes tokens by transferring them to the treasury and updating staker records.
pub fn stake_tokens(user: Principal, amount: u64, dao_state: &mut DAOState) -> Result<(), String> {
    // Ensure the stake amount is greater than zero
    if amount == 0 {
        return Err("Stake amount must be greater than zero.".to_string());
    }

    // Get the current time
    let current_time = time();

    // Get or create staker information
    let staker_info = dao_state.stakers.entry(user).or_insert(StakerInfo {
        amount: 0,
        start_time: current_time,
    });

    // Update staked amount and start time
    staker_info.amount += amount;
    staker_info.start_time = current_time;

    // Move staked tokens to the treasury
    dao_state.treasury_pool += amount; 
    Ok(())
}

/// Calculates rewards for a staker based on their staked amount and time.
pub fn calculate_rewards(user: &Principal, dao_state: &DAOState) -> u64 {
    if let Some(staker_info) = dao_state.stakers.get(user) {
        // Calculate staking duration in nanoseconds
        let staking_duration = time() - staker_info.start_time;
        let reward_rate = 0.01; // Example reward rate (1% per day).
        let days_staked = staker_info.days_staked();
        // Calculate rewards using proper type casting
        let rewards = (staker_info.amount as f64 * reward_rate *((1.0 + ((days_staked as f64 / 30.0).floor() * 0.1) + ((staker_info.amount as f64 / 1000.0) * 0.1)).min(3.0))) as u64;
        
        

        // Return the calculated rewards
        rewards
    } else {
        0 // If the user is not a staker, return 0 rewards
    }
}
