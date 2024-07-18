const prisma = require("../models/prisma");
const fs = require("fs/promises");
const courseService = require("../services/course-service");
const { getCourseBySubcategory } = require("../services/test");
const uploadService = require("../services/upload-service");
const categoryService = require("../services/category-service");

const courseController = {};

courseController.getCourse = async (req, res, next) => {
  try {
    const courseId = +req.params.courseId;

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
    // inject secure data into database
    const courseInfo = await prisma.course.create({ data }); // ************* create a service **************** //
    res.status(200).json({ courseInfo });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

courseController.updateCourseInfo = async (req, res, next) => {
  try {
    const courseId = +req.params.courseId;
    const updateData = req.body;

    const updatedCourse = await courseService.updateCourseInfo(
      courseId,
      updateData
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

courseController.getAllCourse = async (req, res, next) => {
  try {
    const allCourse = await courseService.getAll();
    // console.log(allCourse, "Here");
    res.status(200).json(allCourse);
  } catch (error) {
    next(error);
  }
};

courseController.findAllEnrolledCourse = async (req, res, next) => {
  try {
    const data = req.body;
    const courseIds = Object.values(data);

    const allEnrolledCourse = await courseService.findAllEnrolledCourse(
      courseIds
    );

    res.status(200).json(allEnrolledCourse);
  } catch (error) {
    next(error);
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

courseController.getAllDetails = async (req, res, next) => {
  try {
    const data = req.body;
    const courseId = +data.courseId;

    const allDetails = await courseService.getAllDetails(courseId);

    res.status(200).json(allDetails);
  } catch (error) {
    next(error);
  }
};

courseController.deleteCourse = async (req, res, next) => {
  try {
    const courseId = +req.params.courseId;

    // Delete all lessons related to the topics of the course
    const topics = await prisma.topic.findMany({
      where: { courseId },
      select: { id: true },
    });

    const topicIds = topics.map((topic) => topic.id);

    console.log("Deleting lessons...");
    await prisma.lesson.deleteMany({
      where: { topicId: { in: topicIds } },
    });

    // Delete all topics related to the course
    console.log("Deleting topics...");
    await prisma.topic.deleteMany({
      where: { courseId },
    });

    // Delete all enrollments related to the course
    console.log("Deleting enrollments...");
    await prisma.enrollment.deleteMany({
      where: { courseId },
    });

    const isDeleted = await courseService.deleteCourse(courseId);
    res.status(201).json(isDeleted);
  } catch (error) {
    next(error);
  }
};

courseController.getCoursesByCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  console.log(categoryName);

  try {
    const category = await categoryService.getSubcategoryByCategoryName(
      categoryName
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find courses in all subcategories of the category
    const subcategoryIds = category.subcategories.map(
      (subcategory) => subcategory.id
    );

    const filterCourses = await courseService.getCoursesBySubcategoryId(
      subcategoryIds
    );

    res.json(filterCourses);
  } catch (error) {
    next(error);
  }
};

module.exports = courseController;
