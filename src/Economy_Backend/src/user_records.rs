use candid::{CandidType, Deserialize, Principal,Encode,Decode};
use ic_cdk::{caller, query, update};
use std::cell::RefCell;
use ic_stable_structures::{memory_manager::{MemoryManager, MemoryId, VirtualMemory}, DefaultMemoryImpl, Storable};
use ic_stable_structures::StableBTreeMap;
use std::borrow::Cow;


pub type VMem = VirtualMemory<DefaultMemoryImpl>;
pub const USER_RECORD_MEMORY_ID: MemoryId = MemoryId::new(2);

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
    pub static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );
    pub static USER_RECORDS: RefCell<StableBTreeMap<Principal, UserRecord, VMem>> = RefCell::new({
        let memory = MEMORY_MANAGER.with(|mm| mm.borrow().get(USER_RECORD_MEMORY_ID));
        StableBTreeMap::init(memory)
    });
}

impl Storable for UserRecord {
    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;

    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), UserRecord).unwrap()
    }
}

pub fn with_user_records<F, R>(f: F) -> R
where
    F: FnOnce(&RefCell<StableBTreeMap<Principal, UserRecord, VMem>>) -> R,
{
    USER_RECORDS.with(f)
}

pub fn read_user_record<F, R>(principal: Principal, f: F) -> Option<R>
where
    F: FnOnce(&UserRecord) -> R,
{
    with_user_records(|user_records| {
        let user_records = user_records.borrow(); 
        if let Some(user_record) = user_records.get(&principal) {
            Some(f(&user_record)) 
        } else {
            ic_cdk::api::print("User record not found.");
            None 
        }
    })
}

pub fn mutate_user_record<F, R>(principal: Principal, f: F) -> R
where
    F: FnOnce(&mut UserRecord) -> R,
{
    with_user_records(|user_records| {
        let mut user_records = user_records.borrow_mut();
        if let Some(mut user_record) = user_records.remove(&principal) {
            let result = f(&mut user_record);  // Call f once
            user_records.insert(principal, user_record.clone());
            result 
        } else {
            panic!("User record not found for mutation");
        }
    })
}


pub fn init_user_record() {
    USER_RECORDS.with(|records| {
        // let memory = MEMORY_MANAGER.with(|mm| mm.borrow().get(USER_RECORD_MEMORY_ID));
        // *records.borrow_mut() = StableBTreeMap::init(memory)
        if records.borrow().len() == 0 {
            let memory = MEMORY_MANAGER.with(|mm| mm.borrow().get(USER_RECORD_MEMORY_ID));
            *records.borrow_mut() = StableBTreeMap::init(memory);
            ic_cdk::api::print("User records initialized.");
        } else {
            ic_cdk::api::print("User records already initialized.");
        }
    });
}



#[update]
pub fn create_user_record() {
    let caller = caller();
    USER_RECORDS.with(|records| {
        let mut records = records.borrow_mut();
        if records.contains_key(&caller) {
            ic_cdk::api::print("User record already exists for the caller.");
        } else {
            records.insert(caller, UserRecord::new());
            ic_cdk::api::print("New user record created for the caller.");
        }
    });
}

#[query]
pub fn fetch_user_record() -> UserRecord {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.clone()).expect("User record not found")
}

#[update]
pub fn update_total_promo(amount: f64) {
    let caller = caller();
    mutate_user_record(caller, |user_record| {
        user_record.update_total_promo(amount);
    });
}

#[update]
pub fn update_locked_promo(amount: f64) {
    let caller = caller();
    mutate_user_record(caller, |user_record| {
        user_record.update_locked_promo(amount);
    });
}

#[update]
pub fn update_unlocked_promo(amount: f64) {
    let caller = caller();
    mutate_user_record(caller, |user_record| {
        user_record.update_unlocked_promo(amount);
    });
}

#[update]
pub fn update_burn_history(amount: f64) {
    let caller = caller();
    mutate_user_record(caller, |user_record| {
        user_record.update_burn_history(amount);
    });
}

#[update]
pub fn update_lift_token_balance(amount: f64) {
    let caller = caller();
    mutate_user_record(caller, |user_record| {
        user_record.update_lift_token_balance(amount);
    });
}

#[query]
pub fn fetch_total_promo() -> f64 {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.fetch_total_promo()).expect("User record not found")
}

#[query]
pub fn fetch_locked_promo() -> f64 {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.fetch_locked_promo()).expect("User record not found")
}

#[query]
pub fn fetch_unlocked_promo() -> f64 {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.fetch_unlocked_promo()).expect("User record not found")
}

#[query]
pub fn fetch_burn_history() -> Vec<f64> {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.fetch_burn_history()).expect("User record not found")
}

#[query]
pub fn fetch_lift_token_balance() -> f64 {
    let caller = caller();
    read_user_record(caller, |user_record| user_record.fetch_lift_token_balance()).expect("User record not found")
}

#[query]
pub fn fetch_all_user_records() -> Vec<(Principal, UserRecord)> {
    USER_RECORDS.with(|records| {
        records
            .borrow()
            .iter()
            .map(|(k, v)| (k, v.clone()))
            .collect()
    })
}
