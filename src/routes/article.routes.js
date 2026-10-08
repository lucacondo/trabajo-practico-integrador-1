import { Router } from "express";

import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  getMyArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createArticleValidations,
  articleIdValidations,
  updateArticleValidations,
} from "../middlewares/article.validations.js";

export const articleRoutes = Router();

articleRoutes.post(
  "/",
  authMiddleware,
  createArticleValidations,
  validate,
  createArticle
);

articleRoutes.get(
  "/",
  authMiddleware,
  getArticles
);

articleRoutes.get(
  "/user",
  authMiddleware,
  getMyArticles
);

articleRoutes.get(
  "/user/:id",
  authMiddleware,
  articleIdValidations,
  validate,
  getMyArticleById
);

articleRoutes.get(
  "/:id",
  authMiddleware,
  articleIdValidations,
  validate,
  getArticleById
);

articleRoutes.put(
  "/:id",
  authMiddleware,
  updateArticleValidations,
  validate,
  ownerMiddleware,
  updateArticle
);

articleRoutes.delete(
  "/:id",
  authMiddleware,
  articleIdValidations,
  validate,
  ownerMiddleware,
  deleteArticle
);
