const router = require("express").Router();

const {
  register,
  login,
  getUsers,
} = require("../controllers/auth.controllers");
const {
  registerSchema,
  loginSchema,
} = require("../middleware/schema.validation");
const { validate } = require("../middleware/joi.validation");
const { authenticationToken } = require("../middleware/jwt.verify");

// GET
router.get("/users", authenticationToken, getUsers);

// POST
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
