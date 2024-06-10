const courseService = require("../services/course-service");

const courseController = {};

courseController.getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const courseInfo = await courseService.findCourseById(courseId);

    res.status(200).json({ courseInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = courseController;
