import './index.css';
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HalBerita from './pages/HalBerita';
import DetailBerita from './pages/DetailBerita';
import Login from './pages/Login';
import Register from './pages/Register'
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/berita' element={<HalBerita />} />
          <Route path='/detail' element={<DetailBerita />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
