import React, { useState } from 'react'
import LayoutDashboard from '../../component/LayoutDashboard'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, CircularProgress, Button, TextField } from '@mui/material'
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import DefaultModal from '../../component/DefaultModal';
import ModalDelete from '../../component/ModalDelete';
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../../assets/images/img-logo.png"
import API from "../../utils/host.config";
import { eToast, sToast, wToast } from "../../utils/toastCustom";

const PengurusRT = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [rt, setRt] = useState({
        nama: "",
        tanggal_lahir: "",
        alamat: "",
        rt: "",
        rw: "",
        jabatan: "",
        phone: "",
        nomor_sk: "",
        tanggal_sk: "",
        tanggal_akhir_sk: "",
        keterangan: "",
        photo: "",
    })

    const onInputEditChange = (e) => {
        setRt({ ...rt, [e.target.name]: e.target.value })
    }

    const formik = useFormik({
        initialValues: {
            nik: "",
            nama: "",
            tanggal_lahir: "",
            alamat: "",
            rt: "",
            rw: "",
            jabatan: "",
            phone: "",
            nomor_sk: "",
            tanggal_sk: "",
            tanggal_akhir_sk: "",
            keterangan: "",
            photo: "",
        },
        validationSchema: yup.object({
            nama: yup
                .string()
                .min(2, "Nama minimal 2 characters")
                .max(100, "Maximum 100 characters")
                .required("Nama Wajib di isi"),
            alamat: yup
                .string()
                .min(5, "Alamat minimal 5 characters")
                .max(100, "Maximum 100 characters")
                .required("Alamat Wajib di isi"),
            phone: yup
                .string()
                .min(8, "Phone minimal 8 characters")
                .max(100, "Maximum 100 characters")
                .required("Phone Wajib di isi"),
            keterangan: yup
                .string()
                .min(5, "Keterangan minimal 5 characters")
                .max(100, "Maximum 100 characters")
                .required("Keterangan Wajib di isi"),
            photo: yup
                .string()
                .min(5, "Foto minimal 5 characters")
                .max(255, "Maximum 255 characters")
                .required("Foto Wajib di isi"),
        }),
    })

    const handleOpenModal = (data) => {
        setRt({
            nik: data.nik,
            nama: data.nama,
            tanggal_lahir: data.tanggal_lahir,
            alamat: data.alamat,
            RT: data.RT,
            RW: data.RW,
            jabatan: data.jabatan,
            phone: data.phone,
            nomor_sk: data.nomor_sk,
            tanggal_sk: data.tanggal_sk,
            tanggal_akhir_sk: data.tanggal_akhir_sk,
            keterangan: data.keterangan,
            photo: data.photo,
        })
        setOpenModal(true)
    }

    const handleOpenDeleteModal = (data) => {
        setRt({
            nik: data.nik,
            nama: data.nama,
            tanggal_lahir: data.tanggal_lahir,
            alamat: data.alamat,
            rt: data.rt,
            rw: data.rw,
            jabatan: data.jabatan,
            phone: data.phone,
            nomor_sk: data.nomor_sk,
            tanggal_sk: data.tanggal_sk,
            tanggal_akhir_sk: data.tanggal_akhir_sk,
            keterangan: data.keterangan,
            photo: data.photo,
        })
        setOpenDeleteModal(true)
    }

    const onSaveEdit = async () => {
        const dataSaveEdit = {
            nama: rt.nama,
            tanggal_lahir: rt.tanggal_lahir.toString(),
            alamat: rt.alamat,
            RT: rt.RT.toString(),
            RW: rt.RW.toString(),
            jabatan: rt.jabatan,
            phone: rt.phone,
            nomor_sk: rt.nomor_sk.toString(),
            tanggal_sk: rt.tanggal_sk.toString(),
            tanggal_akhir_sk: rt.tanggal_akhir_sk.toString(),
            keterangan: rt.keterangan,
            photo: rt.photo,
        }

        console.log(dataSaveEdit)

        await axios.put(`${API.HOST}/pegawai/${rt?.nik}`, dataSaveEdit, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            if (result.data.code === 200) {
                toast.success(result.data.message, sToast);
            } else {
                toast.success(result.data.message, wToast);
            }
        }).catch(err => {
            if (err.code === "ECONNABORTED") {
                toast.success(
                    "Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.",
                    eToast
                );
            } else if (err.response) {
                toast.error(err.response.data.message, eToast);
            } else {
                toast.error(err.message, eToast);
            }
        })
        mutate(`${API.HOST}/admin/rt`)
    }

    const onSaveAdd = async () => {
        const dataSave = {
            nik: formik.values.nik,
            nama: formik.values.nama,
            tanggal_lahir: formik.values.tanggal_lahir,
            alamat: formik.values.alamat,
            RT: formik.values.rt,
            RW: formik.values.rw,
            jabatan: formik.values.jabatan,
            phone: formik.values.phone,
            nomor_sk: formik.values.nomor_sk,
            tanggal_sk: formik.values.tanggal_sk,
            tanggal_akhir_sk: formik.values.tanggal_akhir_sk,
            keterangan: formik.values.keterangan,
            photo: formik.values.photo,
            role_pegawai: "rt",
        }
        await axios.post(`${API.HOST}/pegawai/`, dataSave, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            if (result.data.code === 200) {
                toast.success(result.data.message, sToast);
            } else {
                toast.success(result.data.message, wToast);
            }
        }).catch(err => {
            if (err.code === "ECONNABORTED") {
                toast.success(
                    "Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.",
                    eToast
                );
            } else if (err.response) {
                toast.error(err.response.data.message, eToast);
            } else {
                toast.error(err.message, eToast);
            }
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`${API.HOST}/pegawai/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            if (result.data.code === 200) {
                toast.success(result.data.message, sToast);
            } else {
                toast.success(result.data.message, wToast);
            }
        }).catch(err => {
            if (err.code === "ECONNABORTED") {
                toast.success(
                    "Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.",
                    eToast
                );
            } else if (err.response) {
                toast.error(err.response.data.message, eToast);
            } else {
                toast.error(err.message, eToast);
            }
        })
        mutate(`${API.HOST}/admin/rt`)
    }

    const handleModal = () => setOpenModal(prev => !prev)
    const handleAddModal = () => setOpenAddModal(prev => !prev)
    const handleDeleteModal = () => setOpenDeleteModal(prev => !prev)

    const { data: rts, error: errorRt } = useSWR(
        `${API.HOST}/pegawai/rt`,
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

    if (errorRt) {
        swal({
            title: "Peringatan",
            text: errorRt.message,
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
                    if (errorRt.status === 401) {
                        window.location.reload();
                    }
                    break;
                default:
                    return;
            }
        });
    }

    return (
        <LayoutDashboard>
            <div className="w-full grid grid-cols-1 gap-4 min-h-screen">
                <div className="bg-white min-w-full shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">List Pegawai Pengurus RT</h3>
                            <span className="text-base font-normal text-gray-500">Berikut merupakan list pegawai Pengurus RT</span>
                        </div>
                        <div>
                            <Button onClick={handleAddModal} variant="contained" startIcon={<AddIcon />}>Tambah Baru</Button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                            <div className="align-middle inline-block min-w-full">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nik
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal Lahir
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Alamat
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    RT
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    RW
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Jabatan
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Phone
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nomor SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal Akhir SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Photo
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {
                                                !rts ? (
                                                    <tr className="absolute inset-0 flex items-center justify-center">
                                                        <td><CircularProgress /></td>
                                                    </tr>
                                                ) : rts?.results?.map((element, i) => (
                                                    <tr key={i}>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                            {element?.nik}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.nama}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.tanggal_lahir}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.alamat}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.RT}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.RW}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.jabatan}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.phone}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.nomor_sk}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.tanggal_sk}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.tanggal_akhir_sk}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.photo.length > 0 ? <img width={100} height={100} src={element?.photo} alt={element?.nama} /> : <img width={50} height={50} src={Logo} alt={element?.nama} />}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                            <IconButton onClick={() => handleOpenModal(element)}><EditIcon /></IconButton>
                                                            <IconButton onClick={() => handleOpenDeleteModal(element)}><DeleteIcon /></IconButton>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edit */}
                <DefaultModal
                    title={`Edit ${rt?.nama}`}
                    open={openModal}
                    setOpen={handleModal}
                    onSubmit={onSaveEdit}
                >
                    <form
                    >
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Nama"
                                placeholder="Nama"
                                name="nama"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.nama}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Alamat"
                                placeholder="Alamat"
                                name="alamat"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.alamat}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal Lahir"
                                placeholder="Tanggal Lahir"
                                name="tanggal_lahir"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.tanggal_lahir}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="RT"
                                placeholder="RT"
                                name="RT"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.RT}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="RW"
                                placeholder="RW"
                                name="RW"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.RW}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="JABATAN"
                                placeholder="JABATAN"
                                name="jabatan"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.jabatan}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="HandPhone "
                                placeholder="HandPhone"
                                name="phone"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.phone}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Nomor_SK "
                                placeholder="Nomor_SK"
                                name="nomor_sk"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.nomor_sk}
                            />
                        </div> <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal SK "
                                placeholder="Tanggal SK"
                                name="tanggal_sk"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.tanggal_sk}
                            />
                        </div> <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal Akhir SK "
                                placeholder="Tanggal Akhir SK"
                                name="tanggal_akhir_sk"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.tanggal_akhir_sk}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Keterangan"
                                placeholder="Keterangan"
                                name="keterangan"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.keterangan}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Foto"
                                placeholder="Foto"
                                name="photo"
                                size='small'
                                className='mt-5'
                                onChange={(e) => onInputEditChange(e)}
                                value={rt.photo}
                            />
                        </div>
                    </form>
                </DefaultModal>

                {/* Modal Add Data */}
                <DefaultModal
                    title="Tambah Data Pegawai RT"
                    open={openAddModal}
                    setOpen={handleAddModal}
                    onSubmit={onSaveAdd}
                >
                    <form
                    >
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="NIK"
                                placeholder="NIK"
                                name="nik"
                                size='small'
                                className='mt-5'
                                value={formik.values.nik}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nik && Boolean(formik.errors.nik)}
                                helperText={formik.touched.nik && formik.errors.nik}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Nama"
                                placeholder="Nama"
                                name="nama"
                                size='small'
                                className='mt-5'
                                value={formik.values.nama}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nama && Boolean(formik.errors.nama)}
                                helperText={formik.touched.nama && formik.errors.nama}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal Lahir"
                                placeholder="tanggal_lahir"
                                name="tanggal_lahir"
                                size='small'
                                className='mt-5'
                                value={formik.values.tanggal_lahir}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tanggal_lahir && Boolean(formik.errors.tanggal_lahir)}
                                helperText={formik.touched.tanggal_lahir && formik.errors.tanggal_lahir}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Alamat"
                                placeholder="Alamat"
                                name="alamat"
                                size='small'
                                className='mt-5'
                                value={formik.values.alamat}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.alamat && Boolean(formik.errors.alamat)}
                                helperText={formik.touched.alamat && formik.errors.alamat}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="RT"
                                placeholder="RT"
                                name="rt"
                                size='small'
                                className='mt-5'
                                value={formik.values.rt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rt && Boolean(formik.errors.rt)}
                                helperText={formik.touched.rt && formik.errors.rt}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="RW"
                                placeholder="RW"
                                name="rw"
                                size='small'
                                className='mt-5'
                                value={formik.values.rw}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rw && Boolean(formik.errors.rw)}
                                helperText={formik.touched.rw && formik.errors.rw}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Jabatan"
                                placeholder="Jabatan"
                                name="jabatan"
                                size='small'
                                className='mt-5'
                                value={formik.values.jabatan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.jabatan && Boolean(formik.errors.jabatan)}
                                helperText={formik.touched.jabatan && formik.errors.jabatan}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="HandPhone "
                                placeholder="HandPhone"
                                name="phone"
                                size='small'
                                className='mt-5'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Nomor_SK "
                                placeholder="Nomor_SK"
                                name="nomor_sk"
                                size='small'
                                className='mt-5'
                                value={formik.values.nomor_sk}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nomor_sk && Boolean(formik.errors.nomor_sk)}
                                helperText={formik.touched.nomor_sk && formik.errors.nomor_sk}
                            />
                        </div> <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal SK "
                                placeholder="Tanggal SK"
                                name="tanggal_sk"
                                size='small'
                                className='mt-5'
                                value={formik.values.tanggal_sk}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tanggal_sk && Boolean(formik.errors.tanggal_sk)}
                                helperText={formik.touched.tanggal_sk && formik.errors.tanggal_sk}
                            />
                        </div> <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Tanggal Akhir SK "
                                placeholder="Tanggal Akhir SK"
                                name="tanggal_akhir_sk"
                                size='small'
                                className='mt-5'
                                value={formik.values.tanggal_akhir_sk}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tanggal_akhir_sk && Boolean(formik.errors.tanggal_akhir_sk)}
                                helperText={formik.touched.tanggal_akhir_sk && formik.errors.tanggal_akhir_sk}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Keterangan"
                                placeholder="Keterangan"
                                name="keterangan"
                                size='small'
                                className='mt-5'
                                value={formik.values.keterangan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.keterangan && Boolean(formik.errors.keterangan)}
                                helperText={formik.touched.keterangan && formik.errors.keterangan}
                            />
                        </div>
                        <div className="mb-5">
                            <TextField
                                fullWidth
                                autoComplete="on"
                                label="Foto"
                                placeholder="Foto"
                                name="photo"
                                size='small'
                                className='mt-5'
                                value={formik.values.photo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.photo && Boolean(formik.errors.photo)}
                                helperText={formik.touched.photo && formik.errors.photo}
                            />
                        </div>
                    </form>
                </DefaultModal>

                {/* Modal Delete */}
                <ModalDelete
                    data={rt}
                    open={openDeleteModal}
                    setOpen={handleDeleteModal}
                    handleDelete={() => onDelete(rt.nik)}
                />
            </div>
        </LayoutDashboard>
    )
}

export default PengurusRT