const prisma = require("../models/prisma");

const courseService = {};

courseService.findCourseById = (courseId) => {
  return prisma.course.findFirst({
    where: { id: +courseId },
    include: {
      instructor: true,
      category: { include: { subcategories: true } },
    },
  });
};

module.exports = courseService;
