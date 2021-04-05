import jwt from "jsonwebtoken";

import User from "../models/User";

import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não enviado!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { secure_id } = await promisify(jwt.verify)(token, authConfig.secret);
    const user = await User.findOne({ where: { secure_id } });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};
