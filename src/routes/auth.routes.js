import { Router } from "express";

import {
  register,
  login,
  profile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";

import {
  registerValidations,
  loginValidations,
  updateProfileValidations,
} from "../middlewares/auth.validations.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  registerValidations,
  validate,
  register
);

authRoutes.post(
  "/login",
  loginValidations,
  validate,
  login
);

authRoutes.get(
  "/profile",
  authMiddleware,
  profile
);

authRoutes.put(
  "/profile",
  authMiddleware,
  updateProfileValidations,
  validate,
  updateProfile
);

authRoutes.post(
  "/logout",
  authMiddleware,
  logout
);