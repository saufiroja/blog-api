const jwt = require("jsonwebtoken");
const { Feeds, Users } = require("../models");

// CREATE FEED
exports.createFeed = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const { title, body, userId } = req.body;
    const feed = await Feeds.create({
      title,
      body,
      userId: user.id,
    });

    return res.status(201).json({
      message: "successfully create feed",
      code: 201,
      feed,
    });
  } catch (error) {
    next(error);
  }
};

// FIND FEEDS
exports.findAllFeed = async (req, res, next) => {
  try {
    const { limit = 2, offset = 0 } = req.query;
    const total = await Feeds.count();
    const feeds = await Feeds.findAll({ limit, offset, include: Users });
    return res.status(200).json({
      message: "success find all feed",
      code: 200,
      feeds,
      total,
    });
  } catch (error) {
    next(error);
  }
};

// FIND FEED BY ID
exports.findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feed = await Feeds.findOne({ where: { id } });
    return res.status(200).json({
      message: "get feed by id",
      code: 200,
      feed,
    });
  } catch (error) {
    next(error);
  }
};

// REMOVE FEED
exports.deleteFeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFeed = await Feeds.destroy(id);
    return res.status(200).json({
      message: "get feed by id",
      code: 200,
      feed: `Delete feed by id ${deleteFeed}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFeed = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const { id } = req.params;
    const { title, body } = req.body;
    const updateFeed = await Feeds.update(
      { title, body, userId: user.id, updatedAt: new Date().getTime() },
      { where: { id } }
    );
  } catch (error) {
    next(error);
  }
};
