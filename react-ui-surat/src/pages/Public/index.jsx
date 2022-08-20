import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarMenu from "../../component/NavbarMenu";
import Footer from "../../component/Footer";
import PegawaiKelurahan from "./PegawaiKelurahan";
import PengurusRT from "./PengurusRT";
import PengurusRW from "./PengurusRw";
import Satlintas from "./Satlintas";
import TokohAgama from "./TokohAgama";
import TokohMasyarakat from "./TokohMasyarakat";

const UserPublic = () => {
  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/pegawai-kelurahan" element={<PegawaiKelurahan />} />
        <Route path="/rt" element={<PengurusRT />} />
        <Route path="/rw" element={<PengurusRW />} />
        <Route path="/satlintas" element={<Satlintas />} />
        <Route path="/tokoh-agama" element={<TokohAgama />} />
        <Route path="/tokoh-masyarakat" element={<TokohMasyarakat />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserPublic;
