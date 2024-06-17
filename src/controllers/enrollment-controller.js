const fs = require("fs/promises");
const uploadService = require("../services/upload-service");
const enrollmentService = require("../services/enrollment-service");

const enrollmentController = {};

enrollmentController.createEnrollment = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "payment slip is required" });
    }

    const data = req.body;

    data.courseId = +data.courseId;
    data.studentId = +data.studentId;

    // get secure image url from cloudinary
    data.paymentSlip = await uploadService.upload(req.file.path);
    // inject secure data into database

    const createdEnrollment = await enrollmentService.createEnrollment(data);
    res.status(200).json(createdEnrollment);
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

enrollmentController.getAllByStudentId = async (req, res, next) => {
  try {
    const studentId = req.body.studentId;

    const allEnrollments = await enrollmentService.findEnrollById(studentId);
    res.status(200).json(allEnrollments);
  } catch (error) {
    next(error);
  }
};

enrollmentController.getAll = async (req, res, next) => {
  try {
    const allEnrollments = await enrollmentService.allEnrollment();
    res.status(200).json(allEnrollments);
  } catch (error) {
    next(error);
  }
};

enrollmentController.updateStatus = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);

    data.id = +data.enrollmentId;

    const updateStatus = await enrollmentService.updateStatus(
      data.id,
      data.status
    );
    res.status(200).json(updateStatus);
  } catch (error) {
    next(error);
  }
};

module.exports = enrollmentController;
