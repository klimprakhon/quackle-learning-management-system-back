const prisma = require("../models/prisma");

const instructorService = {};

instructorService.getAll = () => {
  return prisma.instructor.findMany();
};

module.exports = instructorService;
