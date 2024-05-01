const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../config/generateToken");

module.exports.registerUser =async(req,res)=> {
                const {name, email, password, pic} = req.body;
                console.log(` ${name}, ${email}, ${password}`)
                if(!name || !email || !password){
                    res.status(400);
                    throw new Error("Please Enter all the Feilds");
                }

                const userExists = await User.findOne({email});
                if(userExists){
                    res.status(400);
                    throw new Error("User Already Exists");
                }

                const user = await User.create({
                    name,email,password,pic,
                })
                if(user){
                    res.status(201).json({
                        _id:user._id,
                        name: user.name,
                        email:user.email,
                        pic:user.pic,
                        token:generateToken(user._id)
                    })
                }
                else{
                    res.status(400);
                    throw new Error("Failed To Create New User");
                }}

