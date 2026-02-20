const mongoose = require("mongoose");

/**
 * Jab user register karega to ye data usko dena hai
 */
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"User with this username already exists"]
    },
    email:{
        type:String,
        unique:[true,"email should be unique"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio: {
        type:String,
        default:""
    },
    profileImage:{
        type:String,
        default:"ProfilePic.io"
    }
})

/**
 * Crud operations use krne ke liye usermodle ka use hoat hai
 */
const userModel = mongoose.model("users",userSchema);

module.exports = userModel;