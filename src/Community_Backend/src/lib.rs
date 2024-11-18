pub mod state;
use state::*;
mod constants;
use constants::*;
mod types;
use types::*;
mod controller;
use controller::*;
mod guards;
use guards::*;
use std::collections::HashMap;
use std::sync::RwLock;
use ic_cdk_macros::export_candid;

use candid::Principal;


#[macro_use]
extern crate lazy_static;
lazy_static! {
    pub static ref VOTING_SYSTEM: RwLock<VotingSystem> = RwLock::new(VotingSystem::new());
}

export_candid!();

