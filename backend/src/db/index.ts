import { Sequelize } from "sequelize";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config";
import { logger } from "../utils/logger";
import SuperAdminSchema from "./models/super_admin.model";
import AdminSchema from "./models/admin.model";
import RoleSchema from "./models/role.model";
import CompanySchema from "./models/company.model";
import UserSchema from "./models/user.model";
import VerifyEmailSchema from "./models/verifyEmail.model";
import AuditLogsSchema from "./models/auditLogs.model";

export const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
export const SuperAdmin = SuperAdminSchema(sequelize);
export const Admin = AdminSchema(sequelize);
export const VerifyEmail = VerifyEmailSchema(sequelize);
export const Role = RoleSchema(sequelize);
export const Company = CompanySchema(sequelize);
export const User = UserSchema(sequelize);
export const AuditLogs = AuditLogsSchema(sequelize);

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection to database established successfully");
  } catch (error) {
    logger.error("Unable to connect to database: ", error);
  }
}

checkConnection();
