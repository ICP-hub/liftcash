use candid::Principal;
use crate::promo_pool::{PrizePool,read_prize_pool,mutate_prize_pool};
use candid::{CandidType, Deserialize, Decode, Encode};
use ic_cdk::{query, update};
use crate::user_records::{mutate_user_record,UserRecord,read_user_record};
use ic_cdk::caller;

#[update]
pub fn convert_promo_to_lift(
    promo_amount: f64,
    mint_fee_percentage: f64,
) -> Result<(), String> {
    let current_promo_balance = read_user_record(caller(),|user_records| user_records.fetch_unlocked_promo())
        .ok_or_else(|| "Failed to fetch promo balance.".to_string())?;
    
    if current_promo_balance < promo_amount {
        return Err("Insufficient promo token balance.".to_string());
    }
    let mint_fee = (promo_amount * mint_fee_percentage) / 100.0;
    let mint_lift_amount = promo_amount - mint_fee;

    if mint_lift_amount < 3000.0 {
        return Err("Mint amount below minimum required LIFT.".to_string());
    }
    mutate_user_record(caller(),|user_records| {
        user_records.update_total_promo(-promo_amount);
        user_records.update_unlocked_promo(-promo_amount);
    });
    Ok(())
}

#[update]
pub fn mint_lift_tokens( mint_amount: f64) -> Result<(),String> {
    ic_cdk::api::print(&format!(
        "Minted {} LIFT tokens for user ",
        mint_amount, 
    ));
    Ok(())
}
