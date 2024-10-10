
use ic_cdk_macros::export_candid;
#[macro_use]
extern crate lazy_static;
use candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, query, update};
use std::collections::{HashMap, HashSet};
use sha2::{Sha256, Digest};
use std::sync::RwLock;
use std::str::FromStr;

#[derive(Default)]
struct DAO {
    proposals: HashMap<u64, Proposal>,
    next_proposal_id: u64,
    roles: HashMap<Role, HashSet<String>>, // Role to users mapping
    audit_logs: Vec<AuditLog>,
}

#[derive(Clone, CandidType, Deserialize, Hash, Eq, PartialEq, Debug)]
enum Role {
    Proposer,
    Voter,
    Executor,
}

impl std::str::FromStr for Role {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "proposer" => Ok(Role::Proposer),
            "voter" => Ok(Role::Voter),
            "executor" => Ok(Role::Executor),
            _ => Err(format!("Invalid role: {}", s)),
        }
    }
}



#[derive(Clone, CandidType, Deserialize)]
struct Proposal {
    id: u64,
    description: String,
    votes_for: u64,
    votes_against: u64,
    executed: bool,
    ratified: bool,
    hash: String,
    expiration: u64, // Timestamp for expiration
}


#[derive(Clone, CandidType, Deserialize)]
struct AuditLog {
    action: String,
    timestamp: u64,
    user: String,
    details: String,
}

#[derive(Debug)]
enum DAOError {
    NotInitialized,
    Unauthorized(String),
    ProposalNotFound,
    InvalidInput(String),
    InvalidRole(String),
}

impl std::fmt::Display for DAOError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            DAOError::NotInitialized => write!(f, "DAO_STATE is not initialized"),
            DAOError::Unauthorized(action) => write!(f, "Caller is not authorized to {}", action),
            DAOError::ProposalNotFound => write!(f, "Proposal not found"),
            DAOError::InvalidInput(reason) => write!(f, "Invalid input: {}", reason),
            DAOError::InvalidRole(role) => write!(f, "Invalid role: {}", role),
        }
    }
}

impl std::convert::From<DAOError> for String {
    fn from(error: DAOError) -> Self {
        error.to_string()
    }
}

// lazy_static! {
//     static ref DAO_STATE: RwLock<Option<DAO>> = RwLock::new(None);
// }


static mut DAO_STATE: Option<DAO> = None;

#[update]
fn initialize() {
    unsafe {
        DAO_STATE = Some(DAO::default());
    }
}

fn get_dao_state() -> Result<&'static mut DAO, String> {
    unsafe { DAO_STATE.as_mut().ok_or(DAOError::NotInitialized.into()) }
}

#[update]
fn assign_role(user: String, role: String) -> Result<(), String> {
    let dao = get_dao_state()?;
    let role_enum: Role = role.parse().map_err(|_| DAOError::InvalidRole(role.clone()))?;
    dao.roles.entry(role_enum.clone()).or_default().insert(user.clone());
    log_action("assign_role", &ic_cdk::caller().to_string(), &format!("Assigned role {} to {}", role, user));
    Ok(())
}


#[update]
fn remove_role(user: String, role: String) -> Result<(), String> {
    let dao = get_dao_state()?;
    let role_enum: Role = role.parse().map_err(|_| DAOError::InvalidRole(role.clone()))?;
    if let Some(users) = dao.roles.get_mut(&role_enum) {
        users.remove(&user);
        log_action("remove_role", &ic_cdk::caller().to_string(), &format!("Removed role {:?} from {}", role_enum, user));
        Ok(())
    } else {
        Err("Role not found".to_string())
    }
}


#[update]
fn create_proposal(description: String, expiration: u64) -> Result<u64, String> {
    if description.trim().is_empty() {
        return Err(DAOError::InvalidInput("Description cannot be empty".to_string()).into());
    }
    let caller = ic_cdk::caller().to_string();
    let dao = get_dao_state()?;
    if !dao.roles.get(&Role::Proposer).map_or(false, |users| users.contains(&caller)) {
        return Err(DAOError::Unauthorized("create proposals".to_string()).into());
    }
    let proposal_id = dao.next_proposal_id;
    let proposal = Proposal {
        id: proposal_id,
        description: description.clone(),
        votes_for: 0,
        votes_against: 0,
        executed: false,
        ratified: false,
        hash: hash_proposal(&description),
        expiration,
    };
    dao.proposals.insert(proposal_id, proposal);
    dao.next_proposal_id += 1;
    log_action("create_proposal", &caller, &format!("Created proposal with ID {}", proposal_id));
    Ok(proposal_id)
}

#[update]
fn vote(proposal_id: u64, vote_for: bool) -> Result<(), String> {
    let caller = ic_cdk::caller().to_string();
    let dao = get_dao_state()?;
    if !dao.roles.get(&Role::Voter).map_or(false, |users| users.contains(&caller)) {
        return Err(DAOError::Unauthorized("vote".to_string()).into());
    }
    match dao.proposals.get_mut(&proposal_id) {
        Some(proposal) => {
            if vote_for {
                proposal.votes_for += 1;
            } else {
                proposal.votes_against += 1;
            }
            log_action("vote", &caller, &format!("Voted on proposal ID {}", proposal_id));
            Ok(())
        }
        None => Err(DAOError::ProposalNotFound.into()),
    }
}

#[update]
fn execute_proposal(proposal_id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller().to_string();
    let dao = get_dao_state()?;
    if !dao.roles.get(&Role::Executor).map_or(false, |users| users.contains(&caller)) {
        return Err(DAOError::Unauthorized("execute proposals".to_string()).into());
    }
    match dao.proposals.get_mut(&proposal_id) {
        Some(proposal) => {
            if proposal.executed {
                return Err(DAOError::InvalidInput("Proposal already executed".to_string()).into());
            }
            proposal.executed = true;
            log_action("execute_proposal", &caller, &format!("Executed proposal ID {}", proposal_id));
            Ok(())
        }
        None => Err(DAOError::ProposalNotFound.into()),
    }
}

#[update]
fn ratify_proposal(proposal_id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller().to_string();
    let dao = get_dao_state()?;
    if !dao.roles.get(&Role::from_str("ratifier").map_err(|_| DAOError::InvalidRole("ratifier".to_string()))?).map_or(false, |users| users.contains(&caller)) {
        return Err(DAOError::Unauthorized("ratify proposals".to_string()).into());
    }
    match dao.proposals.get_mut(&proposal_id) {
        Some(proposal) => {
            if proposal.ratified {
                return Err(DAOError::InvalidInput("Proposal already ratified".to_string()).into());
            }
            proposal.ratified = true;
            log_action("ratify_proposal", &caller, &format!("Ratified proposal ID {}", proposal_id));
            Ok(())
        }
        None => Err(DAOError::ProposalNotFound.into()),
    }
}


#[update]
fn withdraw_proposal(proposal_id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller().to_string();
    let dao = get_dao_state()?;
    let proposal = dao.proposals.get(&proposal_id).ok_or(DAOError::ProposalNotFound)?;
    if proposal.executed {
        return Err("Cannot withdraw an executed proposal".to_string());
    }
    if !dao.roles.get(&Role::Proposer).map_or(false, |users| users.contains(&caller)) {
        return Err(DAOError::Unauthorized("withdraw proposals".to_string()).into());
    }
    dao.proposals.remove(&proposal_id);
    log_action("withdraw_proposal", &caller, &format!("Withdrew proposal ID {}", proposal_id));
    Ok(())
}

#[query]
fn get_proposal(proposal_id: u64) -> Result<Proposal, String> {
    let dao = get_dao_state()?;
    dao.proposals.get(&proposal_id).cloned().ok_or(DAOError::ProposalNotFound.into())
}

#[query]
fn get_proposal_history() -> Result<Vec<Proposal>, String> {
    ic_cdk::println!("get_proposal_history called");
    let dao = unsafe { DAO_STATE.as_ref().ok_or(DAOError::NotInitialized)? };
    let dao = dao;
    Ok(dao.proposals.values().cloned().collect())
}


#[query]
fn list_proposals() -> Result<Vec<Proposal>, String> {
    let dao = get_dao_state()?;
    Ok(dao.proposals.values().cloned().collect())
}

#[query]
fn get_audit_logs() -> Result<Vec<AuditLog>, String> {
    let dao = get_dao_state()?;
    Ok(dao.audit_logs.clone())
}

#[query]
fn get_caller() -> String {
    ic_cdk::caller().to_string()
}

fn log_action(action: &str, user: &str, details: &str) {
    let dao = unsafe { DAO_STATE.as_mut().unwrap() };
    dao.audit_logs.push(AuditLog {
        action: action.to_string(),
        timestamp: ic_cdk::api::time(),
        user: user.to_string(),
        details: details.to_string(),
    });
    ic_cdk::println!("Action: {}, User: {}, Details: {}", action, user, details);
}

fn hash_proposal(description: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(description);
    format!("{:x}", hasher.finalize())
}

export_candid!();




