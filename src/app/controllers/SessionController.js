import jwt from "jsonwebtoken";

import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json([{ message: "Usuário não encontrado!" }]);
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json([
        {
          message: "Falha na autenticação, verifique seu usuário e senha!",
        },
      ]);
    }

    const { secure_id, name } = user;

    return res.json({
      user: { secure_id, name, email },
      token: jwt.sign({ secure_id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
