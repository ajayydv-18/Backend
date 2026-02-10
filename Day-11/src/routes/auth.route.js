const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

/**
 * Post -> /api/auth/register
 */
authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;

    const emailExists = await userModel.findOne({email});
    
    if(emailExists){
        return res.status(409).json({
            "message":"User with this email already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = userModel.create({name,email,password:hash});

    const token = jwt.sign({
        userId : user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    )

    res.cookie("jwt-token",token);
    res.status(201).json({
        "message":"user registered sucessfully"
    })

})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            "message":"User with this email doesnot exists",
        })
    }
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(404).json({
            "message":"Password is invaalid"
        })
    }
    
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "user logged in",
        user,
    })
})

module.exports = authRouter;