# Food Cart Delivery

Food Cart Delivery is a MERN-based platform for seamless food ordering and delivery. Built with React.js, Node.js, Express.js, and MongoDB, it ensures a smooth user experience, secure authentication, real-time order tracking, and online payment.

## Project Structure
```
Food_Cart_Delivery/
│── backend/     # Backend (Node.js, Express.js, MongoDB)
│── frontend/    # Frontend (React.js)
│── package.json # Project dependencies
│── README.md    # Project documentation
```

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Sanchitkanwar31/Food_Cart_Delivery.git
cd Food_Cart_Delivery
```

### 2️⃣ Install Dependencies
#### Frontend
```sh
cd frontend
npm install
```
#### Backend
```sh
cd backend
npm install
```

## Running the Project

### 🚀 Start Frontend (React.js + Vite)
Navigate to the `frontend` directory:
```sh
cd frontend
npm run dev
```
The frontend will start at `http://localhost:5173` (default Vite port).

### 🚀 Start Backend (Node.js + Express.js + MongoDB)
Navigate to the `backend` directory:
```sh
cd backend
npx nodemon index.js
```
The backend will start at `http://localhost:5000` (or your configured port).

## Environment Variables
Create a `.env` file in the `backend` directory and add your MongoDB URI and other necessary secrets:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## 🚀 Happy Coding! 🎉



---

# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
