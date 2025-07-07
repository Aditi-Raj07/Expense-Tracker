require('dotenv').config(); // 👈 this must come first
 // Load environment variables from .env file
const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware for cross-origin requests
const path = require("path"); // Import path module for handling file paths
const connectDB =require("./config/db"); // Import database connection function
const app = express(); // Create an Express application instance
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const upload = require("./middleware/uploadMiddleware"); // Import file upload middleware
const IncomeRoutes = require("./routes/IncomeRoutes"); // Import income-related routes
const ExpenseRoutes = require("./routes/ExpenseRputes"); // Import expense-related routes
const DashboardRoutes = require("./routes/dashboardRoutes"); // Import dashboard routes

// Configure CORS middleware to allow requests from client URL or any origin
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        // CORS stands for Cross-Origin Resource Sharing. It's a security mechanism implemented
        // in web browsers that controls how web pages in one domain can request and interact with resources from another domain.
        // This setting stops website A from using resources of website B unless allowed.
        methods:["GET","POST","PUT","DELETE"], // Allowed HTTP methods
        allowedHeaders:["Content-Type","Authorization"], // Allowed headers in requests
    })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB database
connectDB();

// Register route handlers for different API endpoints
app.use("/api/v1/auth",authRoutes );
app.use("/api/v1/income",IncomeRoutes );
app.use("/api/v1/expense",ExpenseRoutes );
app.use("/api/v1/dashboard",DashboardRoutes);

// Set the port to environment variable PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Serve static files from the uploads directory
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log("Server is running ...."); // Log server start message
})

