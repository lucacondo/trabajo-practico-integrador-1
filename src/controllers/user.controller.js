import { matchedData } from "express-validator";

import { sequelize } from "../config/database.js";

import {
  UserModel,
  ProfileModel,
  ArticleModel,
} from "../models/index.js";

import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "role",
        "created_at",
        "updated_at",
      ],
      include: {
        model: ProfileModel,
        as: "profile",
        attributes: [
          "first_name",
          "last_name",
          "biography",
          "avatar_url",
          "birth_date",
        ],
      },
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id, {
      attributes: [
        "id",
        "username",
        "email",
        "role",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: ProfileModel,
          as: "profile",
          attributes: [
            "first_name",
            "last_name",
            "biography",
            "avatar_url",
            "birth_date",
          ],
        },
        {
          model: ArticleModel,
          as: "articles",
          attributes: [
            "id",
            "title",
            "excerpt",
            "status",
            "created_at",
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const createUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const data = matchedData(req);

    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create(
      {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || "user",
      },
      {
        transaction,
      }
    );

    await ProfileModel.create(
      {
        user_id: user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        biography: data.biography,
        avatar_url: data.avatar_url,
        birth_date: data.birth_date,
      },
      {
        transaction,
      }
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const data = matchedData(req);

    delete data.id;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No se enviaron datos para actualizar",
      });
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    await user.update(data);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({
        message: "No podés eliminar tu propio usuario administrador",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};