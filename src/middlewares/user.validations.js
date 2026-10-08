import { body, param } from "express-validator";
import { Op } from "sequelize";

import { UserModel } from "../models/index.js";

export const userIdValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id del usuario debe ser un número entero válido"),
];

export const createUserValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username) => {
      const user = await UserModel.findOne({
        where: { username },
      });

      if (user) {
        throw new Error("El username ya está registrado");
      }

      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await UserModel.findOne({
        where: { email },
      });

      if (user) {
        throw new Error("El email ya está registrado");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("biography")
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("El avatar debe ser una URL válida"),

  body("birth_date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida"),
];

export const updateUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id del usuario debe ser un número entero válido"),

  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El username no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username, { req }) => {
      const user = await UserModel.findOne({
        where: {
          username,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (user) {
        throw new Error("El username ya está registrado");
      }

      return true;
    }),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({
        where: {
          email,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (user) {
        throw new Error("El email ya está registrado");
      }

      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),
];