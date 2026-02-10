const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true, "Username already exists"],
        required : [true,"Username is required"]
    },
    email : {
        type : String,
        unique : [true, "Email already exists"],
        required : [true,"Email is required"]
    },
    password : {
        type : String,
        required : true,
    },
    bio : String,

    profileImage : {
        type : String,
        default:"https://imgs.search.brave.com/GprHr6xGe1tKX2sErMSZsWRf6Cvke9lgI9Axf2ZoJKQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/Mi8wOC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zb2NpYWwtbWVk/aWEtdmVjdG9yLTU3/MjM0MjA4LmpwZw"
    }

});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
