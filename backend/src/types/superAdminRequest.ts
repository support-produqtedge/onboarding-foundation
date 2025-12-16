import { Request } from "express";

export interface SuperAdminRequest extends Request {
  auth: {
    id: string;
    role: string;
    sub: string;
    iat: number;
    exp: number;
  }
}
