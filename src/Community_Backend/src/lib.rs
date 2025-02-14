pub mod state;
use state::*;
mod constants;
use constants::*;
mod types;
use types::*;
mod controller;
mod guards;
mod verifydecide; 
use verifydecide::*;
use std::collections::HashMap;
use std::sync::RwLock;
use ic_cdk_macros::export_candid;


use candid::Principal;
// use crate::verifydecide::{verify_credential};

#[macro_use]
extern crate lazy_static;
lazy_static! {
    pub static ref VOTING_SYSTEM: RwLock<VotingSystem> = RwLock::new(VotingSystem::new());
}

export_candid!();