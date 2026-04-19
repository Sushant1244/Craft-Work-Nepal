const { User } = require("../models/user/User");
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
require("dotenv").config();

const dbMock = new Sequelize("sqlite::memory:", {
  logging: false,
});

const userMock = dbMock.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

beforeAll(async () => {
  await userMock.sync({ force: true });
});

afterAll(async () => {
  await dbMock.close();
});

describe("User Model", () => {
  it("should create an item", async () => {
    const user = await userMock.create({
      name: "new name",
      email: "new email",
      password: "new password",
    });
    expect(user.name).toBe("new name");
    expect(user.email).toBe("new email");
    expect(user.password).toBe("new password");
  });
});
