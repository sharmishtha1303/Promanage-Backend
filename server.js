// Import required modules
const express = require("express"); // Import Express framework
const app = express(); // Create Express app instance
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const bodyParser = require("body-parser"); // Import body-parser middleware for parsing request bodies
const authRoute = require("./routes/authRoute"); // Import authentication routes
const checklistRoute = require("./routes/checklistRoute"); // Import checklist routes
const cors = require("cors"); // Import CORS middleware for enabling cross-origin requests
const dotenv = require("dotenv"); // Import dotenv for environment variables
dotenv.config(); // Load environment variables

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({extended:false})); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("database connected"); })
    .catch(() => { console.log("database not connected"); });

// Define routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/checklist", checklistRoute); // Checklist routes

// Start the server
const PORT = process.env.PORT || 5000; // Set the port for the server
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});
