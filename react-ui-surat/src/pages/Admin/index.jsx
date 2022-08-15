import React, { useState } from 'react'
import NavbarDashboard from '../../component/NavbarDashboard';
import SidebarAdmin from '../../component/Admin/SidebarAdmin';
import FooterDashboard from '../../component/FooterDashboard';
import DashboardAdmin from './DashboardAdmin';
import { Routes, Route } from 'react-router-dom';
import ExamplePage from './ExamplePage';
import ListUser from './ListUser';
import PengurusRT from './PengurusRT';
import PengurusRW from './PengurusRw';
import Satlintas from './Satlintas';
import TokohAgama from './TokohAgama';
import TokohMasyarakat from './TokohMasyarakat';
import PegawaiKelurahan from './PegawaiKelurahan';
import PosKamling from './PosKamling';
import Penduduk from './Penduduk';

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
                <Route path="/rt" element={<PengurusRT />} />
                <Route path="/rw" element={<PengurusRW />} />
                <Route path="/satlintas" element={<Satlintas />} />
                <Route path="/tokoh-agama" element={<TokohAgama />} />
                <Route path="/tokoh-masyarakat" element={<TokohMasyarakat />} />
                <Route path="/pegawai-kelurahan" element={<PegawaiKelurahan />} />
                <Route path="/pos-kamling" element={<PosKamling />} />
                <Route path="/penduduk" element={<Penduduk />} />
            </Routes>
            <FooterDashboard />
        </>
    )
}

export default Admin