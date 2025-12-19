import { NextFunction, Request, Response } from "express";
import RoleService from "../services/role.services";
import createHttpError from "http-errors";

class RoleController {
  private readonly roleService = new RoleService();

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await this.roleService.createRole(req.body.name, req.body.description);
      res.status(201).json(role);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error))
      }
      next(createHttpError(401));
    }
  }

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await this.roleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.id;
    try {
      const role = await this.roleService.getRoleById(String(roleId));
      res.status(200).json(role);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400))
    }
  }

  public editRole = async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.roleId
    try {
      const editedRole = await this.roleService.updateRole(String(roleId), req.body.name, req.body.description);
      if (!editedRole) throw new Error("Something went wrong");
      res.status(200).json({
        message: "Edit successful"
      });
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }
}

export default RoleController;
