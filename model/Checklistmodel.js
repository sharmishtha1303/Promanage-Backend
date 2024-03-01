//The mongoose module is imported to interact with MongoDB
const mongoose = require("mongoose")

//Checklistschema is defined using mongoose.Schema
const Checklistschema = new mongoose.Schema({
    priority: { type: String, required: true },//Represents the priority of the checklist item
    name: { type: String, required: true },//Represents the name of the checklist item
    duedate: { type: String },//Represents the optional due date for the checklist item
    checklistarr: { type: Array, required: true },//Represents an array of checklist items
    markedval: { type: Number, required: true },//Represents a numerical value used to mark checklist items
    createdAt: { type: Number, required: true },//Represents the timestamp when the checklist was created
    userid: { type: String, required: true },//Represents the user ID associated with the checklist
    sectiontype: { type: String, required: true }//Represents the type of section for the checklist
})

module.exports = mongoose.model("Checklist", Checklistschema)
