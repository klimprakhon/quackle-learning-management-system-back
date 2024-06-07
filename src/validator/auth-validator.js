const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "first name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "last name is required." }),
  email: Joi.string().email({ tlds: false }).messages({
    "string.empty": "email is required.",
    "string.email": "invalid email",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "password is required.",
      "string.pattern.base":
        "password must be at least 6 characters, one alphabet and one number",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .strip()
    .messages({
      "string.empty": "confirm password is required.",
      "any.only": "password and confirm password did not match.",
    }),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "string.empty": "email is required." }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "password is required." }),
});
