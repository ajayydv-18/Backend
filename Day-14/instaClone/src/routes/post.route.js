const express = require("express");
const userPost = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const imagekit = require("imagekit")

const postRouter = express.Router();


/**
 * POSt->/api/post/
 */
postRouter.post("/", upload.single("imageUrl"),userPost.userPostController);

module.exports = postRouter;