import { strict } from "assert";
import { type } from "os";

const { Mongoose, default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true,
    },
    email:{
        type:stringify,
        required:[true,"please provide a password"],
    },
    password:{
        type:String,
        required:[true,"please provide password"],
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,

    },
    forgotpasswordToken:string,
    
})



const User= mongoose.models.users || mongoose.model("users",userSchema);

export default User;