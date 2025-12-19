import { Role } from "../db";

class RoleService {
  private readonly Role = Role;

  public async createRole(name: string, description?: string) {
    try {
      const role = await this.Role.create({
        name, description
      });

      if (!role) {
        throw new Error("Something went wrong")
      }

      return role;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }

  public async getRoles() {
    try {
      const roles = await this.Role.findAll();

      return roles;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async getRoleById(id: string) {
    try {
      const role = await this.Role.findOne({ where: {id}});

      if (!role) throw new Error("Role not found");

      return role;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async updateRole(id: string, name: string, description: string) {
    try {
      const updatedRole = await this.Role.update({
        name,
        description
      }, {
        where: {
          id
        }
      });

      if (!updatedRole || updatedRole[0] === 0) throw new Error("Role not found");

      return updatedRole[0] > 0
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }
}

export default RoleService;
