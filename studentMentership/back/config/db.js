import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Integrate", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
