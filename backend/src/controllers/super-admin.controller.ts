import { NextFunction, Request, Response } from "express";
import SuperAdminService from "../services/super_admin.services";
import { SuperAdminRequest } from "../types/superAdminRequest";
import createHttpError from "http-errors";

class SuperAdminController {
  private readonly superAdminservice = new SuperAdminService();

  public getSuperAdmin = async (expressRequest: Request, res: Response, next: NextFunction) => {
    const req = expressRequest as SuperAdminRequest;

    try {
      const superAdminId = req.auth.id;
      const superAdmin = await this.superAdminservice.getSuperAdmin(superAdminId);
      res.status(200).json(superAdmin);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error))
      }
      next(createHttpError(401));
    }
  }

  public getUsersByCompany = async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params["companyId"]
    try {
      const users = await this.superAdminservice.getUserByCompany(String(companyId));
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error));
      }
      next(createHttpError(401));
    }
  }
}

export default SuperAdminController;
