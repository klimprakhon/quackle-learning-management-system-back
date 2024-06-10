const express = require("express");
const courseController = require("../controllers/course-controller");

const courseRoute = express.Router();

courseRoute.get("/:courseId", courseController.getCourse);

module.exports = courseRoute;
