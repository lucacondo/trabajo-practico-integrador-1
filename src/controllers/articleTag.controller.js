import { matchedData } from "express-validator";

import {
  ArticleModel,
  ArticleTagModel,
  TagModel,
} from "../models/index.js";

export const createArticleTag = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req);

    const article = await ArticleModel.findByPk(article_id);

    if (!article) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message:
          "Solo el autor puede agregar etiquetas al artículo",
      });
    }

    const tag = await TagModel.findByPk(tag_id);

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    const existingRelation = await ArticleTagModel.findOne({
      where: {
        article_id,
        tag_id,
      },
    });

    if (existingRelation) {
      return res.status(400).json({
        message:
          "La etiqueta ya está asociada a este artículo",
      });
    }

    const articleTag = await ArticleTagModel.create({
      article_id,
      tag_id,
    });

    return res.status(201).json({
      message: "Etiqueta agregada al artículo correctamente",
      articleTag,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const { articleTagId } = req.params;

    const articleTag = await ArticleTagModel.findByPk(
      articleTagId
    );

    if (!articleTag) {
      return res.status(404).json({
        message: "Relación artículo-etiqueta no encontrada",
      });
    }

    const article = await ArticleModel.findByPk(
      articleTag.article_id
    );

    if (!article) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message:
          "Solo el autor puede remover etiquetas del artículo",
      });
    }

    await articleTag.destroy();

    return res.status(200).json({
      message:
        "Etiqueta removida del artículo correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};