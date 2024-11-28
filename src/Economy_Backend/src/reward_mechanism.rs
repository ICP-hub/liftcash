use ic_cdk::api::call::call;
use ic_cdk_macros::update;
use crate::promo_pool::{fetch_prize_pool_balance, update_prize_pool_balance};
use crate::user_records::{fetch_all_user_records, with_user_records};
use candid::Principal;

#[update]
pub async fn distribute_rewards(weekly_issuance_percentage: f64) -> Result<String, String> {

    if !(0.0..=100.0).contains(&weekly_issuance_percentage) {
        return Err("Invalid weekly issuance percentage. Must be between 0 and 100.".to_string());
    }

    // Step 1: Fetch current prize pool balance
    let current_pool_balance = fetch_prize_pool_balance();
    if current_pool_balance <= 0.0 {
        return Err("Insufficient prize pool balance.".to_string());
    }

    // Step 2: Calculate the weekly issuance in tokens
    let weekly_issuance = (current_pool_balance * weekly_issuance_percentage) / 100.0; //weekly_participation

    // Step 3: Fetch all user records
    let user_records = fetch_all_user_records(); // --- Here Inter-Canister Call to Community Canister
    let total_users = user_records.len();
    if total_users == 0 {
        return Err("No active users to distribute rewards.".to_string());
    }

    // Step 4: Calculate per-user reward
    let reward_per_user = weekly_issuance / total_users as f64;

    // Step 5: Distribute rewards to users
    for (principal, _) in user_records.iter() {
        // Fetch the claim percentage for the user (simulate governance call)
        let claim_percentage = fetch_claim_percentage_from_community(*principal).await?;

        if claim_percentage <= 0.0 {
            ic_cdk::println!("Skipping user {:?} due to invalid claim percentage.", principal);
            continue;
        }

        // Calculate the user's reward based on their claim percentage
        let user_reward = reward_per_user * claim_percentage / 100.0;

        // Update user records with new rewards
        // update_total_promo_for_user(*principal, user_reward)?;
        lock_recent_rewards(*principal, user_reward)?;
    }

    // Step 6: Deduct weekly issuance from the pool
    update_prize_pool_balance(-weekly_issuance).map_err(|err| format!("Failed to update pool: {}", err))?;

    Ok(format!(
        "Successfully distributed {:.2} tokens to {} users.",
        weekly_issuance, total_users
    ))
}

// Mock implementation to simulate fetching claim percentage from a governance canister
async fn fetch_claim_percentage_from_community(user: Principal) -> Result<f64, String> {
    // Replace Principal::anonymous() with actual governance canister Principal
    let governance_canister = Principal::from_text("your-governance-canister-principal").unwrap();

    let result: Result<(f64,), _> = call(governance_canister, "get_user_claim_percentage", (user,)).await;

    match result {
        Ok((percentage,)) if percentage > 0.0 => Ok(percentage),
        _ => Err(format!("Failed to fetch claim percentage for user {:?}", user)),
    }
}

// Helper to update total promo for a user
// fn update_total_promo_for_user(user: Principal, reward: f64) -> Result<(), String> {
//     with_user_records(|records| {
//         records.borrow_mut()
//             .get_mut(&user)
//             .ok_or_else(|| "User record not found.".to_string())
//             .map(|record| record.update_total_promo(reward))
//     })
// }

// Helper to lock a portion of rewards based on rules
fn lock_recent_rewards(user: Principal, reward: f64) -> Result<(), String> {
    // Define locking percentage (can be fetched dynamically)
    let locking_percentage = 20.0;

    // Calculate locked amount
    let locked_amount = (reward * locking_percentage) / 100.0;

    with_user_records(|records| {
        records.borrow_mut()
            .get_mut(&user)
            .ok_or_else(|| "User record not found.".to_string())
            .map(|record| record.update_locked_promo(locked_amount))
    })
}
