import { Role, User } from "../db";

class UserService {
  private readonly User = User;
  private readonly Role = Role;

  public async createUser(firstName: string, lastName: string, email: string, roleId: string, status: boolean) {
    try {
      const user = await this.User.create({
        firstName,
        lastName,
        email,
        password: "Password@123",
        role_id: roleId,
        verification_status: status
      });

      if (!user) throw new Error("Something went wrong");

      const role = await this.Role.findOne({ where: { id: roleId } });
      const assignedUserIds = [
        ...role?.assignedUserIds,
        user.id
      ];
      await this.Role.update({
        assignedUserIds
      }, { where: { id: roleId } })

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: role?.name,
        status: user.verification_status
      };

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
}

export default UserService;
