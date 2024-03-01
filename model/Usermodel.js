// Import the mongoose module to work with MongoDB
const mongoose = require("mongoose")

// Define a schema for the User collection
const Userschema = new mongoose.Schema({
    // Define fields with their types and required status
    name : {type : String, required : true}, // Name of the user
    email : {type : String, required : true}, // Email of the user, must be unique
    password : {type : String, required : true}, // Password of the user
})

// Export the model to use it in other parts of the application
module.exports = mongoose.model("User", Userschema)
