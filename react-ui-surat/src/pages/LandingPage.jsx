import React, { useEffect } from "react";
import Hero from "../component/Hero";
import Activity from "../component/Activity";
import Footer from "../component/Footer";
// import Form from "../elements/form/form";
import NavbarMenu from "../component/NavbarMenu";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../utils/host.config";
import { eToast, wToast } from "../utils/toastCustom";
import { CircularProgress } from "@mui/material";
import AOS from 'aos'

const LandingPage = () => {

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
    AOS.refresh()
  }, []);

  const { data: blog, error: errorBlog } = useSWR(
    `${API.HOST}/user/blogs`,
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


  return (
    <>
      <NavbarMenu />
      {/* <Navbar /> */}
      <Hero />
      <section className="overflow-hidden text-gray-700">
        <div className="container px-5 py-2 mx-auto desktop:pt-12 desktop:px-10">
          <div className="flex flex-wrap">
            {!blog ? (
              <div>
                <CircularProgress />
              </div>
            ) : (
              blog?.results?.map((element, index) => (
                <div key={index} className="flex flex-wrap w-1/3">
                  <Activity data={element} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
