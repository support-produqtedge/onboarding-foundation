import { NextFunction, Request, Response } from "express";
import SuperAdminService from "../services/super_admin.services";
import createHttpError from "http-errors";
import UserService from "../services/user.services";
import AuthService from "../services/auth.services";
import MailService from "../services/mail.services";

class AuthController {
  private readonly superAdminservice = new SuperAdminService();
  private readonly authService = new AuthService();
  private readonly userService = new UserService();

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

  public loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToken = await this.authService.loginUser(req.body.email, req.body.password);

      res.status(200).json({token: userToken})
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error));
      }
      next(createHttpError(401));
    }
  }

  public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.query['key'];
    try {
      const user = await this.userService.verifyEmail(String(key));
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const user = await this.userService.changeUserPassword(String(userId), req.body.password);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(403, error));
      }
      next(createHttpError(403));
    }
  }
}

export default AuthController;
