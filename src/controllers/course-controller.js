const prisma = require("../models/prisma");
const fs = require("fs/promises");
const courseService = require("../services/course-service");
const { getCourseBySubcategory } = require("../services/test");
const uploadService = require("../services/upload-service");

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

courseController.createCourse = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "image is required" });
    }

    const data = req.body;

    data.price = +data.price;
    data.subcategoryId = +data.subcategoryId;
    data.instructorId = +data.instructorId;

    // get secure image url from cloudinary
    data.coverImage = await uploadService.upload(req.file.path);
    console.log(data);
    // inject secure data into database
    const courseInfo = await prisma.course.create({ data });
    res.status(200).json({ courseInfo });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

courseController.getCourseBySubcategory = async (req, res, next) => {
  try {
    const filterCourse = await getCourseBySubcategory(10);
    res.status(200).json({ filterCourse });
  } catch (error) {
    next(error);
  }
};

module.exports = courseController;
