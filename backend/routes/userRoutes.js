const express = require('express');
const userControllers = require("../controller/userControllers");
const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");


router.route('/')
    .post(asyncHandler(async (req,res)=>{
    await userControllers.registerUser(req, res); // Call the registerUser function
    }))
    .get(protect,asyncHandler(async(req,res)=>{
        await userControllers.allUser(req,res);
    }))





router.post("/login",asyncHandler(async (req,res)=>{
    await userControllers.authUser(req,res);
}))

module.exports = router;