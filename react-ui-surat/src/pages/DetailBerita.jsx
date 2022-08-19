import React from "react";
import CardDetail from "../component/CardDetail";
import NavbarMenu from "../component/NavbarMenu";
import Footer from "../component/Footer";
import Card from "../component/Card";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../utils/host.config";
import { eToast, wToast } from "../utils/toastCustom";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DetailBerita = () => {
  const params = useParams();
  const { data: blog, error: errorBlog } = useSWR(
    `${API.HOST}/blog/${params.slug}`,
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

  const { data: highlight, error: errorHighlight } = useSWR(
    `${API.HOST}/blogs/highlight`,
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

  if (errorHighlight) {
    swal({
      title: "Peringatan",
      text: errorHighlight.message,
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
          if (errorHighlight.status === 401) {
            window.location.reload();
          }
          break;
        default:
          return;
      }
    });
  }

  return (
    <div>
      <NavbarMenu />
      <p className="max-w-6xl capitalize mx-auto font-bold desktop:text-3xl mt-4 handphone:text-xl">
        {blog?.results?.title}
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 handphone:grid-cols-1 laptop:grid-cols-2 gap-1 handphone:mb-5">
        <div className="w-10/12 rounded-md handphone:mb-5 laptop:w-[850px]">
          <div className="self-start handphone:mb-5">
            <CardDetail data={blog} />
          </div>
        </div>
        <div className="w-full laptop:w-64 rounded-md flex-col items-center laptop:justify-self-end laptop:justify-center handphone:justify-self-center">
          <p className="my-3 text-2xl font-medium">Berita Lainnya</p>
          {!highlight ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            highlight?.results?.map((element, index) => (
              <div className="flex justify-center mb-5">
                <Card data={element} />
              </div>
            ))
          )}
          {/* <div className="flex justify-center mb-5">
            <Card />
          </div>
          <div className="flex justify-center mb-5">
            <Card />
          </div>
          <div className="flex justify-center mb-5">
            <Card />
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailBerita;
