const express = require("express");
const {creatRole}=require("../controllers/role")
const rolesRouter = express.Router();






rolesRouter.post("/",creatRole)



module.exports=rolesRouter