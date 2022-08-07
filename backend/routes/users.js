const express = require("express");
const {register}=require("../controllers/users")
const {login}=require("../controllers/login")
const usersRouter = express.Router();





usersRouter.post("/Register",register) 
usersRouter.post("/login",login)

module.exports=usersRouter