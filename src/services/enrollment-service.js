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

enrollmentService.findEnrollById = (studentId) => {
  return prisma.enrollment.findMany({
    where: {
      studentId: studentId,
      status: "ENROLLED",
    },
  });
};

enrollmentService.allEnrollment = () => {
  return prisma.enrollment.findMany({
    include: { student: true },
  });
};

enrollmentService.updateStatus = (id, status) => {
  return prisma.enrollment.update({
    where: { id: id },
    data: { status: status },
  });
};

module.exports = enrollmentService;
