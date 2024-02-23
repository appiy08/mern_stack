const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { get, set } = require("lodash");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

// Model
const User = require("../models/userModel");

// Login User
const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

// Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create Token
    const token = createToken(get(user, "_id", ""));

    res.status(200).json({
      status: 200,
      message: "User signed up successfully.",
      data: set(user, "token", token),
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

module.exports = { loginUser, signupUser };
