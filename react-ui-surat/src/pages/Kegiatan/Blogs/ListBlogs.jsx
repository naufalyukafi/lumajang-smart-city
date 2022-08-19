import React, { useState } from "react";
import LayoutDashboard from "../../../component/LayoutDashboard";
import { CircularProgress, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR, { mutate } from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../../utils/host.config";
import moment from "moment";
import idLocale from "moment/locale/id";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DefaultModal from "../../../component/DefaultModal";
import { useFormik } from "formik";
import * as yup from "yup";
import ModalDelete from "../../../component/ModalDelete";
import { eToast, sToast, wToast } from "../../../utils/toastCustom";

const ListBlogs = () => {
  const navigate = useNavigate();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [blog, setBlog] = useState({});

  const handleAddModal = () => setOpenAddModal((prev) => !prev);
  const handleDeleteModal = () => setOpenDeleteModal((prev) => !prev);

  const handleOpenDeleteModal = (data) => {
    setBlog({
      id: data.id,
      nama: data.title,
    });
    setOpenDeleteModal(true);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: yup.object({
      content: yup
        .string()
        .min(8, "Judul minimal 8 characters")
        .max(255, "Maximum 255 characters")
        .required("Judul Wajib di isi"),
    }),
  });

  const { data: blogs, error: errorBlog } = useSWR(
    `${API.HOST}/blogs`,
    (url) =>
      axios(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        timeout: 1000 * 60,
      }).then((data) => data.data),
    {
      refreshWhenOffline: true,
      loadingTimeout: 45000, //slow network (2G, <= 70Kbps) default 3s
      onLoadingSlow: () => toast.error("Koneksi Anda Buruk", wToast),
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

  if (errorBlog) {
    swal({
      title: "Peringatan",
      text: errorBlog.message,
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
          if (errorBlog.status === 401) {
            window.location.reload();
          }
          break;
        default:
          return;
      }
    });
  }

  const onSaveAdd = async () => {
    const dataSave = {
      content: formik.values.content,
      status: false,
    };
    await axios
      .post(`${API.HOST}/blog/newpage`, dataSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        timeout: 1000 * 60,
      })
      .then((result) => {
        formik.resetForm();
        setOpenAddModal(false);
        if (result.data.code === 200) {
          toast.success(result.data.message, sToast);
        } else {
          toast.success(result.data.message, wToast);
        }
      })
      .catch((err) => {
        setOpenAddModal(false);
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
    mutate(`${API.HOST}/blogs`);
  };

  const onDelete = async (id) => {
    await axios
      .delete(`${API.HOST}/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        timeout: 1000 * 60,
      })
      .then((result) => {
        setOpenDeleteModal(false);
        if (result.data.code === 200) {
          toast.success(result.data.message, sToast);
        } else {
          toast.success(result.data.message, wToast);
        }
      })
      .catch((err) => {
        setOpenDeleteModal(false);
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
    mutate(`${API.HOST}/blogs`);
  };

  return (
    <LayoutDashboard>
      <div className="w-full grid grid-cols-1 gap-4 min-h-screen">
        <div className="bg-white min-w-full shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Laporan Kegiatan
              </h3>
              <span className="text-base font-normal text-gray-500">
                Berikut merupakan list laporan kegiatan
              </span>
            </div>
            <div>
              <Button
                onClick={handleAddModal}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Tambah Artikel
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <div className="align-middle inline-block min-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Judul Kegiatan
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Waktu
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {!blogs ? (
                      <tr className="absolute inset-0 flex items-center justify-center">
                        <td>
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : (
                      blogs?.results?.map((element, i) => (
                        <tr key={i} className="cursor-pointer hover:border-2">
                          <td
                            onClick={() =>
                              navigate(`/kegiatan/${element?.label_slug}`)
                            }
                            className="p-4 capitalize whitespace-nowrap text-sm font-normal text-gray-900"
                          >
                            {element?.title}{" "}
                            {element.status === 0 && (
                              <span className="text-blue-700">(Draft)</span>
                            )}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                            {moment(element?.updated_date)
                              .local("id", idLocale)
                              .format("hh.mm - DD MMMM YYYY")}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
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
      {/* Modal Add Data */}
      <DefaultModal
        title="Tambah Artikel Laporan Kegiatan"
        open={openAddModal}
        setOpen={handleAddModal}
        onSubmit={onSaveAdd}
      >
        <form>
          <div className="mb-5">
            <TextField
              fullWidth
              autoComplete="on"
              label="Judul"
              placeholder="Masukkan Judul"
              name="content"
              size="small"
              className="mt-5"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
          </div>
        </form>
      </DefaultModal>

      {/* Modal Delete */}
      <ModalDelete
        data={blog}
        open={openDeleteModal}
        setOpen={handleDeleteModal}
        handleDelete={() => onDelete(blog?.id)}
      />
    </LayoutDashboard>
  );
};

export default ListBlogs;
