const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,"username is required"]
    },

    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },

    password:{
       type:String,
       required:[true,"password is required"]
    },

    bio:String,

    profileImage:{
        type:String,
        default:"https://imgs.search.brave.com/0AuKsSmhJpWruBQ6UNV4_jR-CIRwWpBrXcRWXHw3HI4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
    }

})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;