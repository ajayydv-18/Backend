const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

const authRouter = express.Router();

authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;

    const user = await userModel.create({name,email,password});

    const token = jwt.sign(
        {
        id : user._id,
        email : user.email
        },
        process.env.JWT_SECRET     
    )

    res.status(201).json({
        message:"User created successfully",
        user,
        token
    })
})

module.exports = authRouter;