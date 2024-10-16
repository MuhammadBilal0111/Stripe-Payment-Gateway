# Stripe Payment Gateway Integration (React & Node.js)

This project demonstrates how to integrate **Stripe's payment gateway** in a full-stack application using **React** for the frontend and **Node.js** with **Express** for the backend. The application allows users to make secure payments with a simple user interface.

## Features

- **Secure Payments**: Leverages Stripe's API for handling transactions.
- **User-Friendly Interface**: Collects payment details through a clean and simple UI.
- **CORS Support**: Ensures secure communication between frontend and backend.
- **Idempotency Key**: Prevents duplicate charges from multiple requests.

## Technologies Used

- **Frontend**: React, Fetch API
- **Backend**: Node.js, Express.js, Stripe API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- A Stripe account with API keys for test mode

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd stripe-payment-integration
    ```

2. **Set up the backend:**

    ```bash
    cd server
    npm install
    ```

3. **Configure environment variables:**

    - Create a `.env` file in the `server` directory and add your Stripe secret key:

      ```bash
      STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
      PORT=3000
      ```

4. **Run the backend server:**

    ```bash
    npm start
    ```

   This will start the backend server on `http://localhost:3000`.

5. **Set up the frontend:**

    ```bash
    cd ../client
    npm install
    ```

6. **Start the React development server:**

    ```bash
    npm start
    ```

   This will start the React app on `http://localhost:3001`.

## Contributing

Feel free to submit pull requests or open issues to help improve the project.

## License

This project is open-source.
