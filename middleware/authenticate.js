// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust the path to your User model

const authenticate = (userType) => async (req, res, next) => {
  try {
    if (userType && user.userType !== userType) {
      return res.status(403).json({ error: `Access denied. Only ${userType}s can perform this action.` });
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: `Access denied. Only ${userType}s can perform this action.` });
  }
};

module.exports = authenticate;