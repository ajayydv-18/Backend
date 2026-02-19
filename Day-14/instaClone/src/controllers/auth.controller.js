const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

async function userRegisterController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserExists =await userModel.findOne({
        $or:[{
            email:email,
        },{
            username:username
        }]
    })

    if(isUserExists){
        return res.status(409).json({
            "messsage":"User already exists",
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user =await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        "message":"user registered sucessfully",
        user
    })
}

async function userLoginController(req,res){
    const {username,email,password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {
                email:email,
            },
            {
                username:username,
            }
        ]
    })
 
    if(!user){
        res.status(401).json({
            "message":"User doesn't exists"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        res.status(401).json({
            "message":"password is incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);

    res.status(200).json({
        "message":"User logged in successfully"
    })
}


module.exports = {userRegisterController,userLoginController};