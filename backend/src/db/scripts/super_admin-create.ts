import { config } from "dotenv";
import SuperAdminService from "../../services/super_admin.services";
import { logger } from "../../utils/logger";
import { SuperAdmin } from "..";

config();

const superAdminService = new SuperAdminService();

async function createSuperAdmin() {
  const firstName = process.env.SUPER_ADMIN_FIRSTNAME
  const lastName = process.env.SUPER_ADMIN_LASTNAME
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!firstName || !lastName || !email || password === undefined) {
    logger.error(
      "Super admin not set"
    );
    process.exit(1);
  }

  if (!superAdminService.validateEmail(email)) {
    logger.error("Invalid email format");
    process.exit(1);
  }

  try {
    const existingSuperAdmin = await SuperAdmin.findOne({ where: { email }});

    if (!existingSuperAdmin && !superAdminService.validatePassword(password)) {
      logger.error("Password must be at least 6 characters long");
      process.exit(1);
    }
    logger.info(`Creating super admin with email: ${email}`);
    const {superAdmin, created} = await superAdminService.createOrUpdate(firstName, lastName, email, password);

    if (!created) {
      logger.info("User exists, password updated");
    } else {
      logger.info("User created successfully");
    }

    console.log(`Email: ${superAdmin.email}`);
        console.log(`User ID: ${superAdmin.id}`);
        console.log(`Created: ${superAdmin.createdAt}`);

        process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  }
}

createSuperAdmin();
