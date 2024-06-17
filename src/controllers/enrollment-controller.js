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

module.exports = enrollmentController;
