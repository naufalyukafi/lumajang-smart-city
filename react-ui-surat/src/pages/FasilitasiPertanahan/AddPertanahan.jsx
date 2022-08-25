import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    TextField
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LayoutDashboard from "../../component/LayoutDashboard";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../../utils/host.config";
import { useFormik } from "formik";
import * as yup from "yup";
import { sToast, wToast, eToast } from "../../utils/toastCustom";

const AddPertanahan = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nama_petugas_1: "",
            nama_petugas_2: "",
            tanggal_ukur: "",
            nama_pemilik_tanah: "",
            no_ktp: "",
            nomor_kohir: "",
            nomor_persil: "",
            alamat: "",
            panjang_tanah: "",
            lebar_tanah: "",
            luas_tanah: "",
            batas_utara: "",
            batas_selatan: "",
            batas_barat: "",
            batas_timur: "",
            sebab_perubahan_status: "",
            tanggal_perubahan_status: "",
            koordinat_utara: "",
            koordinat_selatan: "",
            koordinat_timur: "",
            koordinat_barat: "",
            keterangan: "",
        },
        validationSchema: yup.object({
            nama_petugas_1: yup
                .string()
                .min(5, "Nama Petugas 1 minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Nama Petugas 2 Wajib di isi"),
            nama_petugas_2: yup
                .string()
                .min(5, "Nama Petugas 1 minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Nama Petugas 2 Wajib di isi"),
            alamat: yup
                .string()
                .min(5, "Alamat minimal 5 characters")
                .max(100, "Maximum 100 characters")
                .required("Alamat Wajib di isi"),
            tanggal_ukur: yup
                .string()
                .min(5, "Tanggal Ukur minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Tanggal Ukur Wajib di isi"),
            nama_pemilik_tanah: yup
                .string()
                .min(5, "Nama Pemilik Tanah minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Nama Pemilik Tanah Wajib di isi"),
            no_ktp: yup
                .string()
                .min(8, "KTP minimal 8 characters")
                .max(255, "Maximum 255 characters")
                .required("KTP Wajib di isi"),
            nomor_kohir: yup
                .string()
                .min(2, "Nomor Kohir minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("Nomor Kohir Wajib di isi"),
            nomor_persil: yup
                .string()
                .min(2, "Nomor Persil minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("Nomor Persil Wajib di isi"),
            panjang_tanah: yup
                .string()
                .min(2, "Panjang Tanah minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("Panjang Tanah Wajib di isi"),
            lebar_tanah: yup
                .string()
                .min(2, "Lebar Tanah minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("Lebar Tanah Wajib di isi"),
            luas_tanah: yup
                .string()
                .min(2, "Luas Tanah minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("Luas Tanah Wajib di isi"),
            batas_utara: yup
                .string()
                .min(5, "Batas Utara minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Batas Utara Wajib di isi"),
            batas_selatan: yup
                .string()
                .min(5, "Batas Selatan minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Batas Selatan Wajib di isi"),
            batas_barat: yup
                .string()
                .min(5, "Batas Barat minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Batas Barat Wajib di isi"),
            batas_timur: yup
                .string()
                .min(5, "Batas Timur minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Batas Timur Wajib di isi"),
            sebab_perubahan_status: yup
                .string()
                .min(5, "Sebab Perubahan Status minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Sebab Perubahan Status Wajib di isi"),
            tanggal_perubahan_status: yup
                .string()
                .min(5, "Tanggal Perubahan Status minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Tanggal Perubahan Status Wajib di isi"),
            koordinat_utara: yup
                .string()
                .min(2, "koordinat utara minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("koordinat utara Wajib di isi"),
            koordinat_selatan: yup
                .string()
                .min(2, "koordinat utara minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("koordinat utara Wajib di isi"),
            koordinat_timur: yup
                .string()
                .min(2, "koordinat utara minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("koordinat utara Wajib di isi"),
            koordinat_barat: yup
                .string()
                .min(2, "koordinat utara minimal 2 characters")
                .max(255, "Maximum 255 characters")
                .required("koordinat utara Wajib di isi"),
            keterangan: yup
                .string()
                .min(5, "Keterangan minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Keterangan Wajib di isi"),
        }),
    });

    const onSave = async () => {
        const dataSave = {
            nama_petugas_1: formik.values.nama_petugas_1,
            nama_petugas_2: formik.values.nama_petugas_2,
            tanggal_ukur: formik.values.tanggal_ukur,
            nama_pemilik_tanah: formik.values.nama_pemilik_tanah,
            no_ktp: formik.values.no_ktp,
            nomor_kohir: formik.values.nomor_kohir,
            nomor_persil: formik.values.nomor_persil,
            alamat: formik.values.alamat,
            panjang_tanah: formik.values.panjang_tanah,
            lebar_tanah: formik.values.lebar_tanah,
            luas_tanah: formik.values.luas_tanah,
            batas_utara: formik.values.batas_utara,
            batas_selatan: formik.values.batas_selatan,
            batas_barat: formik.values.batas_barat,
            batas_timur: formik.values.batas_timur,
            sebab_perubahan_status: formik.values.sebab_perubahan_status,
            tanggal_perubahan_status: formik.values.tanggal_perubahan_status,
            koordinat_utara: formik.values.koordinat_utara,
            koordinat_selatan: formik.values.koordinat_selatan,
            koordinat_timur: formik.values.koordinat_timur,
            koordinat_barat: formik.values.koordinat_barat,
            keterangan: formik.values.keterangan
        };
        await axios.post(`${API.HOST}/fasilitasi-pertanahan`, dataSave, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then((result) => {
            formik.resetForm();
            if (result.data.code === 200) {
                toast.success(result.data.message, sToast);
                navigate('/pertanahan')
            } else {
                toast.success(result.data.message, wToast);
            }
        }).catch((err) => {
            formik.resetForm();
            if (err.code === "ECONNABORTED") {
                toast.success(
                    "Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.",
                    wToast
                );
            } else if (err.response) {
                toast.error(err.response.data.message, eToast);
            } else {
                toast.error(err.message, eToast);
            }
        });
    };


    return (
        <LayoutDashboard>
            <div className="w-full min-h-screen">
                <Button
                    onClick={() => navigate(-1)}
                    variant="contained"
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Kembali
                </Button>
                <>
                    <div className="bg-white min-h-25v mt-5 border-dashed p-5 w-full border-2  rounded-sm">
                        <p className="font-semibold"> Tambah Data Tanah</p>
                        <form className="my-5">

                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Nama Petugas 1"
                                    placeholder="Nama Petugas 1"
                                    name="nama_petugas_1"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.nama_petugas_1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nama_petugas_1 && Boolean(formik.errors.nama_petugas_1)}
                                    helperText={formik.touched.nama_petugas_1 && formik.errors.nama_petugas_1}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Nama Petugas 2"
                                    placeholder="Nama Petugas 2"
                                    name="nama_petugas_2"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.nama_petugas_2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nama_petugas_2 && Boolean(formik.errors.nama_petugas_2)}
                                    helperText={formik.touched.nama_petugas_2 && formik.errors.nama_petugas_2}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Tanggal Ukur"
                                    placeholder="Tanggal Ukur"
                                    name="tanggal_ukur"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.tanggal_ukur}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.tanggal_ukur &&
                                        Boolean(formik.errors.tanggal_ukur)
                                    }
                                    helperText={
                                        formik.touched.tanggal_ukur && formik.errors.tanggal_ukur
                                    }
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Nama Pemilik Tanah"
                                    placeholder="Nama Pemilik Tanah"
                                    name="nama_pemilik_tanah"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.nama_pemilik_tanah}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nama_pemilik_tanah && Boolean(formik.errors.nama_pemilik_tanah)}
                                    helperText={formik.touched.nama_pemilik_tanah && formik.errors.nama_pemilik_tanah}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="KTP"
                                    placeholder="KTP"
                                    name="no_ktp"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.no_ktp}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.no_ktp && Boolean(formik.errors.no_ktp)}
                                    helpeno_ktpext={formik.touched.no_ktp && formik.errors.no_ktp}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Nomor Kohir"
                                    placeholder="Nomor Kohir"
                                    name="nomor_kohir"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.nomor_kohir}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nomor_kohir && Boolean(formik.errors.nomor_kohir)}
                                    helperText={formik.touched.nomor_kohir && formik.errors.nomor_kohir}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    size="small"
                                    autoComplete="on"
                                    label="Nomor Persil"
                                    name="nomor_persil"
                                    type="number"
                                    className="mt-5"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nomor_persil}
                                    error={
                                        formik.touched.nomor_persil &&
                                        Boolean(formik.errors.nomor_persil)
                                    }
                                    helperText={
                                        formik.touched.nomor_persil && formik.errors.nomor_persil
                                    }
                                />

                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Alamat"
                                    placeholder="Alamat"
                                    name="alamat"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.alamat}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.alamat && Boolean(formik.errors.alamat)
                                    }
                                    helperText={
                                        formik.touched.alamat && formik.errors.alamat
                                    }
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Panjang Tanah"
                                    placeholder="Panjang Tanah"
                                    name="panjang_tanah"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.panjang_tanah}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.panjang_tanah && Boolean(formik.errors.panjang_tanah)
                                    }
                                    helperText={formik.touched.panjang_tanah && formik.errors.panjang_tanah}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Lebar Tanah"
                                    placeholder="Lebar Tanah"
                                    name="lebar_tanah"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.lebar_tanah}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lebar_tanah && Boolean(formik.errors.lebar_tanah)}
                                    helperText={formik.touched.lebar_tanah && formik.errors.lebar_tanah}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Luas Tanah"
                                    placeholder="Luas Tanah"
                                    name="luas_tanah"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.luas_tanah}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.luas_tanah && Boolean(formik.errors.luas_tanah)}
                                    helperText={formik.touched.luas_tanah && formik.errors.luas_tanah}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Batas Utara"
                                    placeholder="Batas Utara"
                                    name="batas_utara"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.batas_utara}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.batas_utara && Boolean(formik.errors.batas_utara)}
                                    helperText={formik.touched.batas_utara && formik.errors.batas_utara}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Batas Selatan"
                                    placeholder="Batas Selatan"
                                    name="batas_selatan"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.batas_selatan}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.batas_selatan && Boolean(formik.errors.batas_selatan)}
                                    helperText={formik.touched.batas_selatan && formik.errors.batas_selatan}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Batas Barat"
                                    placeholder="Batas Barat"
                                    name="batas_barat"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.batas_barat}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.batas_barat && Boolean(formik.errors.batas_barat)}
                                    helperText={formik.touched.batas_barat && formik.errors.batas_barat}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Batas Timur"
                                    placeholder="Batas Timur"
                                    name="batas_timur"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.batas_timur}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.batas_timur && Boolean(formik.errors.batas_timur)}
                                    helperText={formik.touched.batas_timur && formik.errors.batas_timur}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Sebab Perubahan Status"
                                    placeholder="Sebab Perubahan Status"
                                    name="sebab_perubahan_status"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.sebab_perubahan_status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sebab_perubahan_status && Boolean(formik.errors.sebab_perubahan_status)}
                                    helperText={formik.touched.sebab_perubahan_status && formik.errors.sebab_perubahan_status}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Tanggal Perubahan Status"
                                    placeholder="Tanggal Perubahan Status"
                                    name="tanggal_perubahan_status"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.tanggal_perubahan_status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.tanggal_perubahan_status && Boolean(formik.errors.tanggal_perubahan_status)}
                                    helperText={formik.touched.tanggal_perubahan_status && formik.errors.tanggal_perubahan_status}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Koordinat Utara"
                                    placeholder="Koordinat Utara"
                                    name="koordinat_utara"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.koordinat_utara}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.koordinat_utara && Boolean(formik.errors.koordinat_utara)}
                                    helperText={formik.touched.koordinat_utara && formik.errors.koordinat_utara}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="koordinat_selatan"
                                    name="koordinat_selatan"
                                    placeholder="Koordinat Selatan"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.koordinat_selatan}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.koordinat_selatan && Boolean(formik.errors.koordinat_selatan)}
                                    helperText={formik.touched.koordinat_selatan && formik.errors.koordinat_selatan}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Koordinat Timur"
                                    placeholder="Koordinat Timur"
                                    name="koordinat_timur"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.koordinat_timur}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.koordinat_timur && Boolean(formik.errors.koordinat_timur)}
                                    helperText={formik.touched.koordinat_timur && formik.errors.koordinat_timur}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    name="koordinat_barat"
                                    placeholder="Koordinat Barat"
                                    label="Koordinat Barat"
                                    type="number"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.koordinat_barat}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.koordinat_barat && Boolean(formik.errors.koordinat_barat)}
                                    helperText={formik.touched.koordinat_barat && formik.errors.koordinat_barat}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    label="Keterangan"
                                    placeholder="Keterangan"
                                    name="keterangan"
                                    size="small"
                                    className="mt-5"
                                    value={formik.values.keterangan}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.keterangan && Boolean(formik.errors.keterangan)}
                                    helperText={formik.touched.keterangan && formik.errors.keterangan}
                                />
                            </div>
                            <div className="mb-5">
                                <Button
                                    onClick={onSave}
                                    variant="contained"
                                    className="w-full"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            </div>
        </LayoutDashboard>
    );
};

export default AddPertanahan;
