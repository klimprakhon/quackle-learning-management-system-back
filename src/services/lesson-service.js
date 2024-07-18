const prisma = require("../models/prisma");

const lessonService = {};

lessonService.createLessons = (lessonInfo) => {
  return prisma.lesson.createMany({ data: lessonInfo });
};

// lessonService.getAllDetails = (courseId) => {
//   return prisma.lesson.findMany({
//     where: { courseId: courseId },
//     include: { topic: { include: { course: true } } },
//   });
// };
module.exports = lessonService;
