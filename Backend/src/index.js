const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./database/index");
const { userRouter } = require("./route/user/userRoute.js");
const { authRouter } = require("./route/auth/authRouter.js");
const dotenv = require("dotenv");
const { authenticateToken } = require("./middleware/token-middleware");
const router = require("./route/uploadRoutes");
const { createUploadsFolder } = require("./security/helper");
const cors = require("cors");
const { productRouter } = require("./route/product/productRoute");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
// Public routes (no authentication required)
app.use("/api/auth", authRouter);
// Protected routes (authentication required)
app.use("/api/users", authenticateToken, userRouter);
// app.use("/api/file", router);
app.use("/api/product", productRouter);
createUploadsFolder();
app.listen(port, async function () {
  await db();
  console.log("project running in port", port);
});
module.exports = app;
