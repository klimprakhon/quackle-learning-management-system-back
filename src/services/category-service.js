const prisma = require("../models/prisma");

const categoryService = {};

categoryService.getAllCategory = () => {
  return prisma.category.findMany();
};

categoryService.getSubcategoryById = (categoryId) => {
  return prisma.subcategory.findMany({ where: { categoryId: +categoryId } });
};

categoryService.getSubcategoryByCategoryName = (categoryName) => {
  return prisma.category.findUnique({
    where: { name: categoryName },
    include: { subcategories: true },
  });
};

module.exports = categoryService;
