#!/bin/bash

# Enable environment variable export
set -a
source ../.env  # Adjust the relative path to point to the root directory
set +a

# Number of users to handle dynamically
NUM_USERS=5

# Define constants
CANISTER_NAME="Community_Backend"

# Loop through the users
for ((i=1; i<=NUM_USERS; i++)); do
    
    # Define the identity name for the user
    IDENTITY_NAME="user_$i"

    # Switch to the already created identity
    dfx identity use "$IDENTITY_NAME"
    echo -e "\e[1;34mSwitching to identity: $IDENTITY_NAME\e[0m"

    # Generate dynamic survey records for each user (different records for each user)
    if [ $i -eq 1 ]; then
        SURVEY_RECORDS="vec {
            record { \"1\"; variant { MultipleChoice = \"growing\" } };
            record { \"2\"; variant { PercentageSlider = 18 } };
            record { \"3\"; variant { MultipleChoice = \"neither\" } };
            record { \"4\"; variant { PercentageSlider = 10 } };
            record { \"5\"; variant { Dropdown = vec { \"neither\"; \"shrinking\"; \"growing\" } } }
        }"
    elif [ $i -eq 2 ]; then
        SURVEY_RECORDS="vec {
            record { \"1\"; variant { MultipleChoice = \"neither\" } };
            record { \"2\"; variant { PercentageSlider = 18 } };
            record { \"3\"; variant { MultipleChoice = \"shrinking\" } };
            record { \"4\"; variant { PercentageSlider = 8 } };
            record { \"5\"; variant { Dropdown = vec { \"neither\"; \"shrinking\"; \"growing\" } } }
        }"
    elif [ $i -eq 3 ]; then
        SURVEY_RECORDS="vec {
            record { \"1\"; variant { MultipleChoice = \"growing\" } };
            record { \"2\"; variant { PercentageSlider = 18 } };
            record { \"3\"; variant { MultipleChoice = \"growing\" } };
            record { \"4\"; variant { PercentageSlider = 17 } };
            record { \"5\"; variant { Dropdown = vec { \"neither\"; \"shrinking\"; \"growing\" } } }
        }"
    elif [ $i -eq 4 ]; then
        SURVEY_RECORDS="vec {
            record { \"1\"; variant { MultipleChoice = \"shrinking\" } };
            record { \"2\"; variant { PercentageSlider = 12 } };
            record { \"3\"; variant { MultipleChoice = \"growing\" } };
            record { \"4\"; variant { PercentageSlider = 15 } };
            record { \"5\"; variant { Dropdown = vec { \"neither\"; \"shrinking\"; \"growing\" } } }
        }"
    elif [ $i -eq 5 ]; then
        SURVEY_RECORDS="vec {
            record { \"1\"; variant { MultipleChoice = \"growing\" } };
            record { \"2\"; variant { PercentageSlider = 8 } };
            record { \"3\"; variant { MultipleChoice = \"growing\" } };
            record { \"4\"; variant { PercentageSlider = 9 } };
            record { \"5\"; variant { Dropdown = vec { \"neither\"; \"shrinking\"; \"growing\" } } }
        }"
    fi

    # Submit the survey records dynamically for each user
    echo -e "\e[1;33mSubmitting survey records for $IDENTITY_NAME...\e[0m"
    dfx canister call "$CANISTER_NAME" submit_survey "($SURVEY_RECORDS)"
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32mSurvey records submitted successfully for $IDENTITY_NAME!\e[0m"
    else
        echo -e "\e[1;31mFailed to submit survey records for $IDENTITY_NAME. Check the canister logs for details.\e[0m"
    fi
done

# Optional: Reset to the original identity after handling all users
echo -e "\e[1;34mSwitching back to the default identity...\e[0m"
dfx identity use default

