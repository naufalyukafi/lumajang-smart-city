const express = require("express");
const auth = require("../middleware/auth"); 
const router = express.Router();
const authController = require("./auth.controller")
const aduanController = require("./aduan.controller")
const posKamlingController = require("./kamling.controller")
const pendudukController = require("./penduduk.controller")
const pegawaiController = require("./pegawai.controller")
const blogController = require("./blog.controller")
const laporanKependudukanController = require("./laporanKependudukan.controller")
const fasilitasiPertanahanController = require("./fasilitasiPertanahan.controller")

// Auth
router.post("/auth/login", authController.loginUser)
router.post("/auth/register", authController.createUser)
router.get("/auth/userinfo", auth.verifikasi("admin"), authController.readUser)
router.get("/auth/users", auth.verifikasi("admin"), authController.readAllUser)
router.put("/auth/:id", auth.verifikasi("admin"), authController.updateUser)
router.post("/auth/updateprofile", auth.verifikasi("admin"), authController.updateuserinformationdata)
router.post("/auth/updatepassword", auth.verifikasi("admin"), authController.updatepassworddata)
router.delete("/auth/:id", auth.verifikasi("admin"), authController.deleteUser)
router.post("/auth/verifikasi/:id", auth.verifikasi("admin"), authController.verifikasiUser)

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
router.get("/pegawai/:role", pegawaiController.getAllPegawai);
router.post("/pegawai",  auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.newPegawai);
router.put("/pegawai/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.updatePegawai);
router.delete("/pegawai/:nik", auth.verifikasi(["admin", 'rt', 'rw']), pegawaiController.deletePegawai);

// Blog
router.get("/blogs", blogController.getAllBlogs)
router.get("/blogs/highlight", blogController.getHighlight)
router.get("/blog/:label_slug", blogController.detailBlog)
router.put("/blog/content/:id", auth.verifikasi("admin"), blogController.updateBlogContent)
router.put("/blog/contenttitle/:id", auth.verifikasi("admin"), blogController.updateBlogContentTitle)
router.put("/blog/:id", auth.verifikasi("admin"), blogController.updateBlog)
router.post("/blog/newpage", auth.verifikasi("admin"), blogController.createNewBlog)
router.delete("/blog/:id", auth.verifikasi("admin"), blogController.deleteBlogById)

// Laporan Kependudukan
router.get("/laporan-kependudukan", laporanKependudukanController.getAllLaporanKependudukan);
router.put("/laporan-kependudukan/:id", auth.verifikasi(["admin", 'rt', 'rw']), laporanKependudukanController.updateLaporanKependudukan);
router.delete("/laporan-kependudukan/:id", auth.verifikasi(["admin", 'rt', 'rw']), laporanKependudukanController.deleteLaporanKependudukan);

// Fasilitasi Pertanahan
router.get("/fasilitasi-pertanahan", fasilitasiPertanahanController.getAllFasilitasiPertanahan);
router.post("/fasilitasi-pertanahan",  auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), fasilitasiPertanahanController.newFasilitasiPertanahan);
router.put("/fasilitasi-pertanahan/:id", auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), fasilitasiPertanahanController.updateFasilitasiPertanahan);
router.delete("/fasilitasi-pertanahan/:id", auth.verifikasi(["admin", 'rt', 'rw', "aduan_masyarakat"]), fasilitasiPertanahanController.deleteFasilitasiPertanahan);


module.exports = router