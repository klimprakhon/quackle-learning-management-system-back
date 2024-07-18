const enrollmentService = require("../services/enrollment-service");
const {
  registerSchema,
  loginSchema,
  infoSchema,
} = require("../validator/auth-validator");

const validator = {};

validator.registerValidation = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;
  next();
};

validator.loginValidation = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;

  next();
};

validator.existedEnrollment = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "payment slip is required" });
    }

    const data = req.body;

    data.courseId = +data.courseId;
    data.studentId = +data.studentId;

    const existedEnrollment = await enrollmentService.findExitedEnrollment(
      data.studentId,
      data.courseId
    );

    if (existedEnrollment) {
      return res
        .status(400)
        .json({ error: "User has already enrolled in this course." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

validator.userInfo = (req, res, next) => {
  const { value, error } = infoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;

  next();
};

module.exports = validator;
