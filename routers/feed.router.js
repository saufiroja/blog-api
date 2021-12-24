const router = require("express").Router();

const {
  createFeed,
  findAllFeed,
  findById,
  deleteFeed,
  updateFeed,
} = require("../controllers/feed.controllers");
const { authenticationToken } = require("../middleware/jwt.verify");

// GET
router.get("/feed", authenticationToken, findAllFeed);
router.get("/feed/:id", authenticationToken, findById);

// POST
router.post("/feed", authenticationToken, createFeed);

// DELETE
router.delete("/feed/:id", authenticationToken, deleteFeed);

// PUT
router.put("/feed/:id", authenticationToken, updateFeed);

module.exports = router;
