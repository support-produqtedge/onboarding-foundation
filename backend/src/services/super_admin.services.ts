import bcrypt, { compare } from 'bcrypt';
import _ from "lodash";
import { SuperAdmin } from '../db/index';

class SuperAdminService {
  private readonly SuperAdmin = SuperAdmin;

  public async createOrUpdate(firstName: string, lastName: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [superAdmin, created] = await this.SuperAdmin.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password_digest: hashedPassword
      }
    });

    if (!created) {
      await this.SuperAdmin.update({
        password_digest: hashedPassword
      }, {where: {email}})
    }

    return { superAdmin, created };
  }

  public async validateEmail(email: string) {
    if (_.trim(email) === '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check for common invalid patterns
    return !(
        !email.includes('@') ||
        !email.includes('.') ||
        email.includes('@@') ||
        email.includes(' ') ||
        email.startsWith('@') ||
        email.endsWith('@') ||
        email.endsWith('.') ||
        email.includes('@.') ||
        email.includes('.@') ||
        !emailRegex.test(email)
    );
    }
  }

  public validatePassword(password: string) {
    if (_.trim(password) === "") return false;
    return password.length >= 6;
  }

  public async login(email: string, password: string) {
    try {
      const superAdmin = await this.SuperAdmin.findOne({ where: {email} });
       if (!superAdmin) throw new Error("Invalid Credentials");

       const isValidPassword = await compare(password, superAdmin.password_digest);

       if (!isValidPassword) throw new Error("Invalid Credentials");

       return {
        id: superAdmin.id,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
        email: superAdmin.email
       };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }
}

export default SuperAdminService;
