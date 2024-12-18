use crate::promo_pool::{fetch_prize_pool_balance, update_prize_pool_balance};
use crate::user_records::with_user_records;
use candid::Principal;
use ic_cdk::api::call::{call, CallResult};
use ic_cdk_macros::update;
use crate :: user_records::mutate_user_record;
use ic_cdk_macros::query;

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
    let user_records = get_all_claims().await?;

    let total_users = user_records.len();
    if total_users == 0 {
        return Err("No active users to distribute rewards.".to_string());
    }

    // Step 4: Calculate per-user reward
    let reward_per_user = weekly_issuance / total_users as f64;

    // Define a mutable variable to hold the reward (outside the loop body)
    let mut global_reward_distributed: f64 = 0.0;

    // Step 5: Distribute rewards to users
    for (principal, _) in user_records.iter() {
        // Fetch the claim percentage for the user (simulate governance call)
        let claim_percentage = get_user_claim(*principal).await?;

        if claim_percentage <= Some(0) && claim_percentage >= Some(100) {
            ic_cdk::println!(
                "Skipping user {:?} due to invalid claim percentage.",
                principal
            );
            continue;
        }

        // Calculate the user's reward based on their claim percentage
        // let user_reward = reward_per_user * claim_percentage / 100.0;
        let user_reward = match claim_percentage {
            Some(percentage) => reward_per_user * (percentage as f64) / 100.0,
            None => {
                ic_cdk::println!(
                    "Skipping user {:?} due to missing claim percentage.",
                    principal
                );
                continue;
            }
        };

        // Update the global reward variable
        global_reward_distributed += user_reward;

        // Update user records with new rewards
        update_user_record(*principal, user_reward)?;
    }

    // // Step 6: Deduct weekly issuance from the pool
    update_prize_pool_balance(-global_reward_distributed).map_err(|err| format!("Failed to update pool: {}", err))?;

    Ok(format!("Successfully distributed {:?} tokens to {} users.",global_reward_distributed, total_users))
}

fn update_user_record(user: Principal, reward: f64) -> Result<(), String> {
    // Define locking percentage (can be fetched dynamically)
    let locking_percentage = 50.0;

    // Calculate locked amount
    let locked_amount = (reward * locking_percentage) / 100.0;

    // Access and modify user records
    mutate_user_record(user, |record| {
        // Update total promo
        record.update_total_promo(reward);

        // Lock a portion of the rewards
        record.update_locked_promo(locked_amount);

        // Unlock the remaining rewards
        record.update_unlocked_promo(reward - locked_amount);

        Ok(())
    })
}

async fn get_user_claim(principal: Principal) -> Result<Option<u8>, String> {

    let community_canister_id = option_env!("CANISTER_ID_COMMUNITY_BACKEND")
        .expect("COMMUNITY_CANISTER_ID env var not set")
        .parse::<Principal>()
        .expect("Invalid Community Canister ID");
       
    let result: CallResult<(Option<u8>,)> = call(
        community_canister_id,
        "calculate_total_claim",
        (principal,),
    )
    .await;

    match result {
        Ok((data,)) => Ok(data),
        Err((code, msg)) => Err(format!(
            "Error calling canister: code {:?}, message: {}",
            code, msg
        )),
    }
}

async fn get_all_claims() -> Result<Vec<(Principal, u8)>, String> {
    let community_canister_id = option_env!("CANISTER_ID_COMMUNITY_BACKEND")
        .expect("COMMUNITY_CANISTER_ID env var not set")
        .parse::<Principal>()
        .expect("Invalid Community Canister ID");

    let result: CallResult<(Vec<(Principal, u8)>,)> = call(
        community_canister_id,
        "get_all_claim_percentages",
        (), 
    )
    .await;

    match result {
        Ok((data,)) => Ok(data),
        Err((code, msg)) => Err(format!(
            "Error calling canister: code {:?}, message: {}",
            code, msg
        )),
    }
}


#[update]
pub async fn test_intercall(input : String) -> String{
    ic_cdk::println!("Inter canister call made to RMech: {:?}", input);
    input
} 