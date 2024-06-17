const prisma = require("../models/prisma");

const enrollmentService = {};

enrollmentService.createEnrollment = (enrollmentData) => {
  return prisma.enrollment.create({ data: enrollmentData });
};

enrollmentService.findExitedEnrollment = (studentId, courseId) => {
  return prisma.enrollment.findFirst({
    where: {
      studentId: studentId,
      courseId: courseId,
    },
  });
};

enrollmentService.getAll = (studentId) => {
  return prisma.enrollment.findMany({
    where: {
      studentId: studentId,
    },
  });
};

module.exports = enrollmentService;
