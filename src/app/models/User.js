import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        secure_id: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        hooks: {
          beforeCreate: (user) => {
            user.secure_id = uuid();
          },

          beforeSave: async (user) => {
            if (user.password) {
              user.password = await bcrypt.hash(user.password, 8);
            }
          },
        },
        sequelize,
      }
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
export default User;
