const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const postModel = require("../models/post.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    let decoded = null;

    try{
        decoded =jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        res.status(409).json({
            message:"Invalid token, Unauthorised access "
        })
    }

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"Post created sucessfully"
    })
}

async function getPostController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(409).json({
            message:"token not provided"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        res.status(409).json({
            message:"Invalid token, Unauthorised access"
        })
    }

    const userId = decoded.id;

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched Successfully",
        posts
    })
}

async function getPostDetailsController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(409).json({
            message:"Token is required"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        res.status(409).json({
            message:"Invalid token,Unauthorised access"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;


    const post = await postModel.findById(postId)

     if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

     const isValidUser = post.user.toString() === userId

         if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })



}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}