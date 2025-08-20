import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mentorship-node", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
