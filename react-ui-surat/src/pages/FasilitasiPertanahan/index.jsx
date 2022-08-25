import React, { useState } from "react";
import NavbarDashboard from "../../component/NavbarDashboard";
import FooterDashboard from "../../component/FooterDashboard";
import { Routes, Route } from "react-router-dom";
import ListPertanahan from "./ListPertanahan";
import DetailPertanahan from "./DetailPertanahan";
import SidebarPertanahan from "../../component/Admin/SidebarPertanahan";
import AddPertanahan from "./AddPertanahan";

const FasilitasiPertanahan = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NavbarDashboard open={open} setOpen={setOpen} />
      <SidebarPertanahan open={open} />
      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
      <Routes>
        <Route>
          <Route path="/" element={<ListPertanahan />} />
          <Route path="/:id" element={<DetailPertanahan />} />
          <Route path="/new" element={<AddPertanahan />} />
        </Route>
      </Routes>
      <FooterDashboard />
    </>
  );
};

export default FasilitasiPertanahan;
