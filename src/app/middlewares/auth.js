import jwt from "jwt-express";

import User from "../models/User";

import authConfig from "../../config/auth";

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json([{ message: "Token não enviado!" }]);
  }

  try {
    const user = await User.findOne({
      where: { secure_id: req.jwt.payload.secure_id },
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json([{ message: "Token inválido!" }]);
  }
};

const middleware = [
  jwt.init(authConfig.secret, {
    cookies: false,
  }),

  checkAuth,
];

export default middleware;
