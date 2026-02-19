const express = require("express");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const userPostController = require("../controller/post.controller")
const identifyUser = require("../middleware/auth.middleware")

const postRouter = express.Router();

/**
 * POST->/api/posts/
 */
postRouter.post("/",upload.single("imageUrl"),identifyUser,userPostController.createPostController)

/**
 *GET-> /api/posts/ 
 */
postRouter.get("/",identifyUser,userPostController.getPostController)

/**
 * GET->/api/pots/:postId
 */
postRouter.get("/:postId",identifyUser,userPostController.getPostDetailsController)

module.exports = postRouter;