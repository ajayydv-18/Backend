const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        unique:[true,"With this email user already exixts"]
    },
    password:String
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel; 
//fever tuberine