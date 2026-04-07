const { User } = require("./user/User");
const Images = require("./Image");
const categories = require("./category");
const Products = require("./product");

// Add image relation to products
Products.belongsTo(Images, { foreignKey: "imageId", as: "image" });
Images.hasMany(Products, { foreignKey: "imageId", as: "products" });

module.exports = {
  User,
  Images,
  categories,
  Products,
};
