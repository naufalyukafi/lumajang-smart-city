import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LayoutDashboard from "../../component/LayoutDashboard";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../utils/host.config";
import moment from "moment";
import idLocale from "moment/locale/id";

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
const DetailAduan = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: saran, error: errorSaran } = useSWR(
    `${API.HOST}/saran/${params.id}`,
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

  if (errorSaran) {
    swal({
      title: "Peringatan",
      text: errorSaran.message,
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
          if (errorSaran.status === 401) {
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
      <div className="w-full min-h-screen">
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
        >
          Kembali
        </Button>
        {!saran ? (
            <div className="absolute inset-0 flex items-center justify-center">
                <CircularProgress />
            </div>
        ) : (
          <>
            <div className="bg-white min-h-25v mt-5 border-dashed p-5 w-full border-2 rounded-sm">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-semibold capitalize">
                  {saran.results.judul}
                </h1>
                <p className="bg-blue-600 text-white p-2 pl-6 pr-6 rounded-full">Kontak Masuk</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-semibold">{saran.results.email}</h1>
                  <span className="capitalize">
                    (status: {saran.results.status})
                  </span>
                </div>
                <div>
                  <p>
                    {moment(saran?.results.updated_date)
                      .local("id", idLocale)
                      .format("hh:mm - DD MMMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <p>{saran.results.message}</p>
              </div>
            </div>
            <div className="bg-white min-h-25v mt-5 border-dashed p-5 w-full border-2  rounded-sm">
              <p className="font-semibold">Data Pengirim</p>
              <div className="mt-5">
                <div className="bg-white shadow-sm rounded-sm">
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Identitas (NIK/NPWP)
                        </div>
                        <div className="px-4 py-2">
                          {saran.results.identitas}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Nama</div>
                        <div className="px-4 py-2 capitalize">
                          {saran.results.nama}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-blue-800"
                            href={`mailto:${saran.results.email}`}
                          >
                            {saran.results.email}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">No. Hp</div>
                        <div className="px-4 py-2">{saran.results.phone}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Status Kependudukan
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {saran.results.status_kependudukan}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Alamat</div>
                        <div className="px-4 py-2 capitalize">
                          {saran.results.alamat}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Pekerjaan</div>
                        <div className="px-4 py-2 capitalize">
                          {saran.results.pekerjaan}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </LayoutDashboard>
  );
};

export default DetailAduan;
