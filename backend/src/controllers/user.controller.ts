import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.services";
import MailService from "../services/mail.services";
import createHttpError from "http-errors";
import { ONBOARDING_FOUNDATION_URL } from "../config";

class UserController {
  private readonly userService = new UserService();

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userKey = await this.userService.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.roleId,
        req.body.status
      );

      MailService({
        subject: "Welcome to Produqtedge",
        email: req.body.email,
        html: `
          <html>
            <body>
              <div>Dear ${req.body.firstName} ${req.body.lastName}</div>
              <div>You have been invited to join your teammates on Produqtedge</div>
              <div>Please click the link below to activate your account</div>
              <a>${ONBOARDING_FOUNDATION_URL}/change-password/${userKey.userId}?key=${userKey.key}</a>
              <div>If you do not recognise this admin, kindly ignore this message</div>
              <div>Produqtedge Team</div>
            </body>
          </html>
        `
      });

      res.status(201).json(userKey);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const user = await this.userService.getUser(String(userId));
      if (!user) throw new Error("User not found");
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }

  public editUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const editUser = await this.userService.updateUser(
        String(userId),
        req.body.firstName,
        req.body.lastName,
        req.body.roleId,
        req.body.status
      );

      if (!editUser) throw new Error("Something went wrong");
      res.status(200).json({
        message: "Edit successful"
      });
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error));
      }
      next(createHttpError(400))
    }
  }
}

export default UserController;
