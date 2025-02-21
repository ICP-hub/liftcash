use candid::{CandidType, Deserialize,Principal};
use ic_cdk::api::call::call;
use ic_cdk_macros::update;
use serde::Serialize;
use icrc_ledger_types::icrc1::transfer::{NumTokens};
use icrc_ledger_types::icrc1::account::Account;
use icrc_ledger_types::icrc1::transfer::TransferError;
use candid::Nat;

#[derive(CandidType, Deserialize, Debug)]
struct TransferArg {
    from_subaccount: Option<Vec<u8>>,
    to: Account,
    amount: Nat,
    fee: Option<u64>,
    memo: Option<Vec<u8>>,
    created_at_time: Option<u64>,
}

#[derive(CandidType, Deserialize)]
enum TransferResult {
    Ok(Nat),
    Err(String),
}

#[derive(CandidType, Deserialize, Serialize)]
pub struct TransferArgs {
    amount: NumTokens,
    to_account: Account,
}

pub async fn transfer_amount(amount: u64,user: Principal,) -> Result<Nat, String> {
    ic_cdk::println!("hey {:?}",amount);
    let tokens = NumTokens::from(amount); 
    let transfer_args = TransferArg {
        to: Account {
            owner: user, 
            subaccount: None, 
        },
        from_subaccount: None, 
        fee: None,
        created_at_time: None, 
        memo: None,
        amount: tokens.clone(),
    };
    ic_cdk::println!("hey");
    // Specify the Ledger canister ID
    let ledger_canister_id = Principal::from_text("ss2fx-dyaaa-aaaar-qacoq-cai")
        .map_err(|_| "Invalid ledger canister ID".to_string())?;

    ic_cdk::println!("Transfer Arguments: {:?}", transfer_args);
    let (result,): (Result<Nat, TransferError>,) = ic_cdk::call(
        ledger_canister_id,
        "icrc1_transfer",
        (transfer_args,),
    )
    .await
    .map_err(|e| format!("Transfer failed: {:?}", e))?;
    ic_cdk::println!("Transfer Result: {:?}", result);
    match result {
        Ok(transaction_id) => {
            ic_cdk::println!("Transfer Successful. Transaction ID: {:?}", transaction_id);
            Ok(transaction_id)
        }
        Err(e) => {
            let error_msg = format!("Transfer failed: {:?}", e);
            ic_cdk::println!("{}", error_msg);
            Err(error_msg)
        }
        // } Err(format!("Transfer failed: {:?}", e)),
    }
}

