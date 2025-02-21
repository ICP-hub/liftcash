use candid::Principal;
use ic_cdk_macros::init;
use ic_cdk_macros::export_candid;
mod promo_pool;
use promo_pool::init_prize_pool;
mod user_records;
use crate::user_records::*;
mod reward_mechanism;
mod tokentransfer;
// use crate::tokentransfer::*;
use candid::Nat;

#[init]
fn init() {
    init_prize_pool(None);
    init_user_record();
}

export_candid!();