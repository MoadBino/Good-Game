const usersModel = require("../models/users");


const register = (req, res) => {
  const { userName,FirstName, lastName, email, password ,imag,role} = req.body;
  const user = new usersModel({
    userName,
    FirstName,
    lastName,
    email,
    password,
    imag,
    role
  });
  user
    .save()
    .then((result) => {
    res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
    })
    }).catch((err)=>{
    if (err.keyPattern) {
        res.status(409).json({
            success: false,
            message: `The email already exists`,
        })
    }
    res.status(500).json({
        success: false,
        message: `Server Error`,
        here:"here",
        err: err.message,
    })
    })
};

module.exports = { register };
