use candid::{CandidType, Deserialize, Principal};
use ic_cdk::{caller, init, query, update};
// use ic_cdk::api::call::CallResult;
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Debug, Clone)]
pub struct UserRecord {
    pub total_promo: f64,
    pub locked_promo: f64,
    pub unlocked_promo: f64,
    pub burn_history: Vec<f64>,
    pub lift_token_balance: f64,
}

impl UserRecord {
    pub fn new() -> Self {
        Self {
            total_promo: 0.0,
            locked_promo: 0.0,
            unlocked_promo: 0.0,
            burn_history: Vec::new(),
            lift_token_balance: 0.0,
        }
    }

    pub fn update_total_promo(&mut self, amount: f64) {
        self.total_promo += amount;
    }

    pub fn update_locked_promo(&mut self, amount: f64) {
        self.locked_promo += amount;
    }

    pub fn update_unlocked_promo(&mut self, amount: f64) {
        self.unlocked_promo += amount;
    }

    pub fn update_burn_history(&mut self, amount: f64) {
        self.burn_history.push(amount);
    }

    pub fn update_lift_token_balance(&mut self, amount: f64) {
        self.lift_token_balance += amount;
    }

    pub fn fetch_total_promo(&self) -> f64 {
        self.total_promo
    }

    pub fn fetch_locked_promo(&self) -> f64 {
        self.locked_promo
    }

    pub fn fetch_unlocked_promo(&self) -> f64 {
        self.unlocked_promo
    }

    pub fn fetch_burn_history(&self) -> Vec<f64> {
        self.burn_history.clone()
    }

    pub fn fetch_lift_token_balance(&self) -> f64 {
        self.lift_token_balance
    }
}

thread_local! {
    static USER_RECORDS: RefCell<HashMap<Principal, UserRecord>> = RefCell::new(HashMap::new());
}

pub fn init_user_record() {
    USER_RECORDS.with(|records| {
        *records.borrow_mut() = HashMap::new();
    });
}

#[update]
pub fn create_user_record() {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut().insert(caller, UserRecord::new());
    });
}

#[query]
pub fn fetch_user_record() -> UserRecord {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .clone()
    })
}

#[update]
pub fn update_total_promo(amount: f64) {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut()
            .get_mut(&caller)
            .expect("User record not found")
            .update_total_promo(amount);
    });
}

#[update]
pub fn update_locked_promo(amount: f64) {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut()
            .get_mut(&caller)
            .expect("User record not found")
            .update_locked_promo(amount);
    });
}

#[update]
pub fn update_unlocked_promo(amount: f64) {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut()
            .get_mut(&caller)
            .expect("User record not found")
            .update_unlocked_promo(amount);
    });
}

#[update]
pub fn update_burn_history(amount: f64) {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut()
            .get_mut(&caller)
            .expect("User record not found")
            .update_burn_history(amount);
    });
}

#[update]
pub fn update_lift_token_balance(amount: f64) {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow_mut()
            .get_mut(&caller)
            .expect("User record not found")
            .update_lift_token_balance(amount);
    });
}

#[query]
pub fn fetch_total_promo() -> f64 {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .fetch_total_promo()
    })
}

#[query]
pub fn fetch_locked_promo() -> f64 {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .fetch_locked_promo()
    })
}

#[query]
pub fn fetch_unlocked_promo() -> f64 {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .fetch_unlocked_promo()
    })
}

#[query]
pub fn fetch_burn_history() -> Vec<f64> {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .fetch_burn_history()
    })
}

#[query]
pub fn fetch_lift_token_balance() -> f64 {
    let caller = caller();
    USER_RECORDS.with(|records| {
        records.borrow()
            .get(&caller)
            .expect("User record not found")
            .fetch_lift_token_balance()
    })
}

#[query]
pub fn fetch_all_user_records() -> Vec<(Principal, UserRecord)> {
    USER_RECORDS.with(|records| {
        records.borrow()
            .iter()
            .map(|(k, v)| (*k, v.clone()))
            .collect()
    })
}









