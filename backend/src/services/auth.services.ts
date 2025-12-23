import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { User } from "../db";
import { compare } from "bcrypt";

class AuthService {
  private readonly user = User;

  private userLoginToken(userId: string) {
    const dataStoredInToken: { id: string; role: string, sub: string } = {
      id: userId,
      role: "user",
      sub: "onboarding foundation-login"
    };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60 * 60;

    return sign(dataStoredInToken, secretKey, { expiresIn });
  }

  public async loginUser(email: string, password: string) {
    try {
      const user = await this.user.findOne({ where: {email}});
      if (!user) throw new Error("Invalid Credentials");

      const isValidPassword = await compare(password, user.password_digest);
      if (!isValidPassword) throw new Error("Invalid Credentials");
      const tokenData = await this.userLoginToken(user.id);
      return tokenData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

}

export default AuthService;
