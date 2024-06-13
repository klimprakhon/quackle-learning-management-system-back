const prisma = require("../models/prisma");

const categoryService = {};

categoryService.getAllCategory = () => {
  return prisma.category.findMany();
};

categoryService.getSubcategoryById = (categoryId) => {
  return prisma.subcategory.findMany({ where: { categoryId: +categoryId } });
};

module.exports = categoryService;
