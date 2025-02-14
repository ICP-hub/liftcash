// use candid::{CandidType, Decode, Encode, Principal};
// use ic_canister_sig_creation::IC_ROOT_PK_DER;
// use identity_credential::validator::JwtValidationError;
// use crate::types::{VerificationError};
// use std::collections::HashMap;
// use ic_cdk::update;
// use ic_verifiable_credentials::{
//     issuer_api::CredentialSpec, validate_ii_presentation_and_claims, VcFlowSigners,
// };

// #[update]
// pub async fn verify_credential(vp_jwt: String) -> Result<(), String> {
//     let current_time_ns = ic_cdk::api::time(); // Get current IC time in nanoseconds
    
//     // The subject we expect in the credential (typically the caller's principal)
//     let effective_subject = ic_cdk::api::caller();
    
//     // Your application's origin that was used in the credential request
//     let derivation_origin = "http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai";
    
//     // Configure the verification parameters
//     let vc_flow_signers = VcFlowSigners {
//         // Internet Identity canister ID
//         ii_canister_id: Principal::from_text("rdmx6-jaaaa-aaaaa-aaadq-cai").unwrap(),
//         ii_origin: "https://identity.ic0.app/".to_string(),
        
//         // Decide ID canister ID
//         issuer_canister_id: Principal::from_text("qgxyr-pyaaa-aaaah-qdcwq-cai").unwrap(),
//         issuer_origin: "https://id.decideai.xyz".to_string(),
//     };

//     // The credential specification that matches what was requested
//     let vc_spec = CredentialSpec {
//         credential_type: "ProofOfUniqueness".to_string(),
//         arguments: {
//             let mut args = HashMap::new();
//             args.insert(
//                 "minimumVerificationDate".to_string(),
//                 ArgumentValue::String("2024-12-10T00:00:00Z".to_string())
//             );
//             Some(args)
//         },
//     };

//     // Verify the presentation and all included credentials
//     validate_ii_presentation_and_claims(
//         &vp_jwt,
//         effective_subject,
//         derivation_origin.to_string(),
//         &vc_flow_signers,
//         &vc_spec,
//         IC_ROOT_PK_DER, // IC root public key for verifying canister signatures
//         current_time_ns,
//     ).map_err(|e| format!("Verification failed: {:?}", e))?;

//     // If verification succeeds, store the verified state
//     // This is application-specific - implement based on your needs
//     Ok(())
// }

use candid::Principal;
use ic_verifiable_credentials::issuer_api::CredentialSpec;
use ic_verifiable_credentials::VcFlowSigners;
use ic_cdk::{query, update ,caller};
use candid::{CandidType, Decode, Encode};
use serde::{Deserialize,Serialize};
pub type TimestampMillis = u64;
pub type CanisterId = Principal;


#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct UniquePersonProof {
    pub timestamp: TimestampMillis,
    pub provider: UniquePersonProofProvider,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum UniquePersonProofProvider {
    DecideAI,
}


const ISSUER_CANISTER_ID: CanisterId = CanisterId::from_slice(&[0, 0, 0, 0, 0, 240, 24, 173, 1, 1]);
const ISSUER_ORIGIN: &str = "https://id.decideai.xyz/";
const NANOS_PER_MILLISECOND: u64 = 1_000_000;


#[ic_cdk::update]
pub async fn verify_proof_of_unique_personhood(
    principal: Principal,
    internet_identity_canister_id: CanisterId,
    website_canister_id: CanisterId,
    credential_jwt: String,
    ic_root_key: Vec<u8>,
    now: TimestampMillis,
) -> Result<UniquePersonProof, String> {
    let root_pk_raw = &ic_root_key[ic_root_key.len().saturating_sub(96)..];

    match ic_verifiable_credentials::validate_ii_presentation_and_claims(
        &credential_jwt,
        principal,
        format!("https://{website_canister_id}.ic0.app"),
        &VcFlowSigners {
            ii_canister_id: internet_identity_canister_id,
            ii_origin: "https://identity.ic0.app".to_string(),
            issuer_canister_id: ISSUER_CANISTER_ID,
            issuer_origin: ISSUER_ORIGIN.to_string(),
        },
        &CredentialSpec {
            credential_type: "ProofOfUniqueness".to_string(),
            arguments: None,
        },
        root_pk_raw,
        (now * NANOS_PER_MILLISECOND) as u128,
    ) {
        Ok(_) => Ok(UniquePersonProof {
            timestamp: now,
            provider: UniquePersonProofProvider::DecideAI,
        }),
        Err(error) => Err(format!("{error:?}")),
    }
}


#[test]
fn signing_canister_id() {
    assert_eq!(
        ISSUER_CANISTER_ID,
        CanisterId::from_text("qgxyr-pyaaa-aaaah-qdcwq-cai").unwrap()
    );
}