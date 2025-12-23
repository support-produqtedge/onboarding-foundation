import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Role, User, VerifyEmail } from "../db";
import crypto from "crypto";
import { hash } from "bcrypt";

class UserService {
  private readonly User = User;
  private readonly Role = Role;
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

      return users.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roleId: user.role_id,
          status: user.verification_status,
          emailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }

  public async getUser(id: string) {
    try {
      const user = await this.User.findOne({where: {id}});
      if (!user) throw new Error("User not found");
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.role_id,
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

  public async verifyEmail(key: string) {
    try {
      const registerUser = await this.registerToken.findOne({ where: {key}});
      // if (!registerUser) throw new Error("Something went wrong");
      const expiredToken: boolean = (verify(registerUser.registerToken, registerUser.key) as JwtPayload)['exp']! > Date.now() / 1000;
      if (expiredToken && !verify(registerUser.registerToken, registerUser.key)) {
        throw new Error("Registration token expired");
      }
      const user = await this.User.findByPk(String((verify(registerUser.registerToken, registerUser.key) as JwtPayload)['id']));

      if (!user) throw new Error("user not found");
      await user.update({
        isEmailVerified: true
      })

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
