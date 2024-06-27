const express = require("express")
const asyncHandler = require("express-async-handler");
const { sendMessage,allMessage} = require("../controller/messageController");
const { protect } = require("../middleware/authMiddleware")


const router = express.Router();


router.route('/').post(protect,asyncHandler( async(req,res)=>{await sendMessage(req,res);}));
// Get Message Here;
router.route('/:chatId').get(protect,asyncHandler(async(req,res) => {await allMessage(req,res);}));


module.exports = router;
