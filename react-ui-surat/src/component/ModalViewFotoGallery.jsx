//#region
import React, { useState } from "react";
import axios from "axios";
import API from "../utils/host.config";
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/counterSlice";
import swal from "sweetalert";

const pToast = {
  style: {
    minWidth: "250px",
    border: "1px solid #1E40AF",
    padding: "16px",
    color: "#1E40AF",
    marginBottom: "25px",
  },
  success: {
    duration: 3000,
    icon: "",
  },
  error: {
    duration: 4500,
    icon: "",
  },
  duration: 60000,
};

export default function ModalViewFotoGallery(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  const formik = useFormik({
    initialValues: {
      caption: data.caption,
    },
    validationSchema: yup.object({
      caption: yup
        .string()
        .min(2, "Caption minimal 2 characters")
        .max(400, "Maximum 140 characters")
        .required("Caption Wajib di isi"),
    }),
    onSubmit: (values) => {
      createProcess(values);
    },
  });

  const createProcess = (values) => {
    if (isLoad) return toast.error("aksi sebelumnya belum selesai");

    setIsLoad(true);
    const reqUpdate = axios.put(
      `${API.HOST}/gallery/foto/update/${data.blogId}`,
      {
        id: data.id,
        caption: values.caption,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        timeout: 1000 * 60,
      }
    );

    toast.promise(
      reqUpdate,
      {
        loading: "Update data Foto ...",
        success: (data) => {
          setIsLoad(false);
          if (data.data.status) {
            props.close();
            dispatch(refresh());
          }

          return data.data.status ? (
            <div className="relative">
              <span className="absolute inset-y-0 -left-5 flex items-center">
                ✅
              </span>
              <p className="pl-3">{data.data.message}</p>
            </div>
          ) : (
            <div className="relative">
              <span className="absolute inset-y-0 -left-5 flex items-center">
                ❌
              </span>
              <p className="pl-3">{data.data.message}</p>
            </div>
          );
          // message
        },
        error: (error) => {
          setIsLoad(false);

          return (
            <div className="relative">
              <span className="absolute inset-y-0 -left-5 flex items-center">
                ❌
              </span>
              <p className="pl-3">
                <b>{error.response.data.message}</b>
              </p>
            </div>
          );
        },
      },
      pToast
    );
  };

  const peringatanDelete = (dat) => {
    swal({
      title: "Peringatan",
      text: `Anda akan menghapus foto ini ?`,
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        cancel: "Batal",
        okee: {
          text: "Hapus",
          value: "okee",
        },
      },
    }).then((value) => {
      switch (value) {
        case "okee":
          if (isLoad) return toast.error("aksi sebelumnya belum selesai");

          setIsLoad(true);
          const callupload = axios.delete(`${API.HOST}/gallery/foto/deleted`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
            timeout: 1000 * 70,
            data: {
              foto_id: dat.id,
              path: dat.image_url,
            },
          });
          toast.promise(
            callupload,
            {
              loading: "Menghapus Foto ...",
              success: (data) => {
                setIsLoad(false);
                if (data.data.status) {
                  props.close();
                  dispatch(refresh());
                }

                return data.data.status ? (
                  <div className="relative">
                    <span className="absolute inset-y-0 -left-5 flex items-center">
                      ✅
                    </span>
                    <p className="pl-3">{data.data.message}</p>
                  </div>
                ) : (
                  <div className="relative">
                    <span className="absolute inset-y-0 -left-5 flex items-center">
                      ❌
                    </span>
                    <p className="pl-3">{data.data.message}</p>
                  </div>
                );
                // message
              },
              error: (error) => {
                setIsLoad(false);

                return (
                  <div className="relative">
                    <span className="absolute inset-y-0 -left-5 flex items-center">
                      ❌
                    </span>
                    <p className="pl-3">
                      <b>{error.response.data.message}</b>
                    </p>
                  </div>
                );
              },
            },
            pToast
          );
          break;
        default:
          return;
      }
    });
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="flex align-middle justify-center"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className="z-50 bg-white overflow-x-hidden overflow-y-auto rounded w-4/5 2xl:w-2/4 flex flex-col items-center">
            <div className="relative flex w-full items-center">
              <h2 className="w-full text-center text-2xl pt-5 pb-2 border-b">
                Foto Gallery
              </h2>
              <div className="absolute inset-y-0 right-0 pt-2">
                <IconButton onClick={() => props.close()} size="large">
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full p-5">
              <div className="grid grid-cols-1">
                <div className="m-1">
                  <header className="border-2 border-dashed border-slate-400 py-12 flex flex-col justify-center items-center">
                    <img
                      src={API.HOST + data.image_url}
                      alt="icon"
                      className="px-1 mx-auto object-cover h-60 w-full"
                    />
                  </header>
                </div>
                <div className="mb-3">
                  <TextField
                    label="Caption Foto"
                    placeholder="Caption Foto"
                    margin="normal"
                    name="caption"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    multiline
                    maxRows={3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.caption}
                    error={
                      formik.touched.caption && Boolean(formik.errors.caption)
                    }
                    helperText={formik.touched.caption && formik.errors.caption}
                  />
                </div>
              </div>

              <div className="flex space-x-5">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoad}
                  startIcon={<i className="fa-solid fa-floppy-disk"></i>}
                  endIcon={
                    isLoad ? (
                      <CircularProgress
                        size={20}
                        thickness={4}
                        style={{ color: "white" }}
                      />
                    ) : null
                  }
                >
                  Simpan pembaruan
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  disabled={isLoad}
                  startIcon={<i className="fa-solid fa-trash"></i>}
                  onClick={() => peringatanDelete(data)}
                  endIcon={
                    isLoad ? (
                      <CircularProgress
                        size={20}
                        thickness={4}
                        style={{ color: "white" }}
                      />
                    ) : null
                  }
                >
                  Hapus
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
