import React, { useState } from 'react'
import User from '../assets/icons/ic-admin-user.svg'
import Home from '../assets/icons/ic-admin-home.svg'
import Info from '../assets/icons/ic-admin-info.svg'
import Message from '../assets/icons/ic-admin-surat.svg'
import Control from '../assets/icons/ic-admin-control.svg'

const Admin = () => {

    const [open, setOpen] = useState(true);

    return (
        <div className="flex">
            <div className={` ${open ? "w-72" : "w-20 "} bg-slate-200 h-screen p-5  pt-8 relative duration-300`}>
                <img src={Control} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} alt="" />
                <div className="flex gap-x-4 items-center">
                    <img src={User} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} alt="p" />
                    <div className="">
                        <h1 className={`origin-left font-medium text-2xl duration-200 ${!open && "scale-0"}`}>Admin</h1>
                        <p className={`origin-left text-sm ${!open && "scale-0"}`}>Front End Developer</p>
                    </div>
                </div>
                <ul className="pt-6">
                    <li className='my-2'>
                        <a href="#beranda" className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white gap-x-4 hover:bg-blue-200 hover:font-bold">
                            <img src={Home} alt="" className='h-7 w-7' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Beranda</span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a href="#surat" className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white gap-x-4 hover:bg-blue-200 hover:font-bold">
                            <img src={Message} alt="" className='h-7 w-7' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Surat</span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a href="#tentang" className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white gap-x-4 hover:bg-blue-200 hover:font-bold">
                            <img src={Info} alt="" className='h-7 w-7' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Tentang</span>
                        </a>
                    </li>
                    {/* {Menus.map((menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                        >
                            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {menu.title}
                            </span>
                        </li>
                    ))} */}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Hai Admin</h1>
            </div>
        </div>
    )
}

export default Admin