import { Router } from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import {
  registerValidations,
  loginValidations,
} from "../middlewares/auth.validations.js";

import { validate } from "../middlewares/validate.middleware.js";

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