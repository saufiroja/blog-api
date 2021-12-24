const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const { SECRET } = process.env;

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
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new Error("invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("invalid password");
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: 3600 });

    return res.status(200).json({
      message: "successfully login",
      code: 200,
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER
exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json({
      message: "get users",
      code: 200,
      users,
    });
  } catch (error) {
    next(error);
  }
};
