import { Router } from "express";

import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createTagValidations,
  tagIdValidations,
  updateTagValidations,
} from "../middlewares/tag.validations.js";

export const tagRoutes = Router();

tagRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  validate,
  createTag
);

tagRoutes.get(
  "/",
  authMiddleware,
  getTags
);

tagRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tagIdValidations,
  validate,
  getTagById
);

tagRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidations,
  validate,
  updateTag
);

tagRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tagIdValidations,
  validate,
  deleteTag
);