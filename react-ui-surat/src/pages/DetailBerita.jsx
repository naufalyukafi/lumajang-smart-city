import React, { useEffect } from "react";
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
import AOS from 'aos'

const DetailBerita = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    })
    AOS.refresh()
  }, []);

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
    //     <div class="flex flex-col lg:flex-row justify-center items-start bg-cyan-200">
    //   <div class="w-80 bg-amber-400 border-lime-300 m-3">01</div>
    //   <div class="basis-1/4 bg-amber-400 m-3">02</div>
    // </div>
    <>
      <NavbarMenu />
      <div className="flex flex-col items-start justify-center desktop:flex-row laptop:flex-col" data-aos="fade-down">

        <div className="desktop:m-2 tablet:m-2 handphone:mx-auto handphone:my-3 w-[90%] desktop:w-[50%]">
          <p className="max-w-6xl capitalize mx-auto font-bold desktop:text-3xl handphone:text-xl">
            {blog?.results?.title}
          </p>
          <CardDetail data={blog} />
        </div>

        <div className="desktop:m-2 tablet:m-2 handphone:mx-auto desktop:w-3/12 handphone:w-[90%] tablet:w-[90%] laptop:pl-6">

          {/* <div className="grid grid-cols-1 md:grid-cols-2"></div> */}
          <p className="laptop:mb-[3.7rem] tablet:mb-3 handphone:mb-2 text-2xl font-medium">Berita Lainnya</p>
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
    </>
  );
};

export default DetailBerita;
