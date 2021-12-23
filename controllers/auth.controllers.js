const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users.Model");

const { SECRET } = process.env;
let refreshTokens = [];

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

    const accessToken = genereteToken({ email });
    const refreshToken = jwt.sign(email, SECRET);
    refreshTokens.push(refreshToken);

    return res.status(200).json({
      message: "successfully login",
      code: 200,
      user,
      accessToken,
      refreshTokens,
    });
  } catch (error) {
    next(error);
  }
};

// GENERET TOKEN
const genereteToken = (email) => {
  return jwt.sign(email, SECRET, { expiresIn: 3600 });
};

// TEST
exports.test = (req, res) => {
  return res.send("hello");
};
