// Import the mongoose module to work with MongoDB
const mongoose = require("mongoose")

// Define a schema for the Checklist collection
const Checklistschema = new mongoose.Schema({
    // Define fields with their types and required status
    priority : {type : String, required : true}, // Priority of the checklist item
    name : {type : String, required : true}, // Name of the checklist item
    duedate : {type : String}, // Due date for the checklist item (optional)
    checklistarr : {type:Array, required:true}, // Array of checklist items
    markedval : {type : Number, required : true}, // Value to mark checklist items
    createdAt : {type : Number, required : true}, // Timestamp when the checklist was created
    userid : {type : String, required:true}, // User ID associated with the checklist
    sectiontype : {type:String, required:true} // Type of section for the checklist
})

// Export the model to use it in other parts of the application
module.exports = mongoose.model("Checklist", Checklistschema)
