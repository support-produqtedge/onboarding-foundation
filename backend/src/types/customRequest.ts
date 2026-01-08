import { Request } from "express";

export interface CustomRequest extends Request {
  auth: {
    id: string;
    companyId?: string;
    iat: number;
    exp: number;
    sub: string;
  }
}
