import { ArticleModel } from "../models/index.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (
      article.user_id !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "No tenés permisos para modificar este artículo",
      });
    }

    req.article = article;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};