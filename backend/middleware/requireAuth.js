const { get, split } = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify Authentication
  const { authorization } = get(req, "headers", "");

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = split(authorization, " ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    next();

  } catch (error) {
    console.log("error:>", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
