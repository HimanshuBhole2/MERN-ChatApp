const express = require("express");
const { protect } = require("../middleware/authMiddleware")
const { accessChat, fetchChats,createGroupChat,renameGroup,addToGroup,removeGroup} = require("../controller/chatControllers")
const userControllers = require("../controller/userControllers");
const asyncHandler = require("express-async-handler");


const router = express.Router();
//for accessing the chat
router.route("/").post(protect,asyncHandler(async (req,res)=>{ await accessChat(req,res); }))
// for retriving the chat
router.route("/").get(protect,asyncHandler(async (req,res)=>{ await fetchChats(req,res); }))

// TO create the group
router.route("/group").post(protect,asyncHandler(async (req,res)=>{
    await createGroupChat(req,res);
}))

// to rename the group
router.route("/rename").put(protect,asyncHandler(async (req,res)=>{ await renameGroup(req,res)}))

// to remove user from the group
router.route("/groupremove").put(protect,asyncHandler(async(req,res)=>{await removeGroup(req,res);}));

//to add user to the group
router.route("/groupadd").put(protect,asyncHandler(async(req,res)=>{ await addToGroup(req,res);}));

module.exports = router