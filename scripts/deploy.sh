#!/bin/bash

# Notify the user
echo -e "\e[1;34mEnvironment variables loaded from .env.\e[0m"
sleep 2  # Add a 2-second delay

# Build the Community_Backend and Economy_Backend projects
echo -e "\e[1;34mBuilding the Community_Backend project...\e[0m"
sleep 1  # Add a 1-second delay before building Community_Backend
cargo build --release --target wasm32-unknown-unknown --package Community_Backend
if [ $? -eq 0 ]; then
  echo -e "\e[1;32mCommunity_Backend build successful.\e[0m"
else
  echo -e "\e[1;31mCommunity_Backend build failed. Exiting.\e[0m"
  exit 1
fi
sleep 2  # Add a 2-second delay after Community_Backend build


echo -e "\e[1;34mBuilding the Economy_Backend project...\e[0m"
sleep 1  # Add a 1-second delay before building Economy_Backend
cargo build --release --target wasm32-unknown-unknown --package Economy_Backend
if [ $? -eq 0 ]; then
  echo -e "\e[1;32mEconomy_Backend build successful.\e[0m"
else
  echo -e "\e[1;31mEconomy_Backend build failed. Exiting.\e[0m"
  exit 1
fi
sleep 2  # Add a 2-second delay after Economy_Backend build

# Extract Candid interfaces
echo -e "\e[1;34mExtracting Candid interface for Community_Backend...\e[0m"
sleep 1  # Add a 1-second delay before extracting Candid interface for Community_Backend
candid-extractor ../target/wasm32-unknown-unknown/release/Community_Backend.wasm > ../src/Community_Backend/Community_Backend.did
if [ $? -eq 0 ]; then
  echo -e "\e[1;32mCandid interface for Community_Backend extracted successfully.\e[0m"
else
  echo -e "\e[1;31mFailed to extract Candid interface for Community_Backend. Exiting.\e[0m"
  exit 1
fi
sleep 2  # Add a 2-second delay after extracting Community_Backend Candid interface

echo -e "\e[1;34mExtracting Candid interface for Economy_Backend...\e[0m"
sleep 1  # Add a 1-second delay before extracting Candid interface for Economy_Backend
candid-extractor ../target/wasm32-unknown-unknown/release/Economy_Backend.wasm > ../src/Economy_Backend/Economy_Backend.did
if [ $? -eq 0 ]; then
  echo -e "\e[1;32mCandid interface for Economy_Backend extracted successfully.\e[0m"
else
  echo -e "\e[1;31mFailed to extract Candid interface for Economy_Backend. Exiting.\e[0m"
  exit 1
fi
sleep 2  # Add a 2-second delay after extracting Economy_Backend Candid interface

# Deployment logic: Dynamic target selection
if [[ $1 == "ic" ]]; then
  echo -e "\e[1;34mDeploying to the Internet Computer main network...\e[0m"
  sleep 2  # Add a 2-second delay before deployment to the main network
  dfx deploy --network ic --no-wallet
else
  echo -e "\e[1;34mDeploying locally...\e[0m"
  sleep 2  # Add a 2-second delay before local deployment
  dfx deploy
fi

# Check deployment success
if [ $? -eq 0 ]; then
  echo -e "\e[1;36mDeployment completed successfully.\e[0m"
else
  echo -e "\e[1;31mDeployment failed. Check logs for more details.\e[0m"
  exit 1
fi
