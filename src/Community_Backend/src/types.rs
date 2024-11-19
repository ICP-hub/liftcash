use std::collections::HashMap;
use candid::CandidType;
use serde::Deserialize;

#[derive(CandidType, Deserialize, Clone,Debug)]
pub struct UserClaim {
    pub has_surveyed: bool,
    pub has_voted: bool,
    pub has_ratified: bool,
    pub claim_percentage: u8,
}

pub type SurveyData =HashMap<String, SurveyResponse>;
pub type VoteData = HashMap<String, VoteResponse>;


#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, Hash,Debug)]
pub enum SurveyResponse {
    PercentageSlider(u8),
    MultipleChoice(String),
    Dropdown(Vec<String>)
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, Hash,Debug)]
pub enum VoteResponse {
    PercentageVote(u8),
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct State {
    pub current_phase: Phase,
    pub phase_start_time: u64,
    pub remaining_time:u64,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug, PartialEq,CandidType)]
pub enum Phase {
    Uninitialized,
    Survey,
    SurveyResults,
    Vote,
    VoteResults,
    Ratify,
    RatifyResults,
}