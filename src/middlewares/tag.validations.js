import { body, param } from "express-validator";
import { Op } from "sequelize";

import { TagModel } from "../models/index.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/)
    .withMessage("El nombre de la etiqueta no puede contener espacios")
    .custom(async (name) => {
      const tag = await TagModel.findOne({
        where: { name },
      });

      if (tag) {
        throw new Error("Ya existe una etiqueta con ese nombre");
      }

      return true;
    }),
];

export const tagIdValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id de la etiqueta debe ser un número entero válido"),
];

export const updateTagValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id de la etiqueta debe ser un número entero válido"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/)
    .withMessage("El nombre de la etiqueta no puede contener espacios")
    .custom(async (name, { req }) => {
      const tag = await TagModel.findOne({
        where: {
          name,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (tag) {
        throw new Error("Ya existe una etiqueta con ese nombre");
      }

      return true;
    }),
];