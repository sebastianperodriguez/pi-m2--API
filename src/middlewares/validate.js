import { isValidAuthor, isValidPost } from '../utils/validators.js';

export const validateAuthor = (req, res, next) => {
  const error = isValidAuthor(req.body);
  if (error) return res.status(400).json({ error });
  next();
};

export const validatePost = (req, res, next) => {
  const error = isValidPost(req.body);
  if (error) return res.status(400).json({ error });
  next();
};