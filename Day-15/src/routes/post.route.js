const express = require("express");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const userPostController = require("../controller/post.controller")


const postRouter = express.Router();

/**
 * POST->/api/posts/
 */
postRouter.post("/",upload.single("imageUrl"),userPostController.createPostController)

/**
 *GET-> /api/posts/ 
 */
postRouter.get("/",userPostController.getPostController)

/**
 * GET->/api/pots/:postId
 */
postRouter.get("/:postId",userPostController.getPostDetailsController)

module.exports = postRouter;