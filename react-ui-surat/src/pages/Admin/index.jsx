import React, { useState } from 'react'
import NavbarDashboard from '../../component/NavbarDashboard';
import SidebarAdmin from '../../component/Admin/SidebarAdmin';
import FooterDashboard from '../../component/FooterDashboard';
import DashboardAdmin from './DashboardAdmin';
import { Routes, Route } from 'react-router-dom';
import ExamplePage from './ExamplePage';
import ListUser from './ListUser';

const Admin = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <NavbarDashboard open={open} setOpen={setOpen} />
            <SidebarAdmin open={open} />
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/example" element={<ExamplePage />} />
                <Route path="/list-user" element={<ListUser />} />
            </Routes>
            <FooterDashboard />
        </>
    )
}

export default Admin