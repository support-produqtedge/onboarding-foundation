import { NextFunction, Request, Response } from "express";
import SuperAdminService from "../services/super_admin.services";
import createHttpError from "http-errors";
import UserService from "../services/user.services";
import AuthService from "../services/auth.services";
import MailService from "../services/mail.services";
import { ONBOARDING_FOUNDATION_URL } from "../config";
import AuditLogsService from "../services/auditLogs.services";

class AuthController {
  private readonly superAdminservice = new SuperAdminService();
  private readonly authService = new AuthService();
  private readonly userService = new UserService();

  public registerCompanyOwner = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, password } = req.body;
    try {
      const ownerCreated = await this.authService.registerCompanyOwner(firstName, lastName, email, phone, password);
      if (!ownerCreated) throw new Error("Something went wrong");
      res.cookie('user', ownerCreated);
      res.status(201).json({
        message: "User created"
      });
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error))
      }
      next(createHttpError(401))
    }
  }

  public registerCompany = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = JSON.parse(req.cookies['user']);
    const { name, cac, tin, document } = req.body;
    try {
      const user = await this.userService.getUser(cookies.user);
      const companyRegisterKey = await this.authService.createCompany(cookies.user, cookies.role, name, cac, tin, document);
      if (!companyRegisterKey) throw new Error("something went wrong");

      MailService({
        subject: "Welcome to Produqtedge",
        email: user.email,
        html: `
                <html>

                  <body>
                      <table>
                          <tr>
                              <td style="padding-bottom: 2.5em; font-size: 13px; font-family: Arial, Helvetica, sans-serif;">
                                      <h1 style="font-size: 20px; text-align: center;">Welcome to Produqtedge</h1>
                                      <div style="padding-bottom: 10px">Dear ${user.firstName} ${user.lastName},</div>
                                      <div style="padding-bottom: 10px">You have signed up a new company on the Produqtedge platform</div>
                                      <div style="padding-bottom: 20px">Company name: ${name}</div>
                                      <div style="text-align: center; font-weight: 600;">
                                          <a href="${ONBOARDING_FOUNDATION_URL}/verify-email?key=${companyRegisterKey.registerKey}">Link</a>
                                      </div>
                                      <div style="padding-top: 20px;">If you do not recognise this admin, kindly ignore this message</div>
                                      <div style="padding-top: 10px; font-size: 13px;">Produqtedge Team</div>
                              </td>
                            </tr><!-- end: tr -->
                      </table>
                  </body>
              </html>
              `
      });

      res.clearCookie("user");
      res.status(201).json(companyRegisterKey);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error))
      }
      next(createHttpError(401));
    }
  }

  public registerSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, phone, nin, password} = req.body;
    try {
      const userCreationKey = await this.authService.createSingleUser(firstName, lastName, email, phone, password, nin);
      if (!userCreationKey) throw new Error("Something went wrong");
      const user = await this.userService.getUserByEmail(email);

      MailService({
        subject: "Welcome to Produqtedge",
        email: user.email,
        html: `
                <html>

                  <body>
                      <table>
                          <tr>
                              <td style="padding-bottom: 2.5em; font-size: 13px; font-family: Arial, Helvetica, sans-serif;">
                                      <h1 style="font-size: 20px; text-align: center;">Welcome to Produqtedge</h1>
                                      <div style="padding-bottom: 10px">Dear ${user.firstName} ${user.lastName},</div>
                                      <div style="padding-bottom: 10px">You have signed up a new company on the Produqtedge platform</div>
                                      <div style="text-align: center; font-weight: 600;">
                                          <a href="${ONBOARDING_FOUNDATION_URL}/verify-email?key=${userCreationKey.registerKey}">Link</a>
                                      </div>
                                      <div style="padding-top: 20px;">If you do not recognise this admin, kindly ignore this message</div>
                                      <div style="padding-top: 10px; font-size: 13px;">Produqtedge Team</div>
                              </td>
                            </tr><!-- end: tr -->
                      </table>
                  </body>
              </html>
              `
      });

      res.status(201).json(userCreationKey);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(401, error));
      }
      next(createHttpError(401));
    }
  }

  public loginSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superAdminToken = await this.superAdminservice.login(req.body.email, req.body.password);

      res.status(200).json({ token: superAdminToken });
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

      res.status(200).json({ token: userToken })
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
      await this.userService.verifyEmail(String(key));
      res.status(200).json({
        message: "Email verified successfully"
      });
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

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      const user = await this.authService.resetPassword(email);

      MailService({
        subject: "Password Reset",
        email: email,
        html: `
                <html>

                  <body>
                      <table>
                          <tr>
                              <td style="padding-bottom: 2.5em; font-size: 13px; font-family: Arial, Helvetica, sans-serif;">
                                      <div style="padding-bottom: 10px">Dear ${user.firstName} ${user.lastName},</div>
                                      <div style="padding-bottom: 10px">A password reset request has been made on your account</div>
                                      <div style="padding-bottom: 20px">Please clickthe link below to reset your password.</div>
                                      <div style="text-align: center; font-weight: 600;">
                                          <a href="${ONBOARDING_FOUNDATION_URL}/change-password/${user.id}?key=${user.passwordResetKey}">Link</a>
                                      </div>
                                      <div style="padding-top: 20px;">If you do not recognise this request, kindly ignore this message</div>
                                      <div style="padding-top: 10px; font-size: 13px;">Produqtedge Team</div>
                              </td>
                            </tr><!-- end: tr -->
                      </table>
                  </body>
              </html>
              `
      });

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
