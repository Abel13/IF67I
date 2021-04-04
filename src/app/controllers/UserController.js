import User from "../models/User";

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado!" });
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
