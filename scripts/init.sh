#!/bin/bash

# Path to the deploy script
DEPLOY_SCRIPT="./deploy.sh"

# Helper function to print a line
print_line() {
  echo -e "\e[1;34m-------------------------------------------\e[0m"
}

echo -e "\e[1;36m-Hello-\e[0m"

# Run the deploy script with a fancy message
echo -e "\e[1;34mRunning the deployment script...\e[0m"
sleep 2  # Pause for 2 seconds
if [[ $1 == "ic" ]]; then
    bash $DEPLOY_SCRIPT ic
else
    bash $DEPLOY_SCRIPT
fi
print_line


