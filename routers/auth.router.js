const router = require("express").Router();

const { register, login, test } = require("../controllers/auth.controllers");
const {
  registerSchema,
  loginSchema,
} = require("../middleware/schema.validation");
const { authenticationToken } = require("../middleware/jwt.verify");
const { validate } = require("../middleware/joi.validation");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.get("/hello", authenticationToken, test);

module.exports = router;
