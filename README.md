# Lift_Cash

**Lift Cash** is a self-governed, cooperative economic system built on the blockchain that allows participants to democratically manage fiscal policy and earn a meaningful, sustainable crypto income through the wisdom of the crowd.

## Installation

To install and set up the Lift Cash project locally, follow these steps:

### 1. Clone the Repository
Clone the Lift Cash GitHub repository to your local machine:

```bash
git clone https://github.com/ICP-hub/liftcash.git
```

### 2. Start the Local Replica
Run the following command to start a local replica of the Internet Computer:

```bash
dfx start
```

### 3. Install Dependencies
Navigate to the project folder and install the required dependencies:

```bash
npm install
```

### 4. Update Deployment Scripts
Replace the `Principal` in the `LIFT_DEPLOY.sh` and `PROMO_DEPLOY.sh` files with your own Principal (e.g., `export DEFAULT=sfwko-hd7us-gen5t-ssuci-vfjwf-afepb-a7p4y-guh5l-s5n2e-zuxvt-dae`).

### 5. Create New Identities
Create a new identity for the `minter` and `archive_controller` by running:

```bash
dfx identity new minter
dfx identity new archive_controller
```

### 6. Deploy Canisters
Run the deployment script to deploy canisters on your local replica. Navigate to the `Scripts` folder and make the `deploy.sh` script executable:

```bash
cd Scripts
chmod +x deploy.sh
./deploy.sh
```

### 7. Manage Dependencies
Run the following commands to pull and deploy any external dependencies required by the project:

- **Pull Dependencies**: This command downloads any required dependencies defined in the `dfx.json` file from the mainnet (or from a specified network):

    ```bash
    dfx deps pull
    ```

- **Deploy Dependencies**: After pulling the dependencies, deploy them on your local replica:

    ```bash
    dfx deps deploy
    ```

### 8. Start the Frontend
Run the following command to start the frontend:

```bash
npm start
```

### 9. Access the Frontend
Open your web browser and navigate to `http://localhost:3000` to view the application.


