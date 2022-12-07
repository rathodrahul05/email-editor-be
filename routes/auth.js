const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validateFields");
const { body, validationResult } = require("express-validator");

const router = express.Router();
router.post("/login", authController.login);
router.post("/social-login", authController.socialLogin);
router.post(
  "/sign-up",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  validate,
  authController.signUp
);
router.post(
  "/social-sign-up",

  authController.socialSignUp
);
router.post("/refresh-tokens", authController.refreshTokens);

router.get("/confirm/:confirmationCode", authController.verifyUser);

// router.post('/login', authController.login());

module.exports = router;
