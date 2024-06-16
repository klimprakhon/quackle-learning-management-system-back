const express = require("express");
const courseController = require("../controllers/course-controller");
const upload = require("../middlewares/upload");

const courseRouter = express.Router();

// courseRouter.get("/test", courseController.getCourseBySubcategory);

courseRouter.post(
  "/new-course",
  upload.single("coverImage"),
  courseController.createCourse
);

courseRouter.get("/:courseId", courseController.getCourse);

courseRouter.patch("/:courseId", courseController.updateCourseInfo);

module.exports = courseRouter;
