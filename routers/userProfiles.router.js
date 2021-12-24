const router = require("express").Router();

const { createProfile } = require("../controllers/userProfiles.controllers");
// const { authenticationToken } = require("../middleware/jwt.verify");

router.post("/profile", createProfile);

module.exports = router;
