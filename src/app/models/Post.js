import Sequelize, { Model } from "sequelize";
import { v4 as uuid } from "uuid";

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        secure_id: Sequelize.STRING,
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

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}
export default Post;
