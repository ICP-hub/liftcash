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
    echo -e "\e[1;34mSwitching to identity: $IDENTITY_NAME\e[0m"

    # Generate dynamic survey records for each user (different records for each user)
    
    # Generate random percentage between 1 and 24 for question 2
    PERCENTAGE_SLIDER=$((1 + RANDOM % 24))

    echo "slider :: $PERCENTAGE_SLIDER"

    # Generate different survey records based on user number
    SURVEY_RECORDS="vec {
        record { \"1\"; variant { MultipleChoice = \"$(shuf -n 1 -e growing shrinking neither)\" } };
        record { \"2\"; variant { PercentageSlider = $PERCENTAGE_SLIDER } };
        record { \"3\"; variant { MultipleChoice = \"$(shuf -n 1 -e growing shrinking neither)\" } };
        record { \"4\"; variant { PercentageSlider = $((RANDOM % 24)) } };
        record { \"5\"; variant { Dropdown = vec { \"$(shuf -n 1 -e growing shrinking neither)\"; \"$(shuf -n 1 -e growing shrinking neither)\"; \"$(shuf -n 1 -e growing shrinking neither)\" } } }
    }"

    # Submit the survey records dynamically for each user
    echo -e "\e[1;33mSubmitting survey records for $IDENTITY_NAME...\e[0m"
    dfx canister call "$CANISTER_ID_COMMUNITY_BACKEND" submit_survey "($SURVEY_RECORDS)"
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32mSurvey records submitted successfully for $IDENTITY_NAME!\e[0m"
    else
        echo -e "\e[1;31mFailed to submit survey records for $IDENTITY_NAME. Check the canister logs for details.\e[0m"
    fi
done

# Optional: Reset to the original identity after handling all users
echo -e "\e[1;34mSwitching back to the default identity...\e[0m"
dfx identity use default
