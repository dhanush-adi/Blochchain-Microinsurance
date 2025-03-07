# Blockchain Microinsurance

This repository contains the code for a blockchain-based microinsurance platform. The project is divided into two main parts: the frontend (`blockchain-microinsurance`) and the backend (`microinsurance-backend`).

## Frontend

The frontend is built with Next.js and Tailwind CSS.

### Running the Frontend

1. Install dependencies:
    ```sh
    cd blockchain-microinsurance
    npm install
    ```

2. Run the development server:
    ```sh
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Backend

The backend is built with Hardhat.

### Running the Backend

1. Install dependencies:
    ```sh
    cd microinsurance-backend
    npm install
    ```

2. Compile the smart contracts:
    ```sh
    npx hardhat compile
    ```

3. Run the tests:
    ```sh
    npx hardhat test
    ```

4. Deploy the contracts:
    ```sh
    npx hardhat run scripts/deploy.js --network <network-name>
    ```

## Environment Variables

Both the frontend and backend use environment variables defined in `.env` files. Ensure to create these files and add the necessary variables as per your configuration.

## License

This project is licensed under the MIT License.