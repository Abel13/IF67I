import Sequelize, { Model } from "sequelize";
import { v4 as uuid } from "uuid";

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        secure_id: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        text: Sequelize.STRING,
        file: Sequelize.STRING,
      },
      {
        hooks: {
          beforeCreate: (post) => {
            post.secure_id = uuid();
          },
        },
        sequelize,
      }
    );
  }
}
export default Post;
