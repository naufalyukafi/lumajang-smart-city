import React, { useState } from "react";
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useFormik } from "formik";
import * as yup from "yup";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import API from "../../utils/host.config";


const eToast = {
    icon: "⚠️",
    style: {
        minWidth: "250px",
        border: "1px solid #FF4C4D",
        padding: "16px",
        color: "#000",
        marginBottom: "25px",
    },
    duration: 5000,
};

const Form = () => {
    const [pengaduanMasyarakat, setPengaduanMasyarakat] = useState({
        nama: "",
        status_kependudukan: "",
        identitas: "",
        alamat: "",
        pekerjaan: "",
        email: "",
        phone: "",
        judul: "",
        message: "",
        status: ""
    })

    const formik = useFormik({
        initialValues: {
            nama: "",
            status_kependudukan: "",
            identitas: "",
            alamat: "",
            pekerjaan: "",
            email: "",
            phone: "",
            judul: "",
            message: "",
            status: ""
        },
        validationSchema: yup.object({
            nama: yup
                .string()
                .min(2, "Nama minimal 2 characters")
                .max(100, "Maximum 100 characters")
                .required("Nama Wajib di isi"),
            phone: yup
                .string()
                .min(8, "Phone minimal 8 characters")
                .max(100, "Maximum 100 characters")
                .required("Phone Wajib di isi"),
        }),
    })

    const onSaveAdd = async () => {
        const dataSave = {
            nama: formik.values.nama,
            status_kependudukan: formik.values.status_kependudukan,
            identitas: formik.values.identitas,
            alamat: formik.values.alamat,
            pekerjaan: formik.values.pekerjaan,
            email: formik.values.nemailame,
            phone: formik.values.phone,
            judul: formik.values.judul,
            message: formik.values.message,
            status: formik.values.status,
        }
        await axios.post(`${API.HOST}/v1/saran`, dataSave, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            formik.resetForm()
            if (result.data.code === 200) {
                // setOpenAddModal(false)
                alert(result.data.message)
            } else {
                alert(result.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
            formik.resetForm()
            alert(err.response.data.message)
        })
    }

    const { data: pengaduanMasyarakats, error: errorPengaduanMasyarakat } = useSWR(
        `${API.HOST}/pegawai/pegawai-kelurahan`,
        (url) =>
            axios(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("xtoken"),
                },
            }).then((data) => data.data),
        {
            refreshWhenOffline: true,
            loadingTimeout: 45000, //slow network (2G, <= 70Kbps) default 3s
            onLoadingSlow: () => toast.error("Koneksi Anda Buruk", eToast),
            onSuccess: (data) => {
                if (data && !data.success) {
                    toast.error(data.message, eToast);
                }
            },
            onError: (err) => {
                if (err.code === "ECONNABORTED") {
                    toast.error(
                        "Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.",
                        eToast
                    );
                } else if (err.response) {
                    toast.error(err.data.message, eToast);
                } else {
                    toast.error(err.message, eToast);
                }
            },
        }
    );

    if (errorPengaduanMasyarakat) {
        swal({
            title: "Peringatan",
            text: errorPengaduanMasyarakat.message,
            icon: "error",
            closeOnClickOutside: false,
            buttons: {
                catch: {
                    text: "Tutup",
                    value: "oke",
                    className: "mx-auto",
                },
            },
        }).then((value) => {
            switch (value) {
                case "oke":
                    if (errorPengaduanMasyarakat.status === 401) {
                        window.location.reload();
                    }
                    break;
                default:
                    return;
            }
        });
    }

    return (
        <>
            <form className="w-full content-start">
                <p className="font-bold uppercase text-center py-2 px-4 rounded mb-4 text-3xl">Pengaduan Masyarakat</p>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Nama Pelapor
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Nama"
                        name="nama"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.nama}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nama && Boolean(formik.errors.nama)}
                        helperText={formik.touched.nama && formik.errors.nama}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Status Kependudukan
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Status Kependudukan"
                        name="status_kependudukan"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.status_kependudukan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.status_kependudukan && Boolean(formik.errors.status_kependudukan)}
                        helperText={formik.touched.status_kependudukan && formik.errors.status_kependudukan}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Identitas
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Identitas"
                        name="identitas"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.identitas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.identitas && Boolean(formik.errors.identitas)}
                        helperText={formik.touched.identitas && formik.errors.identitas}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Alamat
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Isi Alamat Anda"
                        name="alamat"
                        size='small'
                        className='rounded-md flex items-center'
                        multiline
                        rows={4}
                        value={formik.values.alamat}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
                        helperText={formik.touched.alamat && formik.errors.alamat}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Pekerjaan
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Pekerjaan"
                        name="pekerjaan"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.pekerjaan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.pekerjaan && Boolean(formik.errors.pekerjaan)}
                        helperText={formik.touched.pekerjaan && formik.errors.pekerjaan}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Email
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Email"
                        name="email"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Phone
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Phone"
                        name="phone"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Judul
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Judul"
                        name="judul"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.judul}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.judul && Boolean(formik.errors.judul)}
                        helperText={formik.touched.judul && formik.errors.judul}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Message
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Isi Message Anda"
                        name="message"
                        size='small'
                        className='rounded-md flex items-center'
                        multiline
                        rows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Photo
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Photo"
                        name="photo"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.photo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.photo && Boolean(formik.errors.photo)}
                        helperText={formik.touched.photo && formik.errors.photo}
                    />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="rounded-md flex items-center mb-3">
                        Status
                    </div>
                    <TextField
                        fullWidth
                        autoComplete="on"
                        placeholder="Status"
                        name="status"
                        size='small'
                        className='rounded-md flex items-center'
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                    />
                </div>
                <Button onSubmit={onSaveAdd} type="submit" variant="contained" sx={{ mx: "auto", width: 150, pr: 4 }} style={{ float: "right", paddingLeft: "1.5rem" }}>Submit</Button>
            </form>
        </>
    )
}

export default Form
