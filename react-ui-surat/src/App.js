import "./index.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HalBerita from "./pages/HalBerita";
import DetailBerita from "./pages/DetailBerita";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin/index";
import { ProtectedRoute } from "./utils/protected.route";
import AduanMasyarakat from "./pages/AduanMasyarakat";
import Kegiaatan from "./pages/Kegiatan";
import UserPublic from "./pages/Public";
import FasilitasiPertanahan from "./pages/FasilitasiPertanahan";
import ProfileDitotrunan from "./pages/ProfileDitotrunan";
import AjukanSurat from "./pages/AjukanSurat";
import PengaduanMasyarakat from "./pages/PengaduanMasyarakat";
import "aos/dist/aos.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/berita" element={<HalBerita />} />
          <Route path="/profil" element={<ProfileDitotrunan />} />
          <Route path="/ajukan-surat" element={<AjukanSurat />} />
          <Route path="/pengaduan-masyarakat" element={<PengaduanMasyarakat />} />
          <Route path="detail/:slug" element={<DetailBerita />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route>
            <Route path="/pemerintahan/*" element={<UserPublic />} />
          </Route>
          <Route element={<ProtectedRoute allowed={["admin"]} />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoute allowed={["aduan_masyarakat"]} />}>
            <Route path="/saran-aduan/*" element={<AduanMasyarakat />} />
          </Route>
          <Route element={<ProtectedRoute allowed={["kim_kegiatan"]} />}>
            <Route path="/kegiatan/*" element={<Kegiaatan />} />
          </Route>
          <Route
            element={<ProtectedRoute allowed={["fasilitasi_pertanahan"]} />}
          >
            <Route path="/pertanahan/*" element={<FasilitasiPertanahan />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
