import React, { useState } from "react";
import Logo from '../assets/images/img-login.svg';
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, IconButton, InputAdornment, MenuItem } from '@mui/material'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Register = () => {
    const [isProcess, setIsProcess] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            telp: "",
            email: "",
            password: "",
            jabatan: ""
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .min(2, "Name minimal 2 characters")
                .max(100, "Maximum 100 characters")
                .required("Name Wajib di isi"),
            phone: yup
                .string()
                .min(8, "Phone minimal 8 characters")
                .max(14, "Maximum 14 characters")
                .required("Phone Wajib di isi"),
            email: yup
                .string()
                .min(2, "Email minimal 2 characters")
                .max(100, "Maximum 100 characters")
                .required("Email Wajib di isi"),
            password: yup
                .string()
                .min(5, "Password minimal 5 characters")
                .max(100, "Maximum 100 characters")
                .required("Password Wajib di isi"),
            jabatan: yup
                .string()
                .required("Jabatan Wajib di isi"),
        }),
    });


    const register = () => {
        if (isProcess) return;
        setIsProcess(true);
        axios.post(
            `http://localhost:8000/api/v1/auth/register`,
            {
                name: formik.values.name,
                email: formik.values.email,
                password: formik.values.password,
                role: parseInt(formik.values.jabatan),
                phone: formik.values.telp
            },
            { timeout: 1000 * 60 }
        ).then(result => {
            formik.resetForm()
            setIsProcess(false);
            alert(result.data.message)
        }).catch(err => {
            formik.resetForm()
            setIsProcess(false);
            alert(err)
        })
    };


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
                                        <h1 className="font-semibold text-center text-2xl mb-5">Buat Akun Anda</h1>

                                        <div className="mb-5">
                                            <TextField
                                                fullWidth
                                                autoComplete="on"
                                                label="Name "
                                                placeholder="Name"
                                                name="name"
                                                className='mt-5'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                            />
                                        </div>
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
                                        <div className="mb-5">
                                            <TextField
                                                fullWidth
                                                select
                                                autoComplete="on"
                                                label="Jabatan "
                                                placeholder="jabatan"
                                                name="jabatan"
                                                className='mt-5'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.jabatan}
                                                error={formik.touched.jabatan && Boolean(formik.errors.jabatan)}
                                                helperText={formik.touched.jabatan && formik.errors.jabatan}
                                            >
                                                <MenuItem value='2'>RT</MenuItem>
                                                <MenuItem value='3'>RW</MenuItem>
                                                <MenuItem value='4'>Kim Kegiatan</MenuItem>
                                                <MenuItem value='5'>Aduan Masyarakat</MenuItem>
                                                <MenuItem value='6'>Fasilitasi Pertanahan</MenuItem>
                                            </TextField>
                                        </div>
                                        <Button
                                            onClick={register}
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            className="bg-blue-700 p-3 w-full"
                                        >Daftar</Button>
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

export default Register;
