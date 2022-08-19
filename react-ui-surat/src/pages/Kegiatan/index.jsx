import React, { useState } from "react";
import NavbarDashboard from "../../component/NavbarDashboard";
import FooterDashboard from "../../component/FooterDashboard";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ListBlogs from "./Blogs/ListBlogs";
import DetailBlog from "./Blogs/DetailBlog";
import SidebarKegiatan from "../../component/Admin/SidebarKegiatan";

const Kegiaatan = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  if (user.isAuth === false) {
    localStorage.clear();
    <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavbarDashboard open={open} setOpen={setOpen} />
      <SidebarKegiatan open={open} />
      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
      <Routes>
        <Route>
          <Route path="/" element={<ListBlogs />} />
          <Route path="/:title" element={<DetailBlog />} />
        </Route>
      </Routes>
      <FooterDashboard />
    </>
  );
};

export default Kegiaatan;
