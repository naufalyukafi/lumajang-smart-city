import React, { useState } from 'react'
import NavbarDashboard from '../../component/NavbarDashboard';
import FooterDashboard from '../../component/FooterDashboard';
import { Routes, Route } from 'react-router-dom';
import SidebarAduan from '../../component/Admin/SidebarAduan';
import ExamplePage from './ExamplePage';

const AduanMasyarakat = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <NavbarDashboard open={open} setOpen={setOpen} />
            <SidebarAduan open={open} />
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <Routes>
                <Route path="/" element={<ExamplePage />} />
            </Routes>
            <FooterDashboard />
        </>
    )
}

export default AduanMasyarakat