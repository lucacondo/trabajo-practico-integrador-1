import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  userIdValidations,
  createUserValidations,
  updateUserValidations,
} from "../middlewares/user.validations.js";

export const userRoutes = Router();

userRoutes.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

userRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidations,
  validate,
  getUserById
);

userRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUserValidations,
  validate,
  createUser
);

userRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidations,
  validate,
  updateUser
);

userRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidations,
  validate,
  deleteUser
);