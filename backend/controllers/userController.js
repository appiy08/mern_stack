const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { get, set } = require("lodash");

// Model
const User = require("../models/userModel");

// Create Token Function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

// Login User
const loginUser = async (req, res) => {
  const {email, password}=req.body;

  try {
    const user = await User.login(email, password);

    // Create Token
    const token = createToken(get(user, "_id", ""));
    const result = set({ ...user._doc }, "token", token);

    res.status(200).json({
      status: 200,
      message: "User signed up successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
  
};

// Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create Token
    const token = createToken(get(user, "_id", ""));
    const result = set({ ...user._doc }, "token", token);

    res.status(200).json({
      status: 200,
      message: "User signed up successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

module.exports = { loginUser, signupUser };
