const express = require("express");
const upload = require("../middlewares/upload");
const enrollmentController = require("../controllers/enrollment-controller");
const { existedEnrollment } = require("../middlewares/validator");

const enrollmentRouter = express.Router();

enrollmentRouter.get("/all", enrollmentController.getAll);

enrollmentRouter.get("/check", enrollmentController.getAllByStudentId);

enrollmentRouter.post(
  "/new",
  upload.single("paymentSlip"),
  existedEnrollment,
  enrollmentController.createEnrollment
);

enrollmentRouter.patch("/status", enrollmentController.updateStatus);

module.exports = enrollmentRouter;
