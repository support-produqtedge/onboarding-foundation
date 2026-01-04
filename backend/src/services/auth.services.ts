import { sign, verify, JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { Company, Role, User, VerifyEmail } from "../db";
import { compare, hash } from "bcrypt";
import crypto from 'crypto';

class AuthService {
  private readonly user = User;
  private readonly role = Role;
  private readonly company = Company;
  private readonly registerToken = VerifyEmail;

  private async CompanyOwnerCreationKey(id: string, email: string) {
    const dataStoreInToken: { id: string, sub: string } = {
      id,
      sub: "Onboarding company-creation"
    };

    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    const key = await crypto.createHash('sha1').update(current_date + random).digest('hex');
    const expiresIn = 60 * 60 * 60;
    const token = sign(dataStoreInToken, key, { expiresIn });

    await this.registerToken.create({
      key,
      email: email,
      registerToken: token
    });

    return key;
  }

  public async registerCompanyOwner(firstName: string, lastName: string, email: string, phone: string, password: string) {
    try {
      const hashPassword = await hash(password, 10);
      const role = await this.role.create({
        name: "Owner",
        description: "company owner"
      });
      const user = await this.user.create({
        firstName,
        lastName,
        email,
        phone,
        role_id: role.id,
        password_digest: hashPassword
      });

      if (!user) throw new Error("Something went wrong");

      return JSON.stringify({ user: user.id, role: role.id });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async createCompany(userId: string, roleId: string, name: string, cac: string, tin: string, document?: string) {
    try {
      const user = await this.user.findByPk(userId);
      const role = await this.role.findByPk(roleId);
      if (!user) throw new Error("User not found");
      const company = await this.company.create({
        company_name: name,
        company_owner: user.id,
        cacRegNo: cac,
        tin: tin,
        document: document
      });

      await user.update({
        companyId: company.id
      });
      await role.update({
        company_id: company.id,
        description: `Owner of the company: ${name}`
      });

      const registerKey = await this.CompanyOwnerCreationKey(user.id, user.email)

      return {
        email: user.email,
        registerKey
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }


  private userLoginToken(userId: string) {
    const dataStoredInToken: { id: string; role: string, sub: string } = {
      id: userId,
      role: "user",
      sub: "onboarding foundation-login"
    };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60 * 60;

    return sign(dataStoredInToken, secretKey, { expiresIn });
  }

  public async loginUser(email: string, password: string) {
    try {
      const user = await this.user.findOne({ where: { email } });
      if (!user) throw new Error("Invalid Credentials");

      const isValidPassword = await compare(password, user.password_digest);
      if (!isValidPassword) throw new Error("Invalid Credentials");
      const tokenData = await this.userLoginToken(user.id);
      return tokenData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async verifyEmail(key: string) {
    try {
      const registerUser = await this.registerToken.findOne({ where: { key } });
      if (!registerUser) throw new Error("Something went wrong");
      const expiredToken: boolean = (verify(registerUser.registerToken, registerUser.key) as JwtPayload)['exp']! > Date.now() / 1000;
      if (expiredToken && !verify(registerUser.registerToken, registerUser.key)) {
        throw new Error("Registration token expired");
      }
      const user = await this.user.findByPk(String((verify(registerUser.registerToken, registerUser.key) as JwtPayload)['id']));

      if (!user) throw new Error("user not found");
      await user.update({
        isEmailVerified: true,
        verification_status: true
      })

      await this.registerToken.destroy({ where: { key } });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

}

export default AuthService;
