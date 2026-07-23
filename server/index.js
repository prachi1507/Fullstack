const express = require("express");
require("dotenv").config();
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_URLS = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_URLS.length === 0 || CLIENT_URLS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);

// Serve frontend static files (after build)
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use("/book", authMiddleWare, bookRouter);
app.use("/user", userRouter);

// Serve index.html for all other routes (SPA)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const startServer = async () => {
  try {
    await databaseConnection();

    app.listen(PORT, () => {
      console.log(`Port listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
