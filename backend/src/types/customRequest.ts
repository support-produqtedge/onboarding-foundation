import { Request } from "express";

export interface CustomRequest extends Request {
  auth: {
    id: string;
    iat: number;
    exp: number;
    sub: string;
  }
}
