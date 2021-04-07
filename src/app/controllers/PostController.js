import * as Yup from "yup";
import Post from "../models/Post";
import User from "../models/User";

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string(),
      file: Yup.string().when("text", (text, field) =>
        text
          ? field
          : field.required("É necessário pelo menos o texto ou um arquivo!")
      ),
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

    const { text, file } = req.body;
    const { id } = req.user;

    const { secure_id } = await Post.create({
      user_id: id,
      text,
      file,
    });

    return res.json({ secure_id });
  }

  async index(req, res) {
    const { id } = req.user;
    const posts = await Post.findAll({
      where: {
        user_id: id,
      },
      attributes: ["secure_id", "text", "file", ["created_at", "date"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: [["secure_id", "user_id"], "name"],
        },
      ],
    });

    return res.json(posts);
  }
}

export default new PostController();
