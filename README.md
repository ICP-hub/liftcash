# Lift_Cash

**Lift Cash** is a self-governed, cooperative economic system built on the blockchain that allows participants to democratically manage fiscal policy and earn a meaningful, sustainable crypto income through the wisdom of the crowd.

## Installation

To install and set up the Lift Cash project locally, follow these steps:

### 1. Clone the Repository
Clone the Lift Cash GitHub repository to your local machine:

```bash
git clone https://github.com/ICP-hub/liftcash.git
```

### 2. Install Dependencies
Navigate to the project folder and install the required dependencies:

```bash
npm install
```

### 3. Start the Internet Computer Replica
Start the local Internet Computer replica by running the following command:

```bash
dfx start --background --clean
```

### 4. Manage Dependencies
Run the following commands to pull and deploy any external dependencies required by the project:

- **Pull Dependencies**: This command downloads any required dependencies defined in the `dfx.json` file from the mainnet (or from a specified network):

    ```bash
    dfx deps pull
    ```
- **Initialize Dependencies**: This command initializes the dependencies:

    ```bash
    dfx deps init
    ```

- **Deploy Dependencies**: After pulling the dependencies, deploy them on your local replica:

    ```bash
    dfx deps deploy
    ```

### 5. Deploy the Canisters
Run the following command to deploy the Lift Cash canisters:

```bash
cd scripts 

# To deploy the canisters to the local replica
./deploy.sh 

# To deploy the canisters on IC Mainnet
./deploy.sh ic
```

### 6. Start the Frontend
Run the following command to start the frontend:

```bash
npm start
```

### 9. Access the Frontend
Open your web browser and navigate to `http://localhost:3000` to view the Dapp.


## Testing

To run the tests for the Lift Cash project, run the following command:

```bash 
cd scripts

# To run the tests on the local replica
./init.sh

# To run the tests on the IC Mainnet
./init.sh ic
```

This command will initialize the test environment and run the test cases for the Lift Cash project. When the tests are complete, you will see the test results in the terminal.

Test scripts are able to create new users, and participate in the governance of the Lift Cash project. The tests are designed to simulate the behavior of real users interacting with the Dapp.



