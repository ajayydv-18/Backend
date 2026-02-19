const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true,"Username already exists"],
        required : [true,"Username is required"]
    },

    email : {
        type : String,
        unique : [true,"Email already exists"],
        required : [true,"Email is required"]
    },

    password : {
        type: String,
        required : [true,"Password is required"],
    },

    bio : {
        type : String,
        default : ""
    },

    profileImage : {
        type : String,
        default : "https://imgs.search.brave.com/oDDWhTrOnf829cpcMpiA73bgLUZL_kEDkCErtiNLbtQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wcm9m/aWxlLXBsYWNlaG9s/ZGVyLWltYWdlLWdy/YXktc2lsaG91ZXR0/ZS1uby1waG90by1w/cm9maWxlLXBsYWNl/aG9sZGVyLWltYWdl/LWdyYXktc2lsaG91/ZXR0ZS1uby1waG90/by1wZXJzb24tYXZh/dGFyLTEyMzQ3ODQz/OC5qcGc"
    }

})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;