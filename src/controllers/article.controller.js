import { matchedData } from "express-validator";

import {
  ArticleModel,
  UserModel,
  TagModel,
  ArticleTagModel,
} from "../models/index.js";

const articleInclude = [
  {
    model: UserModel,
    as: "author",
    attributes: ["id", "username"],
  },
  {
    model: TagModel,
    as: "tags",
    attributes: ["id", "name"],
    through: {
      attributes: [],
    },
  },
];

export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req);

    let userId = req.user.id;

    if (req.user.role === "admin" && data.user_id) {
      userId = data.user_id;
    }

    const article = await ArticleModel.create({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      user_id: userId,
    });

    return res.status(201).json({
      message: "Artículo creado correctamente",
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: {
        status: "published",
      },
      include: articleInclude,
    });

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findByPk(id, {
      include: articleInclude,
    });

    if (!article) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    return res.status(200).json({
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: {
        user_id: req.user.id,
        status: "published",
      },
      include: articleInclude,
    });

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getMyArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findOne({
      where: {
        id,
        user_id: req.user.id,
        status: "published",
      },
      include: articleInclude,
    });

    if (!article) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    return res.status(200).json({
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = req.article;

    const data = matchedData(req);

    delete data.id;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No se enviaron datos para actualizar",
      });
    }

    await article.update(data);

    return res.status(200).json({
      message: "Artículo actualizado correctamente",
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = req.article;

    await ArticleTagModel.destroy({
      where: {
        article_id: article.id,
      },
    });

    await article.destroy();

    return res.status(200).json({
      message: "Artículo eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};