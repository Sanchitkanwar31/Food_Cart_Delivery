// const express = require('express');
// const app = express();
// const port = 3000;

// // Import and connect to MongoDB
// const mongoDB = require("./db");
// mongoDB();

// // CORS Middleware (to allow cross-origin requests)
// app.use((req, res, next) => {
// res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

//   // Allow specific HTTP methods #SETUP of cors manually
// // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");

//   // Allow specific headers
// res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// next(); // Move to the next middleware or route handler
// });


// // Root route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Middleware for parsing JSON bodies
// app.use(express.json());

// // API routes
// app.use('/api', require("./routes/CreateUser"));
// app.use('/api', require("./routes/DisplayData"));
// app.use('/api', require("./routes/OrderData"));

// //
// // Start the server
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });


//CORRECTED NY CHATGPT=============================================================

// // const express = require('express');
// // const app = express();
// // const cors = require('cors');
// // const mongoDB = require("./db"); // Import MongoDB connection

// // const port = 3000;

// // // ✅ Connect to MongoDB
// // mongoDB()
// //   .then(() => console.log("✅ MongoDB connected successfully"))
// //   .catch((err) => {
// //     console.error("❌ MongoDB connection failed:", err);
// //     process.exit(1); // Exit the app if MongoDB fails to connect
// //   });

// // // ✅ Enable CORS
// // app.use(cors({
// //   origin: "http://localhost:5173", // Allow requests from frontend
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   allowedHeaders: ["Content-Type", "Authorization"]
// // }));

// // // ✅ Middleware for parsing JSON bodies
// // app.use(express.json());

// // // ✅ API Routes
// // app.use('/api', require("./routes/CreateUser"));
// // app.use('/api', require("./routes/DisplayData"));
// // app.use('/api', require("./routes/OrderData"));

// // // ✅ Root route (for testing server status)
// // app.get('/', (req, res) => {
// //   res.send('🚀 Server is running!');
// // });

// // // ✅ Start the server
// // app.listen(port, () => {
// //   console.log(`🚀 Server running on http://localhost:${port}`);
// // });



const express = require('express');
const cors = require('cors');  // Import CORS
const mongoDB = require("./db"); // Import MongoDB connection

const app = express();
const port = 3000;

// ✅ Connect to MongoDB
mongoDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit the app if MongoDB fails to connect
  });

// ✅ Enable CORS properly
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend to access the backend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware for parsing JSON bodies
app.use(express.json());

// ✅ API Routes
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

// ✅ Root route (for testing server status)
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:3000`);
});
