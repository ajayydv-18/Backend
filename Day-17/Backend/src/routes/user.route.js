const express = require("express");
const identifyUser = require("../middleware/auth.middleware")
const userController = require("../controller/user.controller")
const userRouter = express.Router();

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

module.exports = userRouter;