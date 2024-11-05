# Lift_Cash

Lift Cash is a self-governed, cooperative economic system built on the blockchain that allows participants to democratically manage a fiscal policy and earn a meaningful, sustainable crypto incomethroughthewisdomofthecrowd.

## Installation

To install the project, follow these steps:

1. Clone the repository

    ```bash
    git clone https://github.com/ICP-hub/liftcash.git
    ```
2. Run `dfx start` to start the local replica
3. Install the dependencies by running `npm install`
4. Replace the Principal in LIFT_DEPLOY.sh and PROMO_DEPLOY.sh with your own Principal ( e.g. export DEFAULT=sfwko-hd7us-gen5t-ssuci-vfjwf-afepb-a7p4y-guh5l-s5n2e-zuxvt-dae )
5. Create a minter and archive_controller Identity by running `dfx identity new minter` and `dfx identity new archive_controller`
6. Deploy the canisters by running `dfx deploy` or by running scripts in the `scripts` folder (e.g. `Scripts/deploy.sh`)
   ````bash
    cd Scripts
    chmod +x deploy.sh
    ./deploy.sh
    ````
7. Run the frontend by running `npm start`
8. Open the frontend in your browser by navigating to `http://localhost:3000`


