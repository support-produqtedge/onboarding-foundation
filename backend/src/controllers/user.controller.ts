import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.services";
import createHttpError from "http-errors";

class UserController {
  private readonly userService = new UserService();

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.roleId,
        req.body.status
      );

      res.status(201).json(user);
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
}

export default UserController;
