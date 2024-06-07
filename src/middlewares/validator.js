const { registerSchema, loginSchema } = require("../validator/auth-validator");

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

module.exports = validator;
