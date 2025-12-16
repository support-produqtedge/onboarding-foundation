import express from "express";
import AuthController from "../controllers/auth.controller";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "API version 1"
  })
});

const authCtrl = new AuthController();
router.post("/admin/auth/login", authCtrl.loginSuperAdmin);

export default router;
