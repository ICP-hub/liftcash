use candid::{CandidType, Deserialize, Decode, Encode};
use ic_cdk::{query, update};
use std::{borrow::Cow, cell::RefCell};
use ic_stable_structures::{StableCell, memory_manager::{MemoryManager, MemoryId, VirtualMemory}, DefaultMemoryImpl, Storable};

pub type VMem = VirtualMemory<DefaultMemoryImpl>;
pub const PRIZE_POOL_MEMORY_ID: MemoryId = MemoryId::new(1);

#[derive(CandidType, Deserialize, Debug, Clone)]
pub struct PrizePool {
    current_balance: f64,
    initial_balance: f64,
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

pub fn read_prize_pool<R>(f: impl FnOnce(&PrizePool) -> R) -> Option<R> {
    PRIZE_POOL.with(|cell| {
        let prize_pool = cell.borrow();
        if let Some(pool) = prize_pool.get().as_ref() {
            Some(f(pool))
        } else {
            ic_cdk::api::print("PrizePool is not initialized."); // Debugging
            None // PrizePool is not initialized
        }
    })
}

pub fn mutate_prize_pool<R>(f: impl FnOnce(&mut PrizePool) -> R) -> R {
    PRIZE_POOL.with(|cell| {
        let mut state = cell.borrow_mut();
        
        // Ensure we unwrap the Option, as we expect Some(PrizePool)
        if let Some(mut prize_pool) = state.get().clone() {
            let result = f(&mut prize_pool); // Pass mutable reference to prize_pool
            state.set(Some(prize_pool)).expect("Failed to update PrizePool in stable memory");
            result
        } else {
            panic!("PrizePool is not initialized"); // Handle case where PrizePool is None
        }
    })
}

thread_local! {
    pub static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );
    pub static PRIZE_POOL: RefCell<StableCell<Option<PrizePool>, VMem>> = RefCell::new({
        let memory = MEMORY_MANAGER.with(|mm| mm.borrow().get(PRIZE_POOL_MEMORY_ID));
        StableCell::init(memory, None).expect("Failed to initialize PrizePool")
    });
}

impl Storable for PrizePool {
    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;

    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), PrizePool).unwrap()
    }
}

#[update]
pub fn init_prize_pool(initial_balance: Option<f64>) {
    let balance = initial_balance.unwrap_or(0.0); //----- Default to 0.0 if None
    PRIZE_POOL.with(|cell| {
        let mut state = cell.borrow_mut();
        state.set(Some(PrizePool::new(balance)))
             .expect("Failed to initialize or reinitialize PrizePool");
    });
    ic_cdk::api::print(&format!("Prize pool initialized with balance: {}", balance));  // Debugging line
}

#[query]
pub fn fetch_prize_pool_balance() -> f64 {
    read_prize_pool(|pool| pool.fetch_balance())
        .unwrap_or_else(|| {
            ic_cdk::api::print("PrizePool balance fetch failed: uninitialized.");
            0.0
        })
}

#[update]
pub fn update_prize_pool_balance(amount: f64) -> Result<f64, String> {
    mutate_prize_pool(|pool| pool.update_balance(amount))
}

#[update]
pub fn reset_prize_pool() {
    mutate_prize_pool(|pool| {
        pool.reset_pool();
    });
}
