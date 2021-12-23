const router = require("express").Router();

const { register, login, test } = require("../controllers/auth.controllers");
const { authenticationToken } = require("../middleware/jwt.verify");

router.post("/register", register);
router.post("/login", login);

router.get("/hello", authenticationToken, test);

module.exports = router;
