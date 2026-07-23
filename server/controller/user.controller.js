const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const handleSignupUserController = async (req, res) => {
  const body = req.body;

  try {
    if (!body?.FirstName || !body?.Email || !body?.Password) {
      return res
        .status(500)
        .json({ message: "All fields are required", status: false });
    }

    console.log("body-items", body);
    const saltCount = 10;

    const hashedPassword = await bcrypt.hash(body.Password, saltCount);

    const signUp = await User.insertOne({ ...body, Password: hashedPassword });

    if (signUp) {
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        id: signUp?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

const handleSigninUserController = async (req, res) => {
  const body = req.body;
  try {
    if (!body.Email || !body.Password) {
      return res
        .status(500)
        .json({ message: "Email and Password are requred", success: false });
    }

    const user = await User.findOne({ Email: body.Email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist", success: false });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      user.Password
    );

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Password doesn't matched", success: false });
    }

    const token = jwt.sign({ email: user?.Email, id: user?._id }, SECRET_KEY);

    return res.status(200).json({
      message: "User loged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { handleSignupUserController, handleSigninUserController };