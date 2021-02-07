const Joi = require("joi");

const schema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

module.exports = schema;
