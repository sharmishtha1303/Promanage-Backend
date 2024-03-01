// Import required modules and initialize the router
const router = require("express").Router()
const Checklistmodel = require("../model/Checklistmodel")

// POST request to add a new checklist
router.post("/addchecklist", async (req, res) =>{
    // Destructure request body to get checklist details
    const {priority, name, duedate, createdAt, markedval, checklistarr, userid, sectiontype} = req.body
    try{
        // Create a new checklist model and save it to the database
        const checklist = new Checklistmodel({priority, name, createdAt, duedate, checklistarr, markedval, userid, sectiontype})
        const newchecklist = await checklist.save()
        // Return the newly created checklist
        res.json({
            newchecklist
        })
    }catch(err){
        // Handle any errors
        res.json({
            message : "something went wrong"
        })
    }
})

// GET request to fetch checklists based on user ID and optional time filter
router.get("/getchecklist/:id", async (req, res) =>{
    const {id} = req.params
    const {time} = req.query
    try{
        // Fetch all checklists for a user, optionally filtered by time
        if(time == "all"){
            const allchecklist = await Checklistmodel.find({userid : id})
            return res.json({
                allchecklist
            })
        }
        const allchecklist = await Checklistmodel.find({userid : id, createdAt : time})
        res.json({
            allchecklist
        })
    }catch(err){
        // Handle any errors
        res.json({
            message : "something went wrong"
        })
    }
})

// DELETE request to delete a checklist by its ID
router.delete("/deletechecklist/:id", async (req, res) =>{
    const {id} = req.params
    try{
        // Delete the checklist and return the deleted document
        const deletedchecklist = await Checklistmodel.findByIdAndDelete(id)
        res.json({
            deletedchecklist
        })
    }catch(err){    
        // Handle any errors
        res.json({
            message : "something went wrong"
        })
    }
})

// PATCH request to update a checklist by its ID
router.patch("/updatechecklist/:id", async (req, res) =>{
    const {id} = req.params
    const {priority, name, duedate, markedval, checklistarr, sectiontype} = req.body
    try{
        // Update the checklist based on provided fields and return the updated document
        if(priority){
            const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, {
                priority, name, duedate, markedval, checklistarr, sectiontype
            })
            return res.json({
                updatedchecklist
            })
        }
        if(sectiontype){
            const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, {sectiontype})
            return res.json({
                updatedchecklist
            })
        }
        const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, {markedval, checklistarr})
        res.json({
            updatedchecklist
        })
    }catch(err){
        // Handle any errors
        res.json({
            message : "something went wrong"
        })
    }
})

// GET request to fetch a single checklist by its ID
router.get("/getsinglechecklist/:id", async (req, res) =>{
    const {id} = req.params
    try{
        // Fetch the checklist by ID and return it
        const singlechecklist = await Checklistmodel.findById(id)
        res.json({
            singlechecklist
        })
    }catch(err){
        // Handle any errors
        res.json({
            message : "something went wrong"
        })
    }
})
// Export the router for use in the main application
module.exports = router
