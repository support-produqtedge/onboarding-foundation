import { NextFunction, Request, Response } from "express";
import SuperAdminService from "../services/super_admin.services";
import createHttpError from "http-errors";

class AuthController {
  private readonly superAdminservice = new SuperAdminService();

  public loginSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superAdminToken = await this.superAdminservice.login(req.body.email, req.body.password);

      res.status(200).json({token: superAdminToken});
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error))
      }
      next(createHttpError(401));
    }
  }
}

export default AuthController;
