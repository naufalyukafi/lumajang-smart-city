import React from 'react'
import { IconButton, Button } from "@mui/material"
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const NavbarDashboard = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user);

    const onLogout = () => {
        dispatch(logout())
        alert("Akun berhasil keluar")
    }

    return (
        <nav className={`bg-white border-b border-gray-200 fixed z-30 w-full`}>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <div className='laptop:hidden'>
                            <IconButton
                                onClick={() => setOpen(prev => !prev)}
                                color="primary"
                                aria-label="icon home"
                                component="label">
                                {open ? <FormatAlignLeftIcon color='primary' /> : <CloseIcon />}
                            </IconButton>
                        </div>
                        <a href="#admin_blank" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                            <span className="self-center whitespace-nowrap">Halo {user?.value?.name}!</span>
                        </a>
                        <form action="#admin_blank" method="GET" className="hidden lg:block lg:pl-32">
                            <label htmlFor="topbar-search" className="sr-only">Search</label>
                            <div className="mt-1 relative lg:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                            </div>
                        </form>
                    </div>
                    <div className="mr-2 laptop:mr-4">
                        <Button onClick={onLogout} variant="contained" size="small" >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDashboard