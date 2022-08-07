const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const { password, email } = req.body;
  usersModel
  .findOne({ email })
  .populate("role", "-_id -__v")
  .then(async (result) => {

      if (result.length === 0) {
        return res.json("The email doesn't exist");
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (valid === false) {
          return res.status(403).json({
            success: false,
            message: `the password you have enntered is incorrect`,
          });
        }
        const payload = {
        userName:result.userName,
        userId: result._id,
        firstName: result.firstName,
        role: result.role,
        imag:result.imag
        };
        const token = await jwt.sign(payload, process.env.SECRET);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          id: result._id,
          role:result.role
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `enter your email `,
        err: err.message,
      });
    });

};

module.exports = {
  login,
};

