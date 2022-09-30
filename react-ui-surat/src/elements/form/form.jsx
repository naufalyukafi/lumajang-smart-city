import React from "react";
import axios from "axios";
import { Button, TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import API from "../../utils/host.config";
import { eToast, sToast, wToast } from "../../utils/toastCustom";

const Form = () => {
  const formik = useFormik({
    initialValues: {
      nama: "",
      status_kependudukan: "",
      identitas: "",
      alamat: "",
      pekerjaan: "",
      email: "",
      phone: "",
      photo: "",
      judul: "",
      message: "",
      status: "",
    },
    validationSchema: yup.object({
      nama: yup
        .string()
        .min(2, "Nama minimal 2 characters")
        .max(100, "Maximum 100 characters")
        .required("Nama Wajib di isi"),
      status_kependudukan: yup
        .string()
        .min(4, "Status Kependudukan minimal 4 characters")
        .max(100, "Maximum 100 characters")
        .required("Status Kependudukan Wajib di isi"),
      identitas: yup
        .string()
        .min(8, "Identitas minimal 8 characters")
        .max(100, "Maximum 100 characters")
        .required("Identitas Wajib di isi"),
      alamat: yup
        .string()
        .min(5, "Alamat minimal 5 characters")
        .max(100, "Maximum 100 characters")
        .required("Alamat Wajib di isi"),
      pekerjaan: yup
        .string()
        .min(3, "pekerjaan minimal 3 characters")
        .max(100, "Maximum 100 characters")
        .required("pekerjaan Wajib di isi"),
      email: yup
        .string()
        .min(4, "email minimal 4 characters")
        .max(100, "Maximum 100 characters")
        .required("email Wajib di isi"),
      judul: yup
        .string()
        .min(8, "Judul minimal 8 characters")
        .max(100, "Maximum 100 characters")
        .required("Judul Wajib di isi"),
      message: yup
        .string()
        .min(18, "Pesan minimal 28 characters")
        .max(255, "Maximum 255 characters")
        .required("Pesan Wajib di isi"),
      status: yup
        .string()
        .min(7, "Status minimal 7 characters")
        .max(100, "Maximum 100 characters")
        .required("Status Wajib di isi"),
      phone: yup
        .string()
        .min(8, "Phone minimal 8 characters")
        .max(100, "Maximum 100 characters")
        .required("Phone Wajib di isi"),
      photo: yup
        .string()
        .min(8, "Foto minimal 8 characters")
        .max(255, "Maximum 255 characters")
        .required("Foto Wajib di isi"),
    }),
  });

  const onSaveAdd = async () => {
    const dataSave = {
      nama: formik.values.nama,
      status_kependudukan: formik.values.status_kependudukan,
      identitas: formik.values.identitas,
      alamat: formik.values.alamat,
      pekerjaan: formik.values.pekerjaan,
      email: formik.values.email,
      phone: formik.values.phone,
      photo: formik.values.photo,
      judul: formik.values.judul,
      message: formik.values.message,
      status: formik.values.status,
    };
    await axios
      .post(`${API.HOST}/saran`, dataSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        timeout: 1000 * 60,
      })
      .then((result) => {
        formik.resetForm();
        if (result.data.code === 200) {
          toast.success(result.data.message, sToast);
        } else {
          toast.success(result.data.message, wToast);
        }
      })
      .catch((err) => {
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
    <>
      <form className="w-full">
        <p className="font-bold uppercase text-center px-4 rounded mb-4">
          Pengaduan Masyarakat
        </p>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Nama"
            label="Nama"
            name="nama"
            size="small"
            className="rounded-md"
            value={formik.values.nama}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nama && Boolean(formik.errors.nama)}
            helperText={formik.touched.nama && formik.errors.nama}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            select
            autoComplete="on"
            placeholder="Status Kependudukan"
            label="Status Kependudukan"
            name="status_kependudukan"
            size="small"
            className="rounded-md"
            value={formik.values.status_kependudukan}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.status_kependudukan &&
              Boolean(formik.errors.status_kependudukan)
            }
            helperText={
              formik.touched.status_kependudukan &&
              formik.errors.status_kependudukan
            }
          >
            <MenuItem value="Warga Ditotrunan">Warga Ditotrunan</MenuItem>
            <MenuItem value="Bukan Warga Ditotrunan">
              Bukan Warga Ditotrunan
            </MenuItem>
          </TextField>
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Identitas"
            name="identitas"
            label="Identitas"
            size="small"
            className="rounded-md"
            value={formik.values.identitas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.identitas && Boolean(formik.errors.identitas)}
            helperText={formik.touched.identitas && formik.errors.identitas}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Isi Alamat Anda"
            name="alamat"
            label="Alamat"
            size="small"
            className="rounded-md"
            multiline
            rows={4}
            value={formik.values.alamat}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.alamat && Boolean(formik.errors.alamat)}
            helperText={formik.touched.alamat && formik.errors.alamat}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Pekerjaan"
            label="Pekerjaan"
            name="pekerjaan"
            size="small"
            className="rounded-md"
            value={formik.values.pekerjaan}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pekerjaan && Boolean(formik.errors.pekerjaan)}
            helperText={formik.touched.pekerjaan && formik.errors.pekerjaan}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Email"
            label="Email"
            name="email"
            size="small"
            className="rounded-md"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Phone"
            label="Phone"
            name="phone"
            size="small"
            className="rounded-md"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Judul"
            label="Judul"
            name="judul"
            size="small"
            className="rounded-md"
            value={formik.values.judul}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.judul && Boolean(formik.errors.judul)}
            helperText={formik.touched.judul && formik.errors.judul}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            label="Pesan"
            placeholder="Isi Pesan Anda"
            name="message"
            size="small"
            className="rounded-md"
            multiline
            rows={8}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            autoComplete="on"
            placeholder="Foto"
            label="Foto"
            name="photo"
            size="small"
            className="rounded-md"
            value={formik.values.photo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.photo && Boolean(formik.errors.photo)}
            helperText={formik.touched.photo && formik.errors.photo}
          />
        </div>
        <div className="px-6 mb-5">
          <TextField
            fullWidth
            select
            autoComplete="on"
            placeholder="Status"
            name="status"
            size="small"
            label="Status"
            className="rounded-md"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Rahasia">Rahasia</MenuItem>
            <MenuItem value="Bukan Rahasia">Bukan Rahasia</MenuItem>
          </TextField>
        </div>
        <div className="px-6 mb-5">
          <Button
            className="w-full"
            onClick={onSaveAdd}
            type="button"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
