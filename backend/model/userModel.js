const mongoose = require("mongoose");

const userSchema  = mongoose.Schema(
    {
         name:{ type: String, required: true},
         email:{
            type: String, required: true
         },
         password:{
            type: String, required: true
         },
         pic:{
            type:String,
            default:
                "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
         }
    },
    {
        timestamps:true
    }
);

const User  = mongoose.model("User", userSchema);
module.exports  =   User;