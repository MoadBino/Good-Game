const express = require("express");
const {addComment,deletecomment,updatecomment}=require("../controllers/comment")
const {authentication}=require("../middleware/Authentication")
const commentsRouter = express.Router();





commentsRouter.post("/new/:id",authentication,addComment) 
commentsRouter.delete("/delete/:id",deletecomment) 
commentsRouter.put("/update/:id",updatecomment) 

module.exports=commentsRouter