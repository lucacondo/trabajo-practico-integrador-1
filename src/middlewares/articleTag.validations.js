import { body, param } from "express-validator";

import {
  ArticleModel,
  TagModel,
} from "../models/index.js";

export const createArticleTagValidations = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El article_id debe ser un número entero válido")
    .custom(async (articleId) => {
      const article = await ArticleModel.findByPk(articleId);

      if (!article) {
        throw new Error("El artículo no existe");
      }

      return true;
    }),

  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El tag_id debe ser un número entero válido")
    .custom(async (tagId) => {
      const tag = await TagModel.findByPk(tagId);

      if (!tag) {
        throw new Error("La etiqueta no existe");
      }

      return true;
    }),
];

export const articleTagIdValidations = [
  param("articleTagId")
    .isInt({ min: 1 })
    .withMessage(
      "El id de la relación debe ser un número entero válido"
    ),
];