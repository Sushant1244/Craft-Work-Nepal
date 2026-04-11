const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const db = async () => {
  try {
    // Import models after sequelize is created to avoid circular dependencies
    require("../models");
    await sequelize.sync(); // Only create tables if they don't exist, don't drop existing ones

    // Seed default categories only if table is empty
    const categories = require("../models/category");
    const existingCategories = await categories.findAll();

    if (existingCategories.length === 0) {
      const defaultCategories = [
        { category_name: "wooden" },
        { category_name: "handmade" },
        { category_name: "traditional" },
      ];

      await categories.bulkCreate(defaultCategories);
      console.log("Default categories seeded");
    }

    console.log("database connected successfully");
  } catch (e) {
    console.error("fail to connect database successfully", e);
  }
};

module.exports = { sequelize, db };
