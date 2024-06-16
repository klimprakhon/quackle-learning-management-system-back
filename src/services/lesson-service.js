const prisma = require("../models/prisma");

const lessonService = {};

lessonService.createLessons = (lessonInfo) => {
  return prisma.lesson.createMany({ data: lessonInfo });
};

module.exports = lessonService;
