const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const express = require("express");

const dbMock = new Sequelize("sqlite::memory:", {
  logging: false,
});

const productMock = dbMock.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_description: {
    type: DataTypes.STRING,
  },
  product_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  product_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

beforeAll(async () => {
  await productMock.sync({ force: true });
});

afterAll(async () => {
  await dbMock.close();
});

describe("Product Model", () => {
  it("should create a product", async () => {
    const product = await productMock.create({
      product_name: "Product Name",
      product_description: "Product Description",
      product_code: "product code",
      product_price: 2,
      product_stock: 5,
    });
    expect(product.product_name).toBe("Product Name");
    expect(product.product_description).toBe("Product Description");
    expect(product.product_code).toBe("product code");
    expect(Number(product.product_price)).toBe(2);
    expect(product.product_stock).toBe(5);
  });

  it("should require a product name", async () => {
    try {
      await productMock.create({}); // Missing product_name
    } catch (err) {
      // Ensure the validation error message matches the required field validation
      expect(err.message).toMatch(
        /notNull Violation: product.product_name cannot be null/
      );
    }
  });
});
