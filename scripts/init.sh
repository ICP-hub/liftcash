#!/bin/bash

# give execute permission to other scripts
echo -e "\e[1;34mSetting execute permissions for scripts...\e[0m" 
chmod +x deploy.sh
chmod +x createuser.sh
chmod +x participate.sh
chmod +x survey.sh
chmod +x vote.sh
chmod +x ratify.sh
chmod +x remove.sh

echo -e "\e[1;34mPermissions set successfully!\e[0m"


# Path to the deploy script
DEPLOY_SCRIPT="./deploy.sh"
CREATE_USER_SCRIPT="./createuser.sh"
PARTICIPATE_SCRIPT="./participate.sh"
REMOVE_SCRIPT="./remove.sh"

# Helper function to print a line
print_line() {
  echo -e "\e[1;34m-------------------------------------------\e[0m"
}

# Run the deploy script with a fancy message
echo -e "\e[1;34mRunning the deployment script...\e[0m"
sleep 2  # Pause for 2 seconds
if [[ $1 == "ic" ]]; then
    bash $DEPLOY_SCRIPT ic
else
    echo -e "\e[1;34mStarting a clean local Internet Computer replica \e[0m"
    dfx stop
    dfx start --clean --background
    bash $DEPLOY_SCRIPT
fi
print_line

# Run create user script
echo -e "\e[1;34mCreating user records...\e[0m"
sleep 2  # Pause for 2 seconds  
bash $CREATE_USER_SCRIPT
print_line

# Run the participate script
echo -e "\e[1;34mRunning the participation script...\e[0m"
sleep 2  # Pause for 2 seconds
bash $PARTICIPATE_SCRIPT

# End of script
echo -e "\e[1;32mOne Week of Community Governance has been simulated successfully!\e[0m"
print_line

# Deleting all the created identities
echo -e "\e[1;34mDeleting all the created identities...\e[0m"
sleep 2  # Pause for 2 seconds
bash $REMOVE_SCRIPT