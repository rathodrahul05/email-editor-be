const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validateFields");
const { body, validationResult } = require("express-validator");

const router = express.Router();
router.post("/login", authController.login);
router.post(
  "/sign-up",
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }).isAlphanumeric(),
  ],
  validate,
  authController.signUp
);
router.post("/refresh-tokens", authController.refreshTokens);

// router.post('/login', authController.login());

module.exports = router;
