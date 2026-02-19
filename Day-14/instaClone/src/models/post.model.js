const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    cpation:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        require:[true,"imageUrl is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId is required"]
    }
})

const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;