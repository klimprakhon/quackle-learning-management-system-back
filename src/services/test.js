const prisma = require("../models/prisma");

exports.getCourseBySubcategory = (subcategoryId) => {
  return prisma.subcategory.findFirst({
    where: { id: subcategoryId },
    include: { courses: true, category: true },
  });
};
