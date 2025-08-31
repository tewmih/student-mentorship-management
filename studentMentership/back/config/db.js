import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Integrate", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

export default sequelize;
