#!/bin/bash

# Import constants and environment variables
source constants.sh
set -a
source ../.env  # Adjust the relative path to point to the root directory
set +a

echo $CANISTER_ID_ECONOMY_BACKEND

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RESET='\033[0m'

NUM_USERS=$TOTAL_USERS

# Starting the process
echo -e "${BLUE}Starting user record creation...${RESET}"
echo -e "${BLUE}Total users to create: $NUM_USERS${RESET}"

# Loop to create user records
for ((i=1; i<=NUM_USERS; i++))
do
    IDENTITY_NAME="user_$i"
    
    echo -e "${BLUE}Creating identity: $IDENTITY_NAME...${RESET}"
    
    # Create new identity
    if dfx identity new "$IDENTITY_NAME" --disable-encryption &>/dev/null; then
        echo -e "${GREEN}Successfully created identity: $IDENTITY_NAME${RESET}"
    else
        echo -e "${RED}Error: Failed to create identity: $IDENTITY_NAME${RESET}"
        continue
    fi

    # Use the newly created identity
    dfx identity use "$IDENTITY_NAME"

    # Call the backend canister to create a user record
    if [[ $1 == "ic" ]]; then
        if dfx canister call "$CANISTER_ID_ECONOMY_BACKEND" create_user_record --network ic; then
            echo -e "${GREEN}User record created for identity: $IDENTITY_NAME${RESET}"
        else
            echo -e "${RED}Error: Failed to create user record for identity: $IDENTITY_NAME${RESET}"
        fi
    else
        if dfx canister call "$CANISTER_ID_ECONOMY_BACKEND" create_user_record; then
            echo -e "${GREEN}User record created for identity: $IDENTITY_NAME${RESET}"
        else
            echo -e "${RED}Error: Failed to create user record for identity: $IDENTITY_NAME${RESET}"
        fi
    fi
    

    
done

# Reset to default identity
dfx identity use default

# Completion message
echo -e "${BLUE}Finished creating $NUM_USERS user records.${RESET}"
