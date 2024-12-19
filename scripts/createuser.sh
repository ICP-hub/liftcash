#!/bin/bash

# Enable environment variable export
set -a
source ../.env  # Adjust the relative path to point to the root directory
set +a

NUM_USERS=5
# CANISTER_ID="bd3sg-teaaa-aaaaa-qaaba-cai"  
for ((i=1; i<=NUM_USERS; i++))
do
    
    IDENTITY_NAME="user_$i"
    dfx identity new "$IDENTITY_NAME" --disable-encryption &>/dev/null

    
    dfx identity use "$IDENTITY_NAME"

    
    dfx canister call "$CANISTER_ID_ECONOMY_BACKEND" create_user_record

done


dfx identity use default

echo "Created $NUM_USERS user records."