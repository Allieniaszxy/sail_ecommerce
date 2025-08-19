module.exports = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(422).json({
        message: "Validation failed",
        errors: details,
      });
    }

    req[property] = value;
    next();
  };
};
