const express = require("express");
const lessonController = require("../controllers/lesson-controller");
const upload = require("../middlewares/upload");

const lessonRouter = express.Router();

lessonRouter.post(
  "/new",
  upload.array("attachments"),
  lessonController.createLessons
);

module.exports = lessonRouter;
