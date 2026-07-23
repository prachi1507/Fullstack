const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid token !", success: false });
    }

    const token = authHeader.split(" ")[1];

    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken) {
      return res
        .status(401)
        .json({ message: "Invalid token !", success: false });
    }

    const verifiedUser = await User.findOne({
      Email: verifiedToken?.email,
    }).select("-Password");

    if (!verifiedUser) {
      return res
        .status(401)
        .json({ message: "Not a vlid user!", success: false });
    }

    req.user = verifiedUser;
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token Expired !", success: false });
    }

    if (err.name == "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token authentication failed!",
        success: false,
      });
    }

    return res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = authMiddleWare;
