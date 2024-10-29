mod types;      
mod staking;    
mod unstaking; 

pub use staking::*;
pub use unstaking::*;
pub use types::*;
use ic_cdk_macros::export_candid;
use candid::export_service;
use ic_principal::Principal;
use candid::{CandidType, Deserialize};
use std::collections::HashMap;
use types::{DAOState, StakerInfo};
use staking::{stake_tokens, calculate_rewards};
use unstaking::unstake_tokens;
use ic_cdk_macros::{init, query, update};


/// Global DAO State - Represents the DAO's treasury, reward pool, and staker information.
static mut DAO_STATE: Option<DAOState> = None;

/// Initializes the DAO state with initial treasury and reward pools.
#[update]
pub fn initialize_dao(treasury: u64, reward: u64) {
    unsafe {
        DAO_STATE = Some(DAOState {
            stakers: HashMap::new(),
            treasury_pool: treasury,
            reward_pool: reward,
        });
    }
}

/// Public interface to stake tokens.
#[update]
pub fn stake(user: Principal, amount: u64) -> Result<(), String> {
    unsafe {
        if let Some(ref mut dao_state) = DAO_STATE {
            stake_tokens(user, amount, dao_state)
        } else {
            Err("DAO is not initialized.".to_string())
        }
    }
}

#[update]
pub fn unstake(user: Principal) -> Result<u64, String> {
    unsafe {
        if let Some(ref mut dao_state) = DAO_STATE {
            unstake_tokens(user, dao_state)
        } else {
            Err("DAO is not initialized.".to_string())
        }
    }
}

#[query]
pub fn get_rewards(user: Principal) -> u64 {
    unsafe {
        if let Some(ref dao_state) = DAO_STATE {
            calculate_rewards(&user, dao_state)
        } else {
            0
        }
    }
}

#[query]
pub fn get_staker_info(user: Principal) -> Option<StakerInfo> {
    unsafe {
        if let Some(ref dao_state) = DAO_STATE {
            dao_state.stakers.get(&user).cloned()
        } else {
            None
        }
    }
}

#[query]
pub fn list_all_stakers() -> Option<HashMap<Principal, StakerInfo>> {
    unsafe {
        if let Some(ref dao_state) = DAO_STATE {
            Some(dao_state.stakers.clone()) // Return a copy of the stakers map
        } else {
            None
        }
    }
}

export_candid!();
