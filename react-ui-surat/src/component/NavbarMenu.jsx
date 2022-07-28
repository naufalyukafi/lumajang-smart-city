import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import ImageLogo from '../assets/images/img-logo.png'

const NavbarMenu = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-gray-800'>
            {/* <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1> */}
            <div className="flex items-center bg-slate-200 rounded-md px-8 py-1">
                <img src={ImageLogo} alt={ImageLogo} className="h-16" />
                <p className='text-base text-center font-semibold p-2'>Kabupaten <br /> Lumajang</p>
            </div>
            <ul className='hidden laptop:flex text-center'>
                <li className='p-4 w-36'>Beranda</li>
                <li className='p-4 w-36'>Profil Daerah</li>
                <li className='p-4 w-36'>Pemerintahan</li>
            </ul>
            <div onClick={handleNav} className='block desktop:hidden laptop:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-slate-200 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
                <li className='p-4 border-b border-gray-600'>Home</li>
                <li className='p-4 border-b border-gray-600'>Company</li>
                <li className='p-4 border-b border-gray-600'>Resources</li>
                <li className='p-4 border-b border-gray-600'>About</li>
                <li className='p-4'>Contact</li>
            </ul>
        </div>
    );
};

export default NavbarMenu