const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_this_in_production_123456";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

const generateToken = (payload) => {
  const options = {
    expiresIn: JWT_EXPIRE,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = { generateToken };
