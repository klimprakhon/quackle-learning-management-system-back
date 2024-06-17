const express = require("express");
const upload = require("../middlewares/upload");
const enrollmentController = require("../controllers/enrollment-controller");
const { existedEnrollment } = require("../middlewares/validator");

const enrollmentRouter = express.Router();

enrollmentRouter.get("/check", enrollmentController.getAll);

enrollmentRouter.post(
  "/new",
  upload.single("paymentSlip"),
  existedEnrollment,
  enrollmentController.createEnrollment
);

module.exports = enrollmentRouter;
