const router = require("express").Router();

const {
  createProfile,
  updateProfile,
} = require("../controllers/userProfiles.controllers");
const { authenticationToken } = require("../middleware/jwt.verify");
// const { authenticationToken } = require("../middleware/jwt.verify");

// POST
router.post("/profile", authenticationToken, createProfile);

// PUT
router.put("/profile/:id", authenticationToken, updateProfile);

module.exports = router;
