const express = require("express");
const categoryController = require("../controllers/category-controller");

const categoryRouter = express.Router();

categoryRouter.get("/all", categoryController.getAllCategory);
categoryRouter.get("/:categoryId", categoryController.getSubcategory);

module.exports = categoryRouter;
