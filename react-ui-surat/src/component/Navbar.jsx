import React from 'react'
import Imagelogo from '../assets/images/img-logo.png'

const Navbar = () => {
    return (
        <header className='flex items-center justify-between w-full fixed top-0 z-10 h-[5.4rem] p-[3.2rem]'>
            <h2 className='text-red-700'>Helooooooooooooooo</h2>
            <img src={Imagelogo} alt={Imagelogo} className="h-6" />
            <div className="">
                <a href="#modelS" className="nav_link">Model S</a>
                <a href="#model3" className="nav_link">Model 3</a>
                <a href="#modelX" className="nav_link">Model X</a>
                <a href="#modelY" className="nav_link">Model Y</a>
                <a href="#solarRoof" className="nav_link">Solar Roof</a>
                <a href="#solarPanels" className="nav_link">Solar Panels</a>
            </div>
            <div className="text-2xl font-semibold text-[#181b21] mx-[0.8rem] px-[0.8rem] py-[0.4rem] rounded-[0.8rem] bg-transparent hover:bg-[#181b21] hover:bg-opacity-10 transition-all duration-200">
                <a href="#shop" className="nav_link">Shop</a>
                <a href="#account" className="nav_link">Account</a>
                <a href="#menu" className="nav_link">Menu</a>
            </div>
            <div className="">

            </div>
        </header>
    )
}

export default Navbar

