const Joi = require("joi");

/* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character */
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

module.exports = schema;
