const express = require('express');
const userControllers = require("../controller/userControllers");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.route('/').post(asyncHandler(async (req,res)=>{
    await userControllers.registerUser(req, res); // Call the registerUser function
}));

module.exports = router;