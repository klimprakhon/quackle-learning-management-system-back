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

courseService.getAllDetails = (courseId) => {
  return prisma.course.findFirst({
    where: { id: courseId },
    include: {
      topics: {
        include: {
          lessons: true,
        },
      },
    },
  });
};

courseService.deleteCourse = async (courseId) => {
  await prisma.enrollment.deleteMany({ where: { courseId } });
  return prisma.course.delete({ where: { id: courseId } });
};

courseService.getCoursesBySubcategoryId = (subcategoryIds) => {
  return prisma.course.findMany({
    where: { subcategoryId: { in: subcategoryIds } },
  });
};
module.exports = courseService;
