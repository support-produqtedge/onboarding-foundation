import { expressjwt } from "express-jwt";
import { SECRET_KEY } from "../config";

export const requireSignin = expressjwt({
  secret: String(SECRET_KEY),
  algorithms: ['HS256']
});
