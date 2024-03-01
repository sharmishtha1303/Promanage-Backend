//  To interact with MongoDB
const mongoose = require("mongoose")

// Define a schema 
const Userschema = new mongoose.Schema({
    // define skills
    name : {type : String, required : true}, // User name
    email : {type : String, required : true}, // email
    password : {type : String, required : true}, // user pass
})

// modal export
module.exports = mongoose.model("User", Userschema)
