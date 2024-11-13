# Payment Wallet

A full-stack payment wallet application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application facilitates secure user authentication, seamless fund transfers, and transaction management, providing an intuitive and efficient user experience.

## Project Structure

- **Frontend**: Contains the React.js application with Tailwind CSS for a responsive UI/UX.
- **Backend**: Built with Express.js and Node.js, connected to a MongoDB database for handling data securely.

## Features

### Core Features
- **User Authentication**: Secure sign-in and sign-up processes to safeguard user accounts.
- **Fund Transfers**: Simple and efficient money transfer capabilities.
- **Transaction History**: View past transactions with detailed records.
- **Responsive Design**: Optimized for various devices for a smooth user experience.

## Technologies Used

### Frontend
- **React.js** for building the user interface
- **Tailwind CSS** for responsive and customizable styling

### Backend
- **Node.js** and **Express.js** for the server-side application
- **MongoDB** with **Mongoose** for database management
- **JWT** (JSON Web Tokens) for secure user authentication

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system
- MongoDB instance (local or cloud-based)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mihirjataniya/Payment-wallet.git
   cd Payment-wallet
   ```

2. **Install dependencies**:
   - **Frontend**:
     ```bash
     cd Frontend
     npm install
     ```
   - **Backend**:
     ```bash
     cd Backend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `Backend` folder and add your environment variables for database connections and JWT secrets.

4. **Run the application**:
   - **Backend**:
     ```bash
     cd Backend
     npm run dev
     ```
   - **Frontend**:
     Open a new terminal and run:
     ```bash
     cd Frontend
     npm start
     ```

5. **Access**:
   Visit [http://localhost:5500](http://localhost:5500) to interact with the application.

## Future Enhancements
- **Payment Gateway Integration**: Support for third-party payment services.
- **Notifications**: Implement real-time notifications for transactions.
- **Enhanced Security**: Include features like two-factor authentication (2FA).
