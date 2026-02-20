const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUserController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserExists = await userModel.findOne({
        $or:[{
            email
        },
        {
            username
        }]
    })

    if(isUserExists){
        res.status(409).json({
            message:"User already exists",
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,email,password:hash,bio,profileImage
    });
    
    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered successfully",
        user
    })

}

async function loginUserController(req,res){
    const {username,email,password} = req.body;

    const isUserExists = await userModel.findOne({
        $or:[{
            email:email,
        },{
            username:username,
        }]
    })
    if(!isUserExists){
        res.status(401).json({
            message:"User doesnot exists",
        })
    }

    const correctPassword = await bcrypt.compare(password,isUserExists.password);

    if(!correctPassword){
        res.status(401).json({
            message:"Password is incorrect",
        })
    }

    const token = jwt.sign({
    id:isUserExists._id,
    username:isUserExists.username,
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);
    res.status(201).json({
        message:"User logged in successfully"
    })
}

async function getMeUserController(req,res){

    const userId = req.user.id;
    
    const user = await userModel.findOne({
        _id:userId
    })
    res.status(200).json({
        user
    })

}


module.exports = {
    registerUserController,
    loginUserController,
    getMeUserController
}