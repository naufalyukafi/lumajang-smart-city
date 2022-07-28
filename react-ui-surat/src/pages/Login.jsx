import React from "react";
import Logo from '../assets/images/img-logo.png'

const Login = () => {
    return (
        <>
            <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 handphone:grid-cols-1 desktop:gap-8">

                <div className="flex items-center justify-center bg-blue-600 p-4 handphone:py-10">
                    <div className="">
                        <img src={Logo} alt="" className="text=center laptop:h-60 handphone:h-36 mx-auto mb-10" />
                        <p className="text-white text-xl font-bold">Selamat Datang di Web Admin</p>
                    </div>
                </div>

                <div className="flex items-center justify-center rounded-md">
                    <div className="handphone:min-h-fit laptop:min-h-screen flex flex-col laptop:justify-center px-0 w-full handphone:justify-start">
                        <div className="desktop:w-full laptop:w-full">
                            <h1 className="font-bold text-center text-2xl my-16 handphone:my-12">Masuk ke Akun Anda</h1>
                            <div className=" w-full rounded-lg divide-y ">
                                <div className="px-5 py-7">
                                    {/* Email */}
                                    <label className="font-semibold text-lg text-gray-600 pb-1 block">E-mail</label>
                                    <input type="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="Masukkan Email" />
                                    {/* Password */}
                                    <label className="font-semibold text-lg text-gray-600 pb-1 block">Password</label>
                                    <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="Masukkan Password" />

                                    <a href="" className="underline float-right text-lg mt-4">lupa password?</a>
                                    <button type="button" className="my-6 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                        <span className="inline-block mr-2">Masuk</span>
                                    </button>
                                    <p className="text-lg font-semibold mt-2 pt-1 mb-0 text-center ">
                                        Tidak memiliki akun? <a href="#!" className="text-slate-900 hover:text-blue-400 transition duration-200 ease-in-out">Daftar</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;
