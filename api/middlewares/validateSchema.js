function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send();
    }
    next();
  };
}

module.exports = validateSchema;
