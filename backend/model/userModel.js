const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


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
        methods: {
            async matchPassword(enteredPassword){
                let gg = await bcrypt.compare(enteredPassword,this.password);
                console.log(enteredPassword);
                console.log(this.password);
                return await bcrypt.compare(enteredPassword,this.password)
            }}
        ,
        timestamps:true
    }
);




// userSchema.methods.matchPassword = async function (enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password)
// }

userSchema.pre("save", async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})



const User  = mongoose.model("User", userSchema);
module.exports  =   User;