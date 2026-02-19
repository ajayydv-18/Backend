const express = require("express");
const userController = require("../controller/auth.controller")

const authRouter = express.Router();

/**
 * Post -> register /api/auth/register 
 */

authRouter.post("/register",userController.registerUserController)
authRouter.post("/login",userController.loginUserController)


module.exports = authRouter;