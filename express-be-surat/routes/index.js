const express = require("express");
const auth = require("../middleware/auth"); 
const router = express.Router();
const authController = require("./auth.controller")
const aduanController = require("./aduan.controller")

// Auth
router.post("/auth/login", authController.loginUser)
router.post("/auth/register", authController.createUser)
router.get("/auth/userinfo", auth.verifikasi("admin"), authController.readUser)
router.put("/auth/:id", auth.verifikasi("admin"), authController.updateUser)
router.post("/auth/updateprofile", auth.verifikasi("admin"), authController.updateuserinformationdata)
router.post("/auth/updatepassword", auth.verifikasi("admin"), authController.updatepassworddata)
router.delete("/auth/:id", auth.verifikasi("admin"), authController.deleteUser)

// Saran Pengunjung
router.post("/saran", aduanController.newMessageFromUser);
router.get("/saran", auth.verifikasi(["admin", "aduan_masyarakat"]), aduanController.getAllMessageUser);
router.delete("/saran/:id", auth.verifikasi(["admin", "aduan_masyarakat"]), aduanController.deleteMessageUser);

module.exports = router