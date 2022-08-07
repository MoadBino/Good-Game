const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(403)
      .json({ success: false, message: "forbidden", here: "here" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        req.token = result;
        next();
      }
    });
  }
};

module.exports = { authentication };
