const imageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model")

const imagekit = new imageKit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function userPostController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Invalid token, Unauthorised access"
        }) 
    }
    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        res.status(401).json({
            message:"User not authorised",
        })
    }
   

    const file= await imagekit.files.upload({
        file:await toFile(
            Buffer.from(req.file.buffer),
            'file'
        ),
        fileName:"test"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

module.exports = {userPostController};