const express = require("express");
const courseController = require("../controllers/course-controller");
const upload = require("../middlewares/upload");

const courseRouter = express.Router();

courseRouter.get("/all", courseController.getAllCourse);

courseRouter.post("/enrolled", courseController.findAllEnrolledCourse);

courseRouter.post("/details", courseController.getAllDetails);

// courseRouter.get("/test", courseController.getCourseBySubcategory);

courseRouter.post(
  "/new-course",
  upload.single("coverImage"),
  courseController.createCourse
);

courseRouter.get(
  "/category/:categoryName",
  courseController.getCoursesByCategory
);

courseRouter.get("/:courseId", courseController.getCourse);

courseRouter.patch("/:courseId", courseController.updateCourseInfo);

courseRouter.delete("/:courseId", courseController.deleteCourse);

module.exports = courseRouter;
