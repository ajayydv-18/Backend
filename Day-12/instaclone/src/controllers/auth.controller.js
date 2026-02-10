const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[{
            username: username,
        },
        {
            email:email,
        }]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            "message":(isUserAlreadyExists.email == email?"user alredy exists with this email":"username already exists with this email")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    const token = jwt.sign({
        id : user._id, 
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);

    res.status(201).json({
        "message":"user created successfully",
        user:{
            username: user.username,
            email : user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[{
            username:username,
        },{
            email:email,
        }]
    })
    if(!user){
        return res.status(404).json({
            "message":"User doesnot exists",
        })
    }
    const isPasswordCorrect = user.password === crypto.createHash('sha256').update(password).digest('hex');

    if(!isPasswordCorrect){
        return res.status(404).json({
            "message":"invalid password",
        })
    }
    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);

    res.status(200).json({
        "message":"user logged in successfully"
    })
}

module.exports = {
    registerController,
    loginController
}