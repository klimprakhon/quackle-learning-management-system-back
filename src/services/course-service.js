const prisma = require("../models/prisma");

const courseService = {};

courseService.findCourseById = (courseId) => {
  return prisma.course.findFirst({
    where: { id: courseId },
    include: {
      instructor: true,
      subcategory: { include: { category: true } },
    },
  });
};

courseService.updateCourseInfo = (courseId, data) => {
  return prisma.course.update({
    where: { id: courseId },
    data: data,
  });
};

courseService.getAll = () => {
  return prisma.course.findMany();
};

courseService.findAllEnrolledCourse = (courseIds) => {
  return prisma.course.findMany({ where: { id: { in: courseIds } } });
};

module.exports = courseService;
