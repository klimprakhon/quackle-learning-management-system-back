const express = require("express");
const validator = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validator.registerValidation,
  authController.register
);
authRouter.post("/login", validator.loginValidation, authController.login);
authRouter.get("/me", authenticate, authController.getMe);
authRouter.post(
  "/update",
  authenticate,
  validator.userInfo,
  authController.updateUserInfo
);

module.exports = authRouter;
