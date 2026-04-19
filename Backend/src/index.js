const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./database/index");
const { userRouter } = require("./route/user/userRoute.js");
const { authRouter } = require("./route/auth/authRouter.js");
const dotenv = require("dotenv");
const { authenticateToken } = require("./middleware/token-middleware");
const { createUploadsFolder } = require("./security/helper");
const cors = require("cors");
const { productRouter } = require("./route/product/productRoute");
const path = require("path");

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public routes (no authentication required)
app.use("/api/auth", authRouter);

// Protected routes (authentication required)
app.use("/api/users", authenticateToken, userRouter);
app.use("/api/product", productRouter);

createUploadsFolder();

if (require.main === module) {
  app.listen(port, async function () {
    await db();
    console.log(`Server running on port ${port}`);
    console.log(`API Base URL: http://localhost:${port}/api`);
    console.log(`Uploads Directory: ${process.env.UPLOAD_DIR || "./uploads"}`);
  });
}

module.exports = app;
