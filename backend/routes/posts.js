const express = require("express");
const {creatpost,deleteArticleById,updatepost,getAllPost}=require("../controllers/posts")
const {authentication}=require("../middleware/Authentication")
const postsRouter = express.Router();






postsRouter.post("/newpost",authentication,creatpost)
postsRouter.delete("/:id",deleteArticleById)
postsRouter.put("/:id",updatepost)
postsRouter.get("",getAllPost)

module.exports=postsRouter