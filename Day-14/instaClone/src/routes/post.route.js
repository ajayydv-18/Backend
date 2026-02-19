const express = require("express");
const postController = require("../controllers/post.controller")
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});

/**
 * Post->api/post/ 
*/
postRouter.post("/", upload.single("iamgeUrl"),postController.createPostController);

/**
 * ye api hum euser ke hissab se unke post ko lakar de dega
 * Get(server se data share hoga) api/post/
 */
postRouter.get("/",postController.getUserController)

module.exports = postRouter;