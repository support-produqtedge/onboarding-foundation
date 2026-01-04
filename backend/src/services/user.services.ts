import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Company, Role, User, VerifyEmail } from "../db";
import crypto from "crypto";
import { hash } from "bcrypt";

class UserService {
  private readonly User = User;
  private readonly Role = Role;
  private readonly company = Company;
  private readonly registerToken = VerifyEmail;

  private async UserCreationKey(id: string, email: string) {
    const dataStoreInToken: {id: string, sub: string} = {
      id,
      sub: "Onboarding user-create"
    };
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    const key = await crypto.createHash('sha1').update(current_date + random).digest('hex');
    const expiresIn = 60 * 60 * 60;
    const token = sign(dataStoreInToken, key, {expiresIn});

    await this.registerToken.create({
      key,
      email: email,
      registerToken: token
    });

    return key;

  }

  public async createUser(firstName: string, lastName: string, email: string, roleId: string, status: boolean) {
    try {
      const user = await this.User.create({
        firstName,
        lastName,
        email,
        role_id: roleId,
        verification_status: status
      });

      if (!user) throw new Error("Something went wrong");

      const role = await this.Role.findByPk(roleId);
      const assignedUserIds = [
        ...role?.assignedUserIds,
        user.id
      ];
      await this.Role.update({
        assignedUserIds
      }, { where: { id: roleId } });

      const registerKey = await this.UserCreationKey(user.id, user.email);

      return {
        userId: user.id,
        key: registerKey
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }

  public async getUsers() {
    try {

      const users = await this.User.findAll();
      const roles = await this.Role.findAll();
      const mapRoles = roles.map((r) => {
        return {
          id: r.id,
          name: r.name,
          description: r.description
        }
      });

      const result = users.map((u) => {
        let role = {};
        mapRoles.forEach(r => {
          if (r.id === u.role_id) {
            role = r;
          }
          return role
        })
        return {
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone,
          status: u.verification_status,
          role: role
        }
      })

      return result;
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }

  public async getUser(id: string) {
    try {
      const user = await this.User.findByPk(id);
      const role = await this.Role.findByPk(user.role_id, {
        attributes: [
          "id",
          "name",
          "description"
        ]
      });
      const company = await this.company.findByPk(user.companyId, {
        attributes: [
          "id",
          "company_name",
        ]
      })
      if (!user) throw new Error("User not found");
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: role,
        company: company || {},
        status: user.verification_status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await this.User.findOne({ where : {email}});
      if (!user) throw new Error("User not found");
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }

  public async verifyEmail(key: string) {
    try {
      const registerUser = await this.registerToken.findOne({ where: {key}});
      if (!registerUser) throw new Error("Something went wrong");
      const expiredToken: boolean = (verify(registerUser.registerToken, registerUser.key) as JwtPayload)['exp']! > Date.now() / 1000;
      if (expiredToken && !verify(registerUser.registerToken, registerUser.key)) {
        throw new Error("Registration token expired");
      }
      const user = await this.User.findByPk(String((verify(registerUser.registerToken, registerUser.key) as JwtPayload)['id']));

      if (!user) throw new Error("user not found");
      await user.update({
        isEmailVerified: true,
        verification_status: true
      });

      await this.registerToken.destroy({where: {key}});

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async changeUserPassword(id: string, password: string) {
    try {
      const user = await this.User.findByPk(id);
      if (!user) throw new Error("User not found");
      const hashPassword = await hash(password, 10);
      const updatedUser = await user.update({
        password_digest: hashPassword
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }}

  public async updateUser(id: string, firstName: string, lastName: string, roleId: string, status: boolean) {
    try{
      const updateUser = await this.User.update({
        firstName,
        lastName,
        roleId,
        verification_status: status
      }, {
        where: {id}
      });

      if (!updateUser || updateUser[0] === 0) throw new Error("User not found");

      return updateUser[0] > 0;

    }catch(error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }
}

export default UserService;
