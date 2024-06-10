const prisma = require("../models/prisma");

const courseService = {};

courseService.findCourseById = (courseId) => {
  return prisma.course.findFirst({
    where: { id: +courseId },
    include: { instructor: true },
  });
};

module.exports = courseService;
