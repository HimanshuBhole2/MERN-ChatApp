const userControllers = require("../controller/userControllers");
const User = require("../model/chatModel")
const Chat = require("../model/chatModel")
const Message = require("../model/messageModel");

// to access the chat
const accessChat = async(req,res)=>{
    const { userid } = req.body;

    if(!userid) {
        console.log("UseriD param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and : [
            {users:{$elemMatch:{$eq:req.user._id} } },
            {users: { $elemMatch: { $eq: userid} } }
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
         path: "latestMessage.sender",
         select : "name pic email",
    })

    if(isChat.length>0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName : "sender",
            isGroupChat: false,
            users: [req.user._id, userid],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id : createdChat._id}).populate("users", "-password")

            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }

}

// Fetch Chats Here
const fetchChats = async(req,res)=>{
    try {
        Chat.find(
            {users: { $elemMatch: {$eq: req.user._id}}}
        ).populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("letestMessage")
        .sort({updatedAt : -1})
.then(async (results) => {
    results =  await User.populate(results, {
        path: "latestMessage.sender",
        select : "name pic email",
   })

     res.status(200).send(results)
})
    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }
}



// Here Creating Group

const createGroupChat = async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message: "Pleast Fill all the Feilds"})
    }

    var users = JSON.parse(req.body.users);


    if(users.length < 2) {
        return res
         .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatname: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");

        res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// TO rename the gruopp"
const renameGroup = async(req,res) =>{
    const { chatId, chatname } = req.body;


    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatname,
        },
        {
            new: true,
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat)
    }
}

// Add Person to Grop 

const addToGroup  = async(req,res)=>{
   const {chatId, userId } = req.body; 

   const added = await Chat.findByIdAndUpdate(chatId,
    {
        $push: {users: userId},
    },
    {
        new : true
    }
   ).populate("users","-password").populate("groupAdmin","-password");

   if(!added) {
    res.status(404);
    throw new Error("Chat Not Found")
   } else {
    res.json(added);
   }
}


// Remove the Group

const removeGroup = async(req,res)=>{
    const {chatId, userId } = req.body; 

   const removed =await Chat.findByIdAndUpdate(chatId,
    {
        $pull: {users: userId},
    },
    {
        new : true
    }
   ).populate("users","-password").populate("groupAdmin","-password");

   if(!removed) {
    res.status(404);
    throw new Error("Chat Not Found")
   } else {
    res.json(removed);
   }
}

module.exports = { 
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup, 
    addToGroup,
    removeGroup
    
    };