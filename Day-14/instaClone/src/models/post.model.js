const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        require:[true,"image url is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User id is required to craete a post"]
    }
})

const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;