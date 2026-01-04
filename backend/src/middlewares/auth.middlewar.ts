import { expressjwt } from "express-jwt";
import { SECRET_KEY } from "../config";
import { NextFunction, Request, Response } from "express";
import { User } from "../db";
import createHttpError from "http-errors";

export const requireSignin = expressjwt({
  secret: String(SECRET_KEY),
  algorithms: ['HS256']
});

export const emailVerified = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ where: {email: req.body.email}});
    if (!user) throw new Error("User not authorized");
    if (!user.isEmailVerified) throw new Error("User email not verified");
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(createHttpError(403, error))
    }
    next(createHttpError(403));
  }
}
