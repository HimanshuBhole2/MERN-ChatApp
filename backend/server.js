const express  = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data.js");
const connectDB = require("./config/db.js");
const color = require("colors")
 

// Required The routes
const userRoutes = require("./routes/userRoutes.js")
const chatRoutes = require("./routes/chatRoutes.js")
const {errorHandler,notFound} = require("./middleware/errorMiddleware.js")

// mongodb+srv://bholehimanshu50:<password>@cluster0.giox8if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app = express();
dotenv.config();
connectDB();
app.use(express.json());


const PORT = process.env.PORT;

// app.get("/getChat",(req,res)=>{
//     res.send("<h1>Hello World</h1>");
// })

// app.get("/getChat/:id",async(req,res)=>{
//     const singleChat = chats.find((c)=>c._id === req.params.id);
//     res.send(chats.find((c)=>c._id === req.params.id));
// })

// app.get("/getChatData",async (req,res)=>{
//     let c = await chats;
//     console.log(c);
//     res.send(chats);
// })



app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,(req,res)=>{
    console.log(`The server is start working at\n http://localhost:${PORT}`.yellow.bold)
})

