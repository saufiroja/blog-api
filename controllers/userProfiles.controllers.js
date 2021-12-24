const jwt = require("jsonwebtoken");
const { UserProfiles } = require("../models/userProfiles.model");

exports.createProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const { firstName, lastName, bio } = req.body;
    const feed = await UserProfiles.create({
      firstName,
      lastName,
      bio,
      userId: user.id,
    });
    return res.status(201).json({
      message: "successfully create profile",
      code: 201,
      feed,
    });
  } catch (error) {
    next(error);
  }
};
