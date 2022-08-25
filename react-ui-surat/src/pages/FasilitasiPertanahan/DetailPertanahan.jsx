import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LayoutDashboard from "../../component/LayoutDashboard";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../utils/host.config";
import SwiperFotoPertanahan from "../../component/SwipperFotoPertanahan";

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
const DetailPertanahan = () => {
  const params = useParams();
  const navigate = useNavigate();
  const swiperCore = useRef(null);
  const { data: pertanahan, error: errorPertanahan } = useSWR(
    `${API.HOST}/fasilitasi-pertanahan/${params.id}`,
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
      onLoadingSlow: () => toast.error("Koneksi Anda Buruk", eToast),
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

  if (errorPertanahan) {
    swal({
      title: "Peringatan",
      text: errorPertanahan.message,
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
          if (errorPertanahan.status === 401) {
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
        {!pertanahan ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="bg-white min-h-25v mt-5 border-dashed p-5 w-full border-2  rounded-sm">
              <p className="font-semibold">Data Tanah</p>
              <div className="mt-5">
                {pertanahan && (
                  <SwiperFotoPertanahan data={pertanahan} swiperCore={swiperCore} />
                )}
              </div>
              <div className="mt-5">
                <div className="bg-white shadow-sm rounded-sm">
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Nama Petugas 1
                        </div>
                        <div className="px-4 py-2">
                          {pertanahan.results.nama_petugas_1}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Nama Petugas 2
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.nama_petugas_2}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Tanggal Ukur
                        </div>
                        <div className="px-4 py-2">
                          {pertanahan.results.tanggal_ukur}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Nama Pemilik Tanah
                        </div>
                        <div className="px-4 py-2">
                          {pertanahan.results.nama_pemilik_tanah}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">KTP</div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.no_ktp}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Nomor Kohir
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.nomor_kohir}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Nomor Persil
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.nomor_persil}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Alamat</div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.alamat}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Panjang Tanah
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.panjang_tanah}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Lebar Tanah
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.lebar_tanah}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Luas Tanah
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.luas_tanah}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Batas Utara
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.batas_utara}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Batas Selatan
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.batas_selatan}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Batas Barat
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.batas_barat}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Batas Timur
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.batas_timur}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Sebab Perubahan Status
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.sebab_perubahan_status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Tanggal Perubahan Status
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.tanggal_perubahan_status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          koordinat Denah
                        </div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.koordinat_utara}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">koordinat 1</div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.koordinat_selatan}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">koordinat 2</div>
                        <div className="px-4 py-2 capitalize">
                          {pertanahan.results.koordinat_timur}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">koordinat 3</div>
                      <div className="px-4 py-2 capitalize">
                        {pertanahan.results.koordinat_barat}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Keterangan</div>
                    <div className="px-4 py-2 capitalize">
                      {pertanahan.results.keterangan}
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

export default DetailPertanahan;
