const categoryService = require("../services/category-service");

const categoryController = {};

categoryController.getAllCategory = async (req, res, next) => {
  try {
    const categoryData = await categoryService.getAllCategory();
    res.status(200).json({ categoryData });
  } catch (error) {
    next(error);
  }
};

categoryController.getSubcategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const subcategoryData = await categoryService.getSubcategoryById(
      categoryId
    );

    res.status(200).json({ subcategoryData });
  } catch (error) {
    next(error);
  }
};

module.exports = categoryController;
