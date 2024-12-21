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

    # Generate dynamic vote records for each user
    
    # Generate random value between 0 and 100 for question 1
    Q1_VALUE=$((RANDOM % 101))
    
    # Generate random values between 6 and 30 for questions 2 and 3
    Q2_VALUE=$((6 + RANDOM % 25))
    Q3_VALUE=$((6 + RANDOM % 25))
    
    # Generate a random floating point number between 0.0167 and 0.04 for question 4
    Q4_RANDOM=$(awk -v min=0.0167 -v max=0.04 'BEGIN{srand(); print min+rand()*(max-min)}')
    # Convert the Q4 random value to a scale between 0 and 255 and round it
    Q4_VALUE=$(awk -v value="$Q4_RANDOM" 'BEGIN{print int(((value - 0.0167) / 0.0233) * 255 + 0.5)}')

    VOTE_RECORDS="vec {
        record { \"1\"; variant { PercentageVote = $Q1_VALUE } };
        record { \"2\"; variant { PercentageVote = $Q2_VALUE } };
        record { \"3\"; variant { PercentageVote = $Q3_VALUE } };
        record { \"4\"; variant { PercentageVote= $Q4_VALUE } }
    }"

    echo -e "\e[1;33mValues for $IDENTITY_NAME: Q1=$Q1_VALUE, Q2=$Q2_VALUE, Q3=$Q3_VALUE, Q4=$Q4_VALUE\e[0m"

    # Submit the vote records dynamically for each user
    echo -e "\e[1;33mSubmitting vote records for $IDENTITY_NAME...\e[0m"

    if [[ $1 == "ic" ]]; then
        dfx canister call "$CANISTER_ID_COMMUNITY_BACKEND" submit_vote "($VOTE_RECORDS)" --network ic
    else
        dfx canister call "$CANISTER_ID_COMMUNITY_BACKEND" submit_vote "($VOTE_RECORDS)"
    fi
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32mVote records submitted successfully for $IDENTITY_NAME!\e[0m"
    else
        echo -e "\e[1;31mFailed to submit vote records for $IDENTITY_NAME. Check the canister logs for details.\e[0m"
    fi
done

# Optional: Reset to the original identity after handling all users
echo -e "\e[1;34mSwitching back to the default identity...\e[0m"
dfx identity use default
