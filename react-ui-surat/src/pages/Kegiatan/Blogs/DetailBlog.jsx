import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LayoutDashboard from "../../../component/LayoutDashboard";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../../utils/host.config";
import TextEditor from "../../../component/TextEditor";

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
const DetailBlog = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const { data: blog, error: errorBlog } = useSWR(
    `${API.HOST}/blog/${params.title}`,
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

  const onUpdateBlog = async (type) => {
    const dataSaveEdit = {
      status: type === 'publikasi' ? true : false,
      title: title,
      content: value,
    };

    await axios
      .put(`${API.HOST}/blog/${blog?.results?.idBlog}`, dataSaveEdit, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
      })
      .then((result) => {
        if (result.data.code === 200) {
          alert(result.data.message);
          navigate(-1)
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  React.useEffect(() => {
    if (blog) {
      setValue(blog.results.content);
      setTitle(blog.results.title);
    }
  }, [blog]);

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
        {!blog ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="bg-white min-h-25v mt-5 border-dashed p-5 w-full border-2 rounded-sm">
              <div className="flex min-w-full items-center gap-3 mb-3">
                <TextField
                  placeholder="Masukkan Judul Kegiatan"
                  variant="standard"
                  value={title}
                  className="w-[80%]"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button onClick={() => onUpdateBlog('simpan')} variant="contained" startIcon={<SaveIcon />}>
                  Simpan
                </Button>
                <Button onClick={() => onUpdateBlog('publikasi')} variant="contained" startIcon={<SendIcon />}>
                  Publikasi
                </Button>
              </div>
              <div className="mt-10">
                <TextEditor value={value} setValue={setValue} />
              </div>
            </div>
          </>
        )}
      </div>
    </LayoutDashboard>
  );
};

export default DetailBlog;
