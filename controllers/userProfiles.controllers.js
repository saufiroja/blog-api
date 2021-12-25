const jwt = require("jsonwebtoken");
const { UserProfiles } = require("../models");

// CREATE PROFILE
exports.createProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const { firstName, lastName, bio } = req.body;
    const profile = await UserProfiles.create({
      firstName,
      lastName,
      bio,
      userId: user.id,
    });
    return res.status(201).json({
      message: "successfully create profile",
      code: 201,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const { id } = req.params;
    const { firstName, lastName, bio } = req.body;
    const profile = await UserProfiles.update(
      { firstName, lastName, bio, userId: user.id },
      { where: { id } }
    );
    return res.status(201).json({
      message: "successfully update profile",
      code: 201,
      profile,
    });
  } catch (error) {
    next(error);
  }
};
