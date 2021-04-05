import Sequelize from "sequelize";

import User from "../app/models/User";
import Post from "../app/models/Post";

import databaseConfig from "../config/database";

const models = [User, Post];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
