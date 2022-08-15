import React, { useState } from 'react';
import LayoutDashboard from '../../component/LayoutDashboard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, CircularProgress, Button, TextField } from '@mui/material'
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import Logo from "../../assets/images/img-logo.png"
import DefaultModal from '../../component/DefaultModal';
import { useFormik } from "formik";
import * as yup from "yup";
import ModalDelete from '../../component/ModalDelete';
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

const PosKamling = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [pos, setPos] = useState({
        nama: "",
        alamat: "",
        phone: "",
        keterangan: "",
        photo: ""
    })

    const onInputEditChange = (e) => {
        setPos({ ...pos, [e.target.name]: e.target.value })
    }

    const formik = useFormik({
        initialValues: {
            nama: "",
            alamat: "",
            phone: "",
            keterangan: "",
            photo: ""
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
    });

    const handleOpenModal = (data) => {
        setPos({
            id: data.id,
            nama: data.nama,
            alamat: data.alamat,
            photo: data.photo,
            keterangan: data.keterangan,
            phone: data.phone
        })
        setOpenModal(true)
    }

    const handleOpenDeleteModal = (data) => {
        setPos({
            id: data.id,
            nama: data.nama,
            alamat: data.alamat,
            photo: data.photo,
            keterangan: data.keterangan,
            phone: data.phone
        })
        setOpenDeleteModal(true)
    }

    const onSaveEdit = async () => {
        const dataSaveEdit = {
            nama: pos?.nama,
            phone: pos?.phone,
            photo: pos?.photo,
            alamat: pos?.alamat,
            keterangan: pos?.keterangan
        }

        await axios.put(`${API.HOST}/poskamling/${pos?.id}`, dataSaveEdit, {
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
            nama: formik.values.nama,
            phone: formik.values.phone,
            photo: formik.values.photo,
            alamat: formik.values.alamat,
            keterangan: formik.values.keterangan
        }
        await axios.post(`${API.HOST}/poskamling`, dataSave, {
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
        await axios.delete(`${API.HOST}/poskamling/${id}`, {
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

    const { data: posKamlings, error: errorPosKamlings } = useSWR(
        `${API.HOST}/poskamling`,
        (url) =>
            axios(url).then((data) => data.data),
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

    if (errorPosKamlings) {
        swal({
            title: "Peringatan",
            text: errorPosKamlings.message,
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
                    if (errorPosKamlings.status === 401) {
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
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">List Pos Kamling</h3>
                            <span className="text-base font-normal text-gray-500">Berikut merupakan list pos kamling</span>
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
                                                    Nama Pos Kamling
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Alamat
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    HandPhone
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Keterangan
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Foto
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {
                                                !posKamlings ? (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <CircularProgress />
                                                    </div>
                                                ) : posKamlings?.results?.map((element, i) => (
                                                    <tr key={i}>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.nama}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.alamat}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                                                            {element?.phone}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                                                            {element?.keterangan}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                            {element?.photo.length > 0 ? <img width={100} height={100} src={element?.photo} alt={element?.nama} /> : <img width={50} height={50} src={Logo} alt={element?.nama} />}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
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
                    title={`Edit ${pos?.nama}`}
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
                                value={pos.nama}
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
                                value={pos.alamat}
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
                                value={parseInt(pos.phone)}
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
                                value={pos.keterangan}
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
                                value={pos.photo}
                            />
                        </div>
                    </form>
                </DefaultModal>

                {/* Modal Add Data */}
                <DefaultModal
                    title="Tambah Pos Kamling"
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
                    data={pos}
                    open={openDeleteModal}
                    setOpen={handleDeleteModal}
                    handleDelete={() => onDelete(pos.id)}
                />
            </div>
        </LayoutDashboard>
    )
}

export default PosKamling