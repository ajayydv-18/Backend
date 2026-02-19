const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerController(req, res){
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        email === isUserExists.email
          ? "Email already exists"
          : "Username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};

async function loginController(req, res){
  const { email, username, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (!isUserExists) {
    return res.status(401).json({
      message: "User doesn't exists",
    });

    const CorrectPassword = await bcrypt.compare(
      password,
      isUserExists.password,
    );

    if (!CorrectPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  }

  const token = jwt.sign(
    {
      id: isUserExists._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User logged in successfully",
  });
}

module.exports = {
    registerController,loginController
}