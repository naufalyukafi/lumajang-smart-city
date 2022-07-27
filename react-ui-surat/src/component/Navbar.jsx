import React from 'react'
import Profil from '../elements/Dropdown/Profil'
import Pemerintahan from '../elements/Dropdown/Pemerintahan'
import ImageLogo from '../assets/images/img-logo.png'

const Navbar = () => {
    return (
        <div className='flex items-center w-full fixed top-0 z-10 h-[5.4rem] p-[3.2rem]'>
            <div className="flex items-center bg-slate-400 rounded-md px-12 py-1">
                <img src={ImageLogo} alt={ImageLogo} className="h-16" />
                <p className='text-base text-center font-semibold p-2'>Kabupaten <br /> Lumajang</p>
            </div>
            <div className="">
                <Profil />
                <Pemerintahan />
            </div>
        </div>
    )
}

export default Navbar