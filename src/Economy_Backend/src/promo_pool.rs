use candid::{CandidType, Deserialize};
use ic_cdk::{query, update};
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Debug)]
pub struct PrizePool {
    current_balance: f64,
    initial_balance: f64
}

impl PrizePool {
    pub fn new(initial_balance: f64) -> Self {
        Self { 
            current_balance: initial_balance,
            initial_balance,
        }
    }

    pub fn fetch_balance(&self) -> f64 {
        self.current_balance
    }

    pub fn update_balance(&mut self, amount: f64) -> Result<f64, String> {
        if self.current_balance + amount < 0.0 {
            Err("Insufficient points in the prize pool.".to_string())
        } else {
            self.current_balance += amount;
            Ok(self.current_balance)
        }
    }

    pub fn reset_pool(&mut self) {
        self.current_balance = self.initial_balance;
    }
}

thread_local! {
    static PRIZE_POOL: RefCell<Option<PrizePool>> = RefCell::new(None);
}

// #[init]
// fn init(initial_balance: Option<f64>) {
//     init_prize_pool(initial_balance);
// }

#[update]
pub fn init_prize_pool(initial_balance: Option<f64>) {
    let balance = initial_balance.unwrap_or(0.0);
    PRIZE_POOL.with(|pool| {
        *pool.borrow_mut() = Some(PrizePool::new(balance));
    });
}

#[query]
pub fn fetch_prize_pool_balance() -> f64 {
    PRIZE_POOL.with(|pool| {
        pool.borrow()
            .as_ref()
            .expect("PrizePool has not been initialized")
            .fetch_balance()
    })
}

#[update]
pub fn update_prize_pool_balance(amount: f64) -> Result<f64, String> {
    PRIZE_POOL.with(|pool| {
        pool.borrow_mut()
            .as_mut()
            .expect("PrizePool has not been initialized")
            .update_balance(amount)
    })
}

#[update]
pub fn reset_prize_pool() {
    PRIZE_POOL.with(|pool| {
        if let Some(pool) = pool.borrow_mut().as_mut() {
            pool.reset_pool();
        } else {
            panic!("PrizePool has not been initialized");
        }
    });
}
