#!/bin/bash

source constants.sh

# Enable environment variable export
set -a
source ../.env  # Adjust the relative path to point to the root directory
set +a

# Number of users to handle dynamically
NUM_USERS=$TOTAL_USERS

# Loop through the users
for ((i=1; i<=NUM_USERS; i++)); do

    # Define the identity name for the user
    IDENTITY_NAME="user_$i"

    # Switch to the already created identity
    dfx identity use "$IDENTITY_NAME"
    

    # Assign random ratification response (true or false)
    if (( RANDOM % 2 == 0 )); then
        RATIFICATION_RESPONSE="true"
    else
        RATIFICATION_RESPONSE="false"
    fi

    # Submit ratification response
    echo -e "\e[1;33mSubmitting ratification response for $IDENTITY_NAME...\e[0m"
    dfx canister call "$CANISTER_ID_COMMUNITY_BACKEND" submit_ratification "($RATIFICATION_RESPONSE)"
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32mRatification response ($RATIFICATION_RESPONSE) submitted successfully for $IDENTITY_NAME!\e[0m"
    else
        echo -e "\e[1;31mFailed to submit ratification response for $IDENTITY_NAME. Check the canister logs for details.\e[0m"
    fi
done

# Optional: Reset to the original identity after handling all users
echo -e "\e[1;34mSwitching back to the default identity...\e[0m"
dfx identity use default
