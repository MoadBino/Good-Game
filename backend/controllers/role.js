const RoleModel = require("../models/role");

const creatRole = (req, res) => {
  const { role } = req.body;
  const newRole = new RoleModel({
  role,
  });
  newRole.save().
  then((result) => {

  }).catch((err)=>{
  })
};


module.exports={creatRole}