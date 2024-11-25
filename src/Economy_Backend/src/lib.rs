use ic_cdk_macros::export_candid;
mod pointpool;

use ic_cdk_macros::{init, query, update,};
use pointpool::{fetch_prize_pool_balance, init_prize_pool, reset_prize_pool, update_prize_pool_balance};

#[init]
fn init(initial_balance: Option<f64>) {
    init_prize_pool(initial_balance);
}

#[update]
fn initialize(initial_balance: Option<f64>) {
    init_prize_pool(initial_balance);
}

#[query]
fn fetch_balance() -> f64 {
    fetch_prize_pool_balance()
}

#[update]
fn update_balance(amount: f64) -> Result<f64, String> {
    update_prize_pool_balance(amount)
}

#[update]
fn reset_pool() {
    reset_prize_pool();
}

export_candid!();