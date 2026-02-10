const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

/**
 * /api/auth/register
 */
authRouter.post('/register',async(req,res)=>{
    const{name,email,password} = req.body;

    const findByEmail = await userModel.findOne({email});
    if(findByEmail){
        return res.status(409).json({
            message:"User already exists"
        })
    }
        const user = await userModel.create({name,email,password});

    //signing by server
    const token = jwt.sign({
        id:user._id,
        email: user.email,
    },
    process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user created successfully",
        user,
        token
    })

})

/**
 * /api/auth/login
 */
authRouter.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    const findEmail = await userModel.findOne({email});
    if(!findEmail){
        return res.status(404),json({
            message:"User of this email doesn't exist"
        })
    }
    const isPasswordmatched = user.password == password;
    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
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