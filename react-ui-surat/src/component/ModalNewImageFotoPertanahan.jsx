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

const eToast = {
  style: {
    minWidth: "250px",
    border: "1px solid #FF4C4D",
    padding: "16px",
    color: "#000",
    marginBottom: "25px",
  },
  duration: 5000,
};
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

export default function ModalNewImageFotoPertanahan(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    validationSchema: yup.object({
      caption: yup
        .string()
        .min(2, "Type minimal 2 characters")
        .max(400, "Maximum 140 characters")
        .required("Caption Wajib di isi"),
    }),
    onSubmit: (values) => {
      console.log("call");
      createProcess(values);
    },
  });

  const createProcess = (values) => {
    if (!imageFile) {
      toast.error("Pilih File gambar terlebih dahulu", eToast);
      return;
    }
    const formData = new FormData();
    formData.append("photo", imageFile);
    formData.append("type", values.caption);
    formData.append("pertanahan_id", parseInt(data.results.id));

    setIsLoad(true);
    let barx = 0;
    const callupload = axios.post(
      `${API.HOST}/uploader/pertanahan/images`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          let bar = document.getElementById("bar");
          barx = Math.round((100 * data.loaded) / data.total);
          bar.style.width = barx + "%";
        },
      }
    );
    toast.promise(callupload, {
      loading: "Proses menyimpan gambar ...",
      success: (data) => {
        setIsLoad(false);
        if (data.data.status) {
          formik.resetForm();
          setImageFile(null);
          setImagePreview(null);
          dispatch(refresh());
          props.close();
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
        console.log(error);

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
      pToast,
    });
  };

  const fileChangeHandler = (event) => {
    if (event.target.files[0]) {
      setImageFile(event.target.files[0]);
      const size_in_mb = event.target.files[0].size / (1024 * 1024);
      // console.log(size_in_mb);

      if (size_in_mb > 10) {
        toast.error(
          "Maksimu ukuran gambar 10MB, ukuran gambar kamu " +
          size_in_mb.toFixed(2) +
          " MB",
          {
            style: {
              minWidth: "250px",
              border: "1px solid #FF4C4D",
              padding: "16px",
              color: "#000",
              marginBottom: "25px",
            },
            error: {
              duration: 3500,
            },
          }
        );
        return;
      }

      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
                Foto Pertanahan Baru
              </h2>
              <div className="absolute inset-y-0 right-0 pt-2">
                <IconButton onClick={() => props.close()} size="large">
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full p-5">
              <div className="grid grid-cols-1 ">
                <div className="m-2">
                  <header className="border-2 border-dashed border-slate-400 py-12 flex flex-col justify-center items-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="icon"
                        className="px-3 mx-auto object-cover h-60 w-full"
                      />
                    ) : (
                      <>
                        <div className="previewText image-container">
                          <br />
                          <br />
                          Image Files
                        </div>
                        <div className="text-sm">(.jpg/.jpeg/.png)</div>
                      </>
                    )}
                    <input
                      id="hidden-input"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => fileChangeHandler(event)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const hidden = document.getElementById("hidden-input");
                        hidden.click();
                      }}
                      className="mt-2 rounded-sm px-3 py-1 bg-slate-200 hover:bg-slate-300 focus:shadow-outline focus:outline-none"
                    >
                      Choose a file
                    </button>
                  </header>
                  <div className="bg-red-100 text-left p-3 m-1">
                    *Catatan <br />
                    -Direkomendasikan compress gambar dengan{" "}
                    <a
                      href="https://tinyjpg.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      tinyjpg.com
                    </a>
                    <br />
                    -maximum ukuran gambar 5MB <br />
                  </div>
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

              {isLoad ? (
                <div className="my-2 h-3 relative w-full rounded-full overflow-hidden">
                  <div className="w-full h-full bg-slate-200 absolute"></div>
                  <div
                    id="bar"
                    className="h-full bg-emerald-500 relative w-0"
                  ></div>
                </div>
              ) : null}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoad}
                startIcon={<i className="fa-solid fa-cloud-arrow-up"></i>}
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
                Simpan Foto
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
