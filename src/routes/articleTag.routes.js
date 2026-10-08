import { Router } from "express";

import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createArticleTagValidations,
  articleTagIdValidations,
} from "../middlewares/articleTag.validations.js";

export const articleTagRoutes = Router();

articleTagRoutes.post(
  "/",
  authMiddleware,
  createArticleTagValidations,
  validate,
  createArticleTag
);

articleTagRoutes.delete(
  "/:articleTagId",
  authMiddleware,
  articleTagIdValidations,
  validate,
  deleteArticleTag
);