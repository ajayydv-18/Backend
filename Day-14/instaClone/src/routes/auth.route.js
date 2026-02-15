const express = require("express");
const userController = require("../controllers/auth.controller")

const authRouter = express.Router();

/**
 * register
 * POST->/api/auth/register
 */
authRouter.post("/register",userController.userRegisterController);

/**
 * login
 * POST->/api/auth/login
 */
authRouter.post("/login",userController.userLoginController)
module.exports = authRouter;