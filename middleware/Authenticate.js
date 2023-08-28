const jwt=require('jsonwebtoken')

const User = require("../Models/user");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const verifiedUser = jwt.verify(token, "sumanth11");

    req.user = verifiedUser;
    next()
  } catch (err) {
    res.status(401).json({ success: false });
  }
};

module.exports = { authenticate };
