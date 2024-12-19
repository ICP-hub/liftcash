#!/bin/bash

# give execute permission to other scripts
echo -e "\e[1;34mSetting execute permissions for scripts...\e[0m" 
chmod +x deploy.sh
chmod +x createuser.sh
chmod +x participate.sh
chmod +x remove.sh
echo -e "\e[1;34mPermissions set successfully!\e[0m"


# Path to the deploy script
DEPLOY_SCRIPT="./deploy.sh"
CREATE_USER_SCRIPT="./createuser.sh"

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
bash participate.sh