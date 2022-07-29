const express = require("express");
const auth = require("../middleware/auth"); 
const router = express.Router();
const authController = require("./auth.controller")
const aduanController = require("./aduan.controller")
const posKamlingController = require("./kamling.controller")
const pendudukController = require("./penduduk.controller")
const pegawaiController = require("./pegawai.controller")

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

// Pos Kamling
router.get("/poskamling", posKamlingController.getAllPosKamling);
router.post("/poskamling",  auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), posKamlingController.newPosKamling);
router.put("/poskamling/:id", auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), posKamlingController.updatePosKamling);
router.delete("/poskamling/:id", auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), posKamlingController.deletePosKamling);

// Penduduk
router.get("/penduduk", pendudukController.getAllPenduduk);
router.post("/penduduk",  auth.verifikasi(["admin", 'rt', 'rw']), pendudukController.newPenduduk);
router.put("/penduduk/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pendudukController.updatePenduduk);
router.delete("/penduduk/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pendudukController.deletePenduduk);

// Pegawai
router.get("/pegawai", pegawaiController.getAllPegawai);
router.post("/pegawai",  auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.newPegawai);
router.put("/pegawai/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.updatePegawai);
router.delete("/pegawai/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.deletePegawai);


module.exports = router