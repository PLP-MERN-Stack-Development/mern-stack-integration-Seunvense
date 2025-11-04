// server/middleware/validation.js
const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional()
    .allow("", null),
  tags: Joi.array().items(Joi.string()),
  isPublished: Joi.boolean(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(200),
});

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validatePost, validateCategory };
