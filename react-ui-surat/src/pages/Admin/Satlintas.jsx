import React, { useState } from 'react'
import LayoutDashboard from '../../component/LayoutDashboard'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, CircularProgress, Button, TextField } from '@mui/material'
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import DefaultModal from '../../component/DefaultModal';
import ModalDelete from '../../component/ModalDelete';
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../../assets/images/img-logo.png"
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

const Satlintas = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [satlintas, setSatlintas] = useState({
        nama: "",
        tanggal_lahir: "",
        alamat: "",
        rt: "",
        rw: "",
        jabatan: "",
        phone: "",
        keterangan: "",
        photo: "",
    })

    const onInputEditChange = (e) => {
        setSatlintas({ ...satlintas, [e.target.name]: e.target.value })
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
        setSatlintas({
            nik: data.nik,
            nama: data.nama,
            tanggal_lahir: data.tanggal_lahir,
            alamat: data.alamat,
            RT: data.RT,
            RW: data.RW,
            jabatan: data.jabatan,
            phone: data.phone,
            keterangan: data.keterangan,
            photo: data.photo,
        })
        setOpenModal(true)
    }

    const handleOpenDeleteModal = (data) => {
        setSatlintas({
            nik: data.nik,
            nama: data.nama,
            tanggal_lahir: data.tanggal_lahir,
            alamat: data.alamat,
            rt: data.rt,
            rw: data.rw,
            jabatan: data.jabatan,
            phone: data.phone,
            keterangan: data.keterangan,
            photo: data.photo,
        })
        setOpenDeleteModal(true)
    }

    const onSaveEdit = async () => {
        const dataSaveEdit = {
            nama: satlintas.nama,
            tanggal_lahir: satlintas.tanggal_lahir.toString(),
            alamat: satlintas.alamat,
            RT: satlintas.rt,
            RW: satlintas.rw,
            jabatan: satlintas.jabatan,
            phone: satlintas.phone,
            keterangan: satlintas.keterangan,
            photo: satlintas.photo,
        }

        console.log(dataSaveEdit)

        await axios.put(`${API.HOST}/pegawai/${satlintas?.nik}`, dataSaveEdit, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            if (result.data.code === 200) {
                setOpenModal(false)
                alert(result.data.message)
            } else {
                alert(result.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
            alert(err.response.data.message)
        })

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
            keterangan: formik.values.keterangan,
            photo: formik.values.photo,
            role_pegawai: "satlintas",
        }
        await axios.post(`${API.HOST}/pegawai/`, dataSave, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            formik.resetForm()
            if (result.data.code === 200) {
                setOpenAddModal(false)
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

    const onDelete = async (id) => {
        await axios.delete(`${API.HOST}/pegawai/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(result => {
            if (result.data.code === 200) {
                setOpenDeleteModal(false)
                alert(result.data.message)
            } else {
                alert(result.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
            setOpenDeleteModal(false)
            formik.resetForm()
            alert(err.response.data.message)
        })
    }

    const handleModal = () => setOpenModal(prev => !prev)
    const handleAddModal = () => setOpenAddModal(prev => !prev)
    const handleDeleteModal = () => setOpenDeleteModal(prev => !prev)

    const { data: satlintass, error: errorSatlintas } = useSWR(
        `${API.HOST}/pegawai/satlintas`,
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

    if (errorSatlintas) {
        swal({
            title: "Peringatan",
            text: errorSatlintas.message,
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
                    if (errorSatlintas.status === 401) {
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">List Pegawai Pengurus Satlintas</h3>
                            <span className="text-base font-normal text-gray-500">Berikut merupakan list pegawai Pengurus Satlintas</span>
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
                                                    Keterangan
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
                                                !satlintass ? (
                                                    <tr className="absolute inset-0 flex items-center justify-center">
                                                        <td><CircularProgress /></td>
                                                    </tr>
                                                ) : satlintass?.results?.map((element, i) => (
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
                                                            {element?.keterangan}
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
                    title={`Edit ${satlintas?.nama}`}
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
                                value={satlintas.nama}
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
                                value={satlintas.tanggal_lahir}
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
                                value={satlintas.alamat}
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
                                value={satlintas.RT}
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
                                value={satlintas.RW}
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
                                value={satlintas.jabatan}
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
                                value={parseInt(satlintas.phone)}
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
                                value={satlintas.keterangan}
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
                                value={satlintas.photo}
                            />
                        </div>
                    </form>
                </DefaultModal>

                {/* Modal Add Data */}
                <DefaultModal
                    title="Tambah Data Pegawai SATLINTAS"
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
                    data={satlintas}
                    open={openDeleteModal}
                    setOpen={handleDeleteModal}
                    handleDelete={() => onDelete(satlintas.nik)}
                />
            </div>
        </LayoutDashboard>
    )
}

export default Satlintas