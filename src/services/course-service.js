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

module.exports = courseService;
