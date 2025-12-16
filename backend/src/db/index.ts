import { Sequelize } from "sequelize";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config";
import { logger } from "../utils/logger";
import SuperAdminSchema from "./models/super_admin.model";

export const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
export const SuperAdmin = SuperAdminSchema(sequelize);

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection to database established successfully");
  } catch (error) {
    logger.error("Unable to connect to database: ", error);
  }
}

checkConnection();
