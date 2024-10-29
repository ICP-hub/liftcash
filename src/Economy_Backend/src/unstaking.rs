// unstaking.rs

use ic_principal::Principal;
use crate::types::{DAOState, StakerInfo};
use crate::staking::calculate_rewards;

/// Sets the cooldown period and unstaking fee percentage.
const COOLDOWN_PERIOD: u64 = 7 * 24 * 3600 * 1_000_000_000; // 7 days in nanoseconds
const UNSTAKE_FEE_PERCENTAGE: f64 = 0.05; // 5% fee for unstaking before cooldown

/// Releases staked tokens and rewards to a staker.
pub fn unstake_tokens(user: Principal, dao_state: &mut DAOState) -> Result<u64, String> {
    if let Some(staker_info) = dao_state.stakers.get(&user) {
        let rewards = calculate_rewards(&user, dao_state);
        let staking_duration = ic_cdk::api::time() - staker_info.start_time;

        // Check if the staking duration is less than the cooldown period
        if staking_duration < COOLDOWN_PERIOD {
            let fee = (staker_info.amount as f64 * UNSTAKE_FEE_PERCENTAGE) as u64;
            let total_return = staker_info.amount + rewards - fee;

            dao_state.treasury_pool = dao_state.treasury_pool.saturating_sub(total_return);
            dao_state.stakers.remove(&user); // Remove user after unstaking
            
            Ok(total_return) // Return the amount after fee deduction
        } else {
            let total_return = staker_info.amount + rewards;

            dao_state.treasury_pool = dao_state.treasury_pool.saturating_sub(total_return);
            dao_state.stakers.remove(&user); // Remove user after unstaking
            
            Ok(total_return) // Return the full amount
        }
    } else {
        Err("User has no staked tokens.".to_string())
    }
}
