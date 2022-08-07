const express = require("express");
const {addnews,gitallnews,findNewsById}=require("../controllers/news")

const newsRouter = express.Router();





newsRouter.post("/addnews",addnews) 
newsRouter.get("",gitallnews) 
newsRouter.get("/:id",findNewsById) 

module.exports=newsRouter