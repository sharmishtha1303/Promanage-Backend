// Import required modules and initialize the router
const router = require("express").Router()
const Usermodel = require("../model/Usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config() // Load environment variables

// POST request for user login
router.post("/login", async (req, res) => {
    // Destructure email and password from request body
    const {email, password} = req.body
    // Find user by email
    const user = await Usermodel.findOne({email})
    // If user not found, return error message
    if(!user){
        return res.json({
            message : "Wrong Email or password"
        })
    }
    try{
        // Compare submitted password with hashed password in database
        const hasmatch = await bcrypt.compare(password, user.password)
        // If password matches, create and return JWT token
        if(hasmatch){
            const jwttoken = jwt.sign(user.toJSON(), "12@g", {expiresIn:180})
            res.json({  
                jwttoken,
                user
            })
        }else{
            // If password does not match, return error message
            res.json({
                message : "Wrong Email or password"
            })
        }
    }catch(err){
        // Catch and respond with any error during the process
        res.json({
            message : "oops something went wrong"
        })
    }
})

// POST request for user registration
router.post("/register", async (req, res)=>{
    // Destructure name, email, and password from request body
    const {name, email, password} = req.body
    // Check if email is already used
    const alreadyuser = await Usermodel.findOne({email})
    if(alreadyuser){
        return res.json({
            message : "Email already present"
        })
    }
    try{
        // Hash password and create new user
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new Usermodel({name, email, password : hashedpassword})
        const saveduser = await user.save()
        // Create and return JWT token for the new user
        const jwttoken = jwt.sign(user.toJSON(), "12@g", {expiresIn: 180})
        res.json({
            jwttoken,
            user : saveduser
        })
    }catch(err){
        // Catch and respond with any error during registration
        res.json({
            message : "something went wrong"
        })
    }
})

// PATCH request to update user information
router.patch("/updateuser/:id", async (req, res) =>{
    // Get user ID from request parameters
    const {id} = req.params
    try{
        // Destructure name and password from request body
        const {name, password} = req.body
        // Check if both name and password are provided and update accordingly
        if(name && password){
            const hashedpassword = await bcrypt.hash(password, 10)
            const updateduser = await Usermodel.findByIdAndUpdate(id, {name, password : hashedpassword})
            return res.json({
                updateduser
            })
        }else if(password){
            // If only password is provided, update it
            const hashedpassword = await bcrypt.hash(password, 10)
            const updateduser = await Usermodel.findByIdAndUpdate(id, {password : hashedpassword})
            return res.json({
                updateduser
            })
        }else{
            // If only name is provided, update it
            const updateduser = await Usermodel.findByIdAndUpdate(id, {name})
            return res.json({
                updateduser
            })            
        }
    }catch(err){
        // Catch and respond with any error during update
        res.json({
            message : "something went wrong"
        })
    }
})
// Export the router
module.exports = router
