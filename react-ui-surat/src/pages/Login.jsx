import React, { useState } from "react";
import Logo from '../assets/images/img-login.svg'
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, IconButton, InputAdornment } from '@mui/material'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { Navigate } from 'react-router-dom';

const Login = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .min(2, "Email minimal 2 characters")
                .max(100, "Maximum 100 characters")
                .required("Email Wajib di isi"),
            password: yup
                .string()
                .min(5, "Password minimal 5 characters")
                .max(100, "Maximum 100 characters")
                .required("Password Wajib di isi")
        }),
    });

    const onLogin = async () => {
        if (!isAuthenticating) {
            setIsAuthenticating(true);
            //Call
            await axios.post(
                `http://localhost:8000/api/v1/auth/login`,
                {
                    email: formik.values.email,
                    password: formik.values.password,
                },
                { timeout: 1000 * 45 }
            ).then(result => {
                formik.resetForm()
                setIsAuthenticating(false);
                if (result.data.code === 200) {
                    if (result.data.results.statusAkun === "Belum Verifikasi Akun") {
                        alert("Akun anda belum di verifikasi oleh admin, silahkan hubungi admin!")
                    } else if(result.data.results.statusAkun === "tolak") {
                        alert("Mohon maaf akun anda di anggap tidak valid!")
                    } else {
                        alert(result.data.message)
                        dispatch(login(result.data.results.payload));
                    }
                } else {
                    alert(result.data.message)
                }
            }).catch(err => {
                formik.resetForm()
                setIsAuthenticating(false);
                alert(err)
            })
        }
    }

    if (user?.isAuth) {
        if (user.value.authorize === "admin") {
            return <Navigate to="/admin" replace />
        } else if (user.value.authorize === "RW") {
            return console.log('redirect to rw')
        } 
    }
    return (
        <>
            <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 handphone:grid-cols-1 desktop:gap-8">
                <div className="hidden laptop:block text-center bg-zinc-200 p-4 handphone:py-10">
                    <div className="">
                        <img src={Logo} alt="Lumajang" className="mt-28 laptop:h-60 handphone:h-36 mx-auto mb-10" />
                    </div>
                </div>

                <div className="flex items-center justify-center rounded-md">
                    <div className="handphone:min-h-fit laptop:min-h-screen flex flex-col laptop:justify-center px-0 w-full handphone:justify-start">
                        <div className="desktop:w-full laptop:w-full">
                            <div className="w-full rounded-lg divide-y ">
                                <div className="px-5">
                                    <form
                                        className="flex flex-col p-5 laptop:p-8 bg-white mt-24 laptop:mt-5 rounded-md shadow"
                                    >
                                        <h1 className="font-semibold text-center text-2xl mb-5">Masuk ke Akun Anda</h1>
                                        <div className="mb-5">
                                            <TextField
                                                fullWidth
                                                autoComplete="on"
                                                label="Email "
                                                placeholder="email"
                                                name="email"
                                                className='mt-5'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <TextField
                                                fullWidth
                                                autoComplete="on"
                                                label="Password "
                                                placeholder="password"
                                                name="password"
                                                type={!showPassword ? "password" : "text"}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                error={
                                                    formik.touched.password && Boolean(formik.errors.password)
                                                }
                                                helperText={formik.touched.password && formik.errors.password}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword(prev => !prev)}
                                                                size="large"
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <Button
                                            onClick={onLogin}
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            className="bg-blue-700 p-3 w-full"
                                        >Masuk</Button>
                                        <p className="text-lg font-semibold mt-2 pt-1 mb-0 text-center ">
                                            Tidak memiliki akun? <a href="#!" className="text-slate-900 hover:text-blue-400 transition duration-200 ease-in-out">Daftar</a>
                                        </p>
                                    </form>
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
