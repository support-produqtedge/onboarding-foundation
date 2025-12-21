import express from "express";
import AuthController from "../controllers/auth.controller";
import { requireSignin } from "../middlewares/auth.middlewar";
import SuperAdminController from "../controllers/super-admin.controller";
import RoleController from "../controllers/role.controller";
import UserController from "../controllers/user.controller";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "API version 1"
  })
});

const authCtrl = new AuthController();
router.post("/admin/auth/login", authCtrl.loginSuperAdmin);
router.post("/auth/login", authCtrl.loginUser);

const superAdminCtrl = new SuperAdminController();
router.get("/admin/superadmin", requireSignin, superAdminCtrl.getSuperAdmin);
router.get("/auth/verifyEmail", authCtrl.verifyEmail);
router.post("/auth/change-password/:id", authCtrl.changePassword);

const roleCtrl = new RoleController();
router.post("/admin/superadmin/roles", requireSignin, roleCtrl.createRole);
router.get("/admin/superadmin/roles", requireSignin, roleCtrl.getRoles);
router.get("/admin/superadmin/roles/:id", requireSignin, roleCtrl.getRoleById);
router.put("/admin/superadmin/roles/:roleId", requireSignin, roleCtrl.editRole);

const userCtrl = new UserController();
router.post("/admin/superadmin/users", requireSignin, userCtrl.createUser);
router.get("/admin/superadmin/users", requireSignin, userCtrl.getUsers);
router.get("/admin/superadmin/users/:id", requireSignin, userCtrl.getUserById);
router.put("/admin/superadmin/users/:id", requireSignin, userCtrl.editUser);

export default router;
