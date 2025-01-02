export AMOUNT_TO_MINT=100000000000000

export RECIPIENT_PRINCIPAL=sfwko-hd7us-gen5t-ssuci-vfjwf-afepb-a7p4y-guh5l-s5n2e-zuxvt-dae

dfx identity use minter

dfx canister call Lift_ledger_canister icrc1_transfer '(record { 
  to = record { owner = principal "'${RECIPIENT_PRINCIPAL}'" };
  amount = '${AMOUNT_TO_MINT}';
})'
