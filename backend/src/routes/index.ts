import express from "express";
import AuthController from "../controllers/auth.controller";
import { emailVerified, requireSignin } from "../middlewares/auth.middlewar";
import SuperAdminController from "../controllers/super-admin.controller";
import RoleController from "../controllers/role.controller";
import UserController from "../controllers/user.controller";
import KYCController from "../controllers/kyc.controller";
import { validateKyc } from "../middlewares/kyc.middleware";
import CompanyController from "../controllers/company.controller";
import AuditLogsController from "../controllers/auditlogs.controller";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "API version 1"
  })
});

const authCtrl = new AuthController();
router.post("/admin/auth/login", authCtrl.loginSuperAdmin);
router.post("/auth/login", emailVerified, authCtrl.loginUser);
router.post("/auth/register", authCtrl.registerCompanyOwner);
router.post("/auth/register-company", validateKyc, authCtrl.registerCompany);

const superAdminCtrl = new SuperAdminController();
router.get("/admin/superadmin", requireSignin, superAdminCtrl.getSuperAdmin);
router.get("/auth/verifyEmail", authCtrl.verifyEmail);
router.post("/auth/change-password/:id", authCtrl.changePassword);
router.get("/admin/superadmin/users/:companyId", requireSignin, superAdminCtrl.getUsersByCompany);

const roleCtrl = new RoleController();
router.post("/admin/superadmin/roles", requireSignin, roleCtrl.createRole);
router.get("/admin/superadmin/roles", requireSignin, roleCtrl.getRoles);
router.get("/admin/superadmin/roles/:id", requireSignin, roleCtrl.getRoleById);
router.put("/admin/superadmin/roles/:roleId", requireSignin, roleCtrl.editRole);
router.get("/admin/superadmin/roles/rolebycompany/:companyId", requireSignin, roleCtrl.getRolesByCompany);

const userCtrl = new UserController();
router.post("/users", requireSignin, userCtrl.createUser);
router.get("/users", requireSignin, userCtrl.getUsers);
router.get("/users/:id", requireSignin, userCtrl.getUserById);
router.put("/users/:id", requireSignin, userCtrl.editUser);
router.get("/usersbycompany", requireSignin, userCtrl.getUsersByCompany);
router.get("/users/activestatus/:id", requireSignin, userCtrl.activateDeactivate);

const companyCtrl = new CompanyController();
router.get("/admin/superadmin/companies", requireSignin, companyCtrl.getCompanies);
router.get("/admin/superadmin/company/:id", requireSignin, companyCtrl.getCompany);

const kycCtrl = new KYCController();
router.post("/verify-tin", kycCtrl.verifyTIN);
router.post("/verify-cac", kycCtrl.verifyCac);

const auditLogsCtrl = new AuditLogsController();
router.get("/logs", requireSignin, auditLogsCtrl.getLogs)

export default router;
