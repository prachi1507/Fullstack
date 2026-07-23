const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
  const mongoUri = process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("MONGO_URL is not configured");
  }

  await mongoose.connect(mongoUri);
  console.log("Database connected successfully !");
};

module.exports = databaseConnection;
