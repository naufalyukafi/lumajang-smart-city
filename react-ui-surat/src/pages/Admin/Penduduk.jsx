import React, { useState } from "react";
import LayoutDashboard from "../../component/LayoutDashboard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import Logo from "../../assets/images/img-logo.png";
import DefaultModal from "../../component/DefaultModal";
import { useFormik } from "formik";
import * as yup from "yup";
import ModalDelete from "../../component/ModalDelete";
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

const Penduduk = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [pos, setPos] = useState({
    nama: "",
    tanggal_lahir: "",
    alamat: "",
    RT: "",
    RW: "",
    jenis_kelamin: "",
    pendidikan: "",
    pekerjaan: "",
    phone: "",
    photo: "",
  });

  const onInputEditChange = (e) => {
    setPos({ ...pos, [e.target.name]: e.target.value });
  };

  const formik = useFormik({
    initialValues: {
      nik: "",
      nama: "",
      tanggal_lahir: "",
      RT: "",
      RW: "",
      jenis_kelamin: "",
      pendidikan: "",
      pekerjaan: "",
      alamat: "",
      phone: "",
      photo: "",
    },
    validationSchema: yup.object({
      nik: yup
        .string()
        .min(11, "NIK minimal 11 characters")
        .max(100, "Maximum 100 characters")
        .required("NIK Wajib di isi"),
      nama: yup
        .string()
        .min(2, "Nama minimal 2 characters")
        .max(100, "Maximum 100 characters")
        .required("Nama Wajib di isi"),
      tanggal_lahir: yup
        .string()
        .min(5, "tanggal_lahir minimal 5 characters")
        .max(100, "Maximum 100 characters")
        .required("tanggal_lahir Wajib di isi"),
      alamat: yup
        .string()
        .min(5, "Alamat minimal 5 characters")
        .max(100, "Maximum 100 characters")
        .required("Alamat Wajib di isi"),
      RT: yup
        .string()
        .min(2, "RT minimal 2 characters")
        .max(100, "Maximum 100 characters")
        .required("RT Wajib di isi"),
      RW: yup
        .string()
        .min(2, "RW minimal 2 characters")
        .max(100, "Maximum 100 characters")
        .required("RW Wajib di isi"),
      jenis_kelamin: yup
        .string()
        .min(3, "Jenis Kelamin minimal 3 characters")
        .max(100, "Maximum 100 characters")
        .required("Jenis Kelamin Wajib di isi"),
      phone: yup
        .string()
        .min(8, "Phone minimal 8 characters")
        .max(100, "Maximum 100 characters")
        .required("Phone Wajib di isi"),
      pendidikan: yup
        .string()
        .min(3, "Pendidikan minimal 3 characters")
        .max(100, "Maximum 100 characters")
        .required("Pendidikan Wajib di isi"),
      pekerjaan: yup
        .string()
        .min(3, "Pendidikan minimal 3 characters")
        .max(100, "Maximum 100 characters")
        .required("Pendidikan Wajib di isi"),
      photo: yup
        .string()
        .min(5, "Foto minimal 5 characters")
        .max(255, "Maximum 255 characters")
        .required("Foto Wajib di isi"),
    }),
  });

  const handleOpenModal = (data) => {
    const objData = {
      nik: data.nik,
      nama: data.nama,
      alamat: data.alamat,
      photo: data.photo,
      keterangan: data.keterangan,
      phone: data.phone,
      tanggal_lahir: data.tanggal_lahir,
      RT: data.RT,
      RW: data.RW,
      jenis_kelamin: data.jenis_kelamin,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
    };
    setPos(objData);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (data) => {
    setPos({
      nik: data.nik,
      nama: data.nama,
      alamat: data.alamat,
      photo: data.photo,
      phone: data.phone,
      tanggal_lahir: data.tanggal_lahir,
      RT: data.RT,
      RW: data.RW,
      jenis_kelamin: data.jenis_kelamin,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
    });
    setOpenDeleteModal(true);
  };

  const onSaveEdit = async () => {
    const dataSaveEdit = {
      nama: pos.nama,
      alamat: pos.alamat,
      photo: pos.photo,
      phone: pos.phone,
      tanggal_lahir: pos.tanggal_lahir.toString(),
      RT: pos.RT.toString(),
      RW: pos.RW.toString(),
      jenis_kelamin: pos.jenis_kelamin,
      pendidikan: pos.pendidikan,
      pekerjaan: pos.pekerjaan,
    };

    await axios
      .put(`${API.HOST}/penduduk/${pos?.nik}`, dataSaveEdit, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
      })
      .then((result) => {
        if (result.data.code === 200) {
          setOpenModal(false);
          setPos({
            nama: "",
            tanggal_lahir: "",
            alamat: "",
            RT: "",
            RW: "",
            jenis_kelamin: "",
            pendidikan: "",
            pekerjaan: "",
            phone: "",
            photo: "",
          });
          alert(result.data.message);
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  const onSaveAdd = async () => {
    const dataSave = {
      nik: formik.values.nik,
      nama: formik.values.nama,
      phone: formik.values.phone,
      photo: formik.values.photo,
      alamat: formik.values.alamat,
      tanggal_lahir: formik.values.tanggal_lahir,
      jenis_kelamin: formik.values.jenis_kelamin,
      RT: formik.values.RT,
      RW: formik.values.RW,
      pendidikan: formik.values.pendidikan,
      pekerjaan: formik.values.pekerjaan,
    };
    await axios
      .post(`${API.HOST}/penduduk`, dataSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
      })
      .then((result) => {
        formik.resetForm();
        if (result.data.code === 200) {
          setOpenAddModal(false);
          alert(result.data.message);
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        formik.resetForm();
        alert(err.response.data.message);
      });
  };

  const onDelete = async (id) => {
    await axios
      .delete(`${API.HOST}/penduduk/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
      })
      .then((result) => {
        if (result.data.code === 200) {
          setOpenDeleteModal(false);
          alert(result.data.message);
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOpenDeleteModal(false);
        formik.resetForm();
        alert(err.response.data.message);
      });
  };

  const handleModal = () => setOpenModal((prev) => !prev);
  const handleAddModal = () => setOpenAddModal((prev) => !prev);
  const handleDeleteModal = () => setOpenDeleteModal((prev) => !prev);

  const { data: penduduks, error: errorPenduduks } = useSWR(
    `${API.HOST}/penduduk`,
    (url) => axios(url).then((data) => data.data),
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

  if (errorPenduduks) {
    swal({
      title: "Peringatan",
      text: errorPenduduks.message,
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
          if (errorPenduduks.status === 401) {
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                List Penduduk
              </h3>
              <span className="text-base font-normal text-gray-500">
                Berikut merupakan list penduduk
              </span>
            </div>
            <div>
              <Button
                onClick={handleAddModal}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Tambah Baru
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          NIK
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tanggal Lahir
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Alamat
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          RT/RW
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Jenis Kelamin
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pendidikan
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pekerjaan
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Photo
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {!penduduks ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CircularProgress />
                        </div>
                      ) : (
                        penduduks?.results?.map((element, i) => (
                          <tr key={i}>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
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
                              {element?.RT} / {element?.RW}
                            </td>
                            <td className="p-4 capitalize whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.jenis_kelamin}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                              {element?.pendidikan}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                              {element?.pekerjaan}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                              {element?.phone}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.photo.length > 0 ? (
                                <img
                                  width={100}
                                  height={100}
                                  src={element?.photo}
                                  alt={element?.nama}
                                />
                              ) : (
                                <img
                                  width={50}
                                  height={50}
                                  src={Logo}
                                  alt={element?.nama}
                                />
                              )}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              <IconButton
                                onClick={() => handleOpenModal(element)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenDeleteModal(element)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))
                      )}
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
          <form>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Nama"
                placeholder="Nama"
                name="nama"
                size="small"
                className="mt-5"
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
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.alamat}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Tanggal Lahir"
                placeholder="Tanggal Lahir"
                name="tanggal_lahir"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.tanggal_lahir}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="RT"
                placeholder="RT"
                name="RT"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.RT}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="RW"
                placeholder="RW"
                name="RW"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.RW}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                select
                autoComplete="on"
                label="Jenis Kelamin"
                placeholder="Jenis Kelamin"
                name="jenis_kelamin"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.jenis_kelamin}
              >
                <MenuItem value="laki-laki">Laki-laki</MenuItem>
                <MenuItem value="perempuan">Perempuan</MenuItem>
              </TextField>
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Pendidikan"
                placeholder="Pendidikan"
                name="Pendidikan"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.pendidikan}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Pekerjaan"
                placeholder="Pekerjaan"
                name="pekerjaan"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.pekerjaan}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="HandPhone "
                placeholder="HandPhone"
                name="phone"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={parseInt(pos.phone)}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Foto"
                placeholder="Foto"
                name="photo"
                size="small"
                className="mt-5"
                onChange={(e) => onInputEditChange(e)}
                value={pos.photo}
              />
            </div>
          </form>
        </DefaultModal>

        {/* Modal Add Data */}
        <DefaultModal
          title="Tambah Penduduk"
          open={openAddModal}
          setOpen={handleAddModal}
          onSubmit={onSaveAdd}
        >
          <form>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="NIK"
                placeholder="NIK"
                name="nik"
                size="small"
                className="mt-5"
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
                size="small"
                className="mt-5"
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
                placeholder="Tanggal Lahir"
                name="tanggal_lahir"
                size="small"
                className="mt-5"
                value={formik.values.tanggal_lahir}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tanggal_lahir &&
                  Boolean(formik.errors.tanggal_lahir)
                }
                helperText={
                  formik.touched.tanggal_lahir && formik.errors.tanggal_lahir
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
                name="RT"
                size="small"
                className="mt-5"
                value={formik.values.RT}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.RT && Boolean(formik.errors.RT)}
                helperText={formik.touched.RT && formik.errors.RT}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="RW"
                placeholder="RW"
                name="RW"
                size="small"
                className="mt-5"
                value={formik.values.RW}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.RW && Boolean(formik.errors.RW)}
                helperText={formik.touched.RW && formik.errors.RW}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                select
                autoComplete="on"
                label="Jenis Kelamin"
                placeholder="Jenis Kelamin"
                name="jenis_kelamin"
                className="mt-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jenis_kelamin}
                error={
                  formik.touched.jenis_kelamin &&
                  Boolean(formik.errors.jenis_kelamin)
                }
                helperText={
                  formik.touched.jenis_kelamin && formik.errors.jenis_kelamin
                }
              >
                <MenuItem value="Laki-laik">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </TextField>
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Pendidikan"
                placeholder="Pendidikan Terakhir"
                name="pendidikan"
                size="small"
                className="mt-5"
                value={formik.values.pendidikan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pendidikan && Boolean(formik.errors.pendidikan)
                }
                helperText={
                  formik.touched.pendidikan && formik.errors.pendidikan
                }
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="Perkerjaan"
                placeholder="Perkerjaan"
                name="pekerjaan"
                size="small"
                className="mt-5"
                value={formik.values.pekerjaan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pekerjaan && Boolean(formik.errors.pekerjaan)
                }
                helperText={formik.touched.pekerjaan && formik.errors.pekerjaan}
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                autoComplete="on"
                label="HandPhone "
                placeholder="HandPhone"
                name="phone"
                size="small"
                className="mt-5"
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
                label="Foto"
                placeholder="Foto"
                name="photo"
                size="small"
                className="mt-5"
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
          handleDelete={() => onDelete(pos.nik)}
        />
      </div>
    </LayoutDashboard>
  );
};

export default Penduduk;
