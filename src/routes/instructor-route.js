const express = require("express");
const instructorController = require("../controllers/instructor-controler");

const instructorRouter = express.Router();

instructorRouter.get("/all", instructorController.getAllInstructor);

module.exports = instructorRouter;
