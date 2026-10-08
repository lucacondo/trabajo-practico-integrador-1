import { matchedData } from "express-validator";

import { sequelize } from "../config/database.js";
import { UserModel, ProfileModel } from "../models/index.js";

import {
  hashPassword,
  comparePassword,
} from "../helpers/bcrypt.helper.js";

import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    } = matchedData(req);

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create(
      {
        username,
        email,
        password: hashedPassword,
      },
      {
        transaction,
      }
    );

    await ProfileModel.create(
      {
        user_id: user.id,
        first_name,
        last_name,
        biography,
        avatar_url,
        birth_date,
      },
      {
        transaction,
      }
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req);

    const user = await UserModel.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const validPassword = await comparePassword(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
      path: "/",
    });

    return res.status(200).json({
      message: "Login exitoso",
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

export const profile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
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

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Logout exitoso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};