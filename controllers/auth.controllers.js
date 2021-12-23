const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const Users = require("../models/Users.Model");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isExists = await Users.findOne({
      where: {
        email,
      },
    });

    // check user
    if (isExists) {
      throw new Error("user already exists");
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: "successfully register user",
      code: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValid = await Users.findOne({ where: { email } });
    if (!isValid) {
      throw new Error("invalid email");
    }

    const isMatch = await bcrypt.compare(password, isValid.password);
    if (!isMatch) {
      throw new Error("invalid password");
    }

    return res.status(200).json({
      message: "successfully login",
      code: 200,
      user: isValid,
    });
  } catch (error) {
    next(error);
  }
};
