import { body, param } from "express-validator";
import { UserModel } from "../models/index.js";

export const createArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser published o archived"),

  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un número entero válido")
    .custom(async (userId, { req }) => {
      const user = await UserModel.findByPk(userId);

      if (!user) {
        throw new Error("El usuario indicado no existe");
      }

      if (
        req.user.role !== "admin" &&
        Number(userId) !== req.user.id
      ) {
        throw new Error(
          "No podés crear artículos para otro usuario"
        );
      }

      return true;
    }),
];

export const articleIdValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero válido"),
];

export const updateArticleValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero válido"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional({ checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser published o archived"),
];