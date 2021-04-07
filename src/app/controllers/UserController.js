import * as Yup from "yup";
import User from "../models/User";
import { Op } from "sequelize";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório!"),
      email: Yup.string()
        .email("E-Mail inválido")
        .required("E-Mail obrigatório!"),
      password: Yup.string().required("Senha obrigatória!"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      const ValidationErrors = {};

      error.inner.forEach((error) => {
        ValidationErrors[error.path] = error.message;
      });
      return res.status(400).json(ValidationErrors);
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { name }],
      },
    });

    if (userExists) {
      return res.status(400).json([{ message: "Usuário já cadastrado!" }]);
    }

    const { secure_id } = await User.create({
      name,
      email,
      password,
    });

    return res.json({ secure_id, name, email });
  }
}

export default new UserController();
