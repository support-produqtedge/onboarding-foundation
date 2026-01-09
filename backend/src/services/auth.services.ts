import { sign, verify, JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { AuditLogs, Company, Role, RoleMgtPermission, UserMgtPermission, User, VerifyEmail } from "../db";
import { compare, hash } from "bcrypt";
import crypto from 'crypto';
import AuditLogsService from "./auditLogs.services";

class AuthService {
  private readonly user = User;
  private readonly role = Role;
  private readonly company = Company;
  private readonly registerToken = VerifyEmail;
  private readonly auditLogsService = new AuditLogsService();
  private readonly UserMgtPermission = UserMgtPermission;
  private readonly RoleMgtPermission = RoleMgtPermission;

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
      await this.UserMgtPermission.create({
        role_id: role.id,
        view: true,
        write: true,
        statusChange: true
      });

      await this.RoleMgtPermission.create({
        role_id: role.id,
        view: true,
        write: true,
        statusChange: true
      })

      if (!user) throw new Error("Something went wrong");

      await this.auditLogsService.createLog(`${user.firstName} ${user.lastName}`, "Company Owner", "User is registered");

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
        description: `Owner of the company: ${name}`,
        assignedUserIds: [user.id]
      });

      const registerKey = await this.CompanyOwnerCreationKey(user.id, user.email);

      await this.auditLogsService.createLog(`${user.firstname} ${user.lastName}`, "Company Creation", "User created a new company");

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


  private userLoginToken(userId: string, companyId: string) {
    const dataStoredInToken: { id: string; companyId: string, role: string, sub: string } = {
      id: userId,
      companyId,
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
      const tokenData = await this.userLoginToken(user.id, user.companyId);
      await this.auditLogsService.createLog(`${user.firstName} ${user.lastName}`, "Login", "User Logged In");
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
      await this.auditLogsService.createLog(`${user.firstName} ${user.lastName}`, "Email Verification", "User email verified");
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
