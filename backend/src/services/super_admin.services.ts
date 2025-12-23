import bcrypt, { compare } from 'bcrypt';
import _ from "lodash";
import { SuperAdmin } from '../db/index';
import { SECRET_KEY } from '../config';
import { sign } from 'jsonwebtoken';

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

  private superAdminloginToken(superAdminId: string) {
    const dataStoredInToken: {id: string; role: string, sub: string} = {
      id: superAdminId,
      role: "superAdmin",
      sub: "onboarding foundation-login"
    };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60 * 60;

    return sign(dataStoredInToken, secretKey, {expiresIn});
  }

  public async login(email: string, password: string) {
    try {
      const superAdmin = await this.SuperAdmin.findOne({ where: {email} });
       if (!superAdmin) throw new Error("Invalid Credentials");

       const isValidPassword = await compare(password, superAdmin.password_digest);

       if (!isValidPassword) throw new Error("Invalid Credentials");
      const tokenData = await this.superAdminloginToken(superAdmin.id);

       return tokenData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async getSuperAdmin(id: string) {
    try {
      let superAdmin = await SuperAdmin.findOne({where: {id}});
      if (!superAdmin) throw new Error("User not found");
      return {
        id: superAdmin.id,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
        email: superAdmin.email,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }
}

export default SuperAdminService;
