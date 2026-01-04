import { config } from "dotenv";
config();

export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
  SECRET_KEY,
  SENDGRID_API_KEY,
  ONBOARDING_FOUNDATION_URL,
  MONO_SECRET_KEY
} = process.env;
