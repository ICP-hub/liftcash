#!/bin/bash

# Enable environment variable export
set -a
source ../.env  # Adjust the relative path to point to the root directory
set +a

PHASE_DURATION=60  # Duration of each phase in seconds
PHASE_DURATION2=120  # Duration of each phase in seconds
SURVEY_SCRIPT="./survey.sh"
VOTE_SCRIPT="./vote.sh"
RATIFY_SCRIPT="./ratify.sh"

# Function to check and handle the current phase
handle_phase() {
    phase=$(dfx canister call "$CANISTER_ID_COMMUNITY_BACKEND" get_current_phase_info)
    variant_value=$(echo "$phase" | grep -oP '(?<=variant \{ ).*?(?= \})')
    echo -e "\e[1;34mCurrent Phase : \e[0m \e[1;32m$variant_value\e[0m"

    case $variant_value in 
        ("Survey")
            echo -e "\e[1;34mRunning the $variant_value script...\e[0m"
            sleep 2  # Pause for 2 seconds
            bash $SURVEY_SCRIPT
            sleep $PHASE_DURATION2
            ;;
        ("Vote")
            echo -e "\e[1;34mRunning the $variant_value script...\e[0m"
            sleep 2  # Pause for 2 seconds
            bash $VOTE_SCRIPT
            sleep $PHASE_DURATION
            ;;
        ("Ratify")
            echo -e "\e[1;34mRunning the $variant_value script...\e[0m"
            sleep 2  # Pause for 2 seconds
            bash $RATIFY_SCRIPT
            sleep $PHASE_DURATION2
            ;;
        (*)
            echo -e "\e[1;31mUnknown phase: $variant_value. Waiting for a known phase...\e[0m"
            ;;
    esac
}

# Main loop to handle actionable phases
echo -e "\e[1;33mStarting the phase handler...\e[0m"
handled_phases=("Survey" "Vote" "Ratify")
phases_completed=0  # Counter for completed actionable phases

while [ $phases_completed -lt ${#handled_phases[@]} ]; do
    handle_phase
    phases_completed=$((phases_completed + 1))
    echo -e "\e[1;33mProceeding to the next phase...\e[0m"
done

echo -e "\e[1;34mAll actionable phases have been handled.\e[0m"
