const instructorService = require("../services/instructor-service");

const instructorController = {};

instructorController.getAllInstructor = async (req, res, next) => {
  try {
    const allInstructors = await instructorService.getAll();
    res.status(200).json(allInstructors);
  } catch (error) {
    next(error);
  }
};

module.exports = instructorController;
