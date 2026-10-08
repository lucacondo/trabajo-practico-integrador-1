import { matchedData } from "express-validator";

import {
  TagModel,
  ArticleModel,
} from "../models/index.js";

export const createTag = async (req, res) => {
  try {
    const { name } = matchedData(req);

    const tag = await TagModel.create({
      name,
    });

    return res.status(201).json({
      message: "Etiqueta creada correctamente",
      tag,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Ya existe una etiqueta con ese nombre",
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).json({
      tags,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        model: ArticleModel,
        as: "articles",
        attributes: [
          "id",
          "title",
          "excerpt",
          "status",
        ],
        through: {
          attributes: [],
        },
      },
    });

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    return res.status(200).json({
      tag,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    const { name } = matchedData(req);

    if (!name) {
      return res.status(400).json({
        message: "No se enviaron datos para actualizar",
      });
    }

    await tag.update({
      name,
    });

    return res.status(200).json({
      message: "Etiqueta actualizada correctamente",
      tag,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Ya existe una etiqueta con ese nombre",
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        message: "Etiqueta no encontrada",
      });
    }

    await tag.destroy();

    return res.status(200).json({
      message: "Etiqueta eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};