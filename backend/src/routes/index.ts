import express from "express";
import AuthController from "../controllers/auth.controller";
import { requireSignin } from "../middlewares/auth.middlewar";
import SuperAdminController from "../controllers/super-admin.controller";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "API version 1"
  })
});

const authCtrl = new AuthController();
router.post("/admin/auth/login", authCtrl.loginSuperAdmin);
const superAdminCtrl = new SuperAdminController();
router.get("/admin/superadmin", requireSignin, superAdminCtrl.getSuperAdmin);

export default router;
