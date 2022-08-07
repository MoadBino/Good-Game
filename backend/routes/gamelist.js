const express = require("express");
const {gamelist,addToLike,addToWishList,deletelike,addgame,getAllGames}=require("../controllers/gamelist")
const {authentication}=require("../middleware/Authentication")
const gamelistRouter = express.Router();

gamelistRouter.delete("/",authentication,deletelike)

gamelistRouter.get("/",gamelist)

gamelistRouter.post("/addGame",authentication,addgame)

gamelistRouter.post("/likes",authentication,addToLike)

gamelistRouter.post("/wishlist",authentication,addToWishList)

gamelistRouter.get("/games",getAllGames)

module.exports=gamelistRouter