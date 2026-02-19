const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const postModel = require("../models/post.model")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

    const token = res.cookies.token;
    if(!token){
        res.status(401).json({
            message:"invalid token, Unauthorised Access"
        })
    }

    let decoded = null;

    try{
     decoded = jwt.verify(process.env.JWT_SECRET,token);
    }
    catch(err){
        res.status(401).json({
            message:"unauthorised access",
        })
    }
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}

async function getUserController(req,res){
    const token = res.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Inavlid token",
        })
    }
    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        res.status(401).json({
            message:"invalid token"
        })
    }
    const userId = decoded.id;
    const posts = postModel.findOne({
        user:userId
    })
    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController
}