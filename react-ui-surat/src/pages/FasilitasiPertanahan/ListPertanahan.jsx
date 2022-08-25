import React from "react";
import LayoutDashboard from "../../component/LayoutDashboard";
import { CircularProgress, Button } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../utils/host.config";
import moment from "moment";
import idLocale from "moment/locale/id";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

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

const ListPertanahan = () => {
  const navigate = useNavigate();

  const { data: pertanahans, error: errorPertanahan } = useSWR(
    `${API.HOST}/employe/fasilitasi-pertanahan`,
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
      <div className="w-full grid grid-cols-1 gap-4 min-h-screen">
        <div className="bg-white min-w-full shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                List Fasilitasi Pertanahan
              </h3>
              <span className="text-base font-normal text-gray-500">
                Selamat datang Naufal, berikut merupakan data fasilitasi
                pertanahan yang sudah anda buat.
              </span>
            </div>
            <div>
              <Button
                onClick={() => navigate("/pertanahan/new")}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Tambah Tanah
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
                        Nama Pemilik Tanah
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Alamat
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Waktu
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {!pertanahans ? (
                      <tr className="absolute inset-0 flex items-center justify-center">
                        <td>
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : (
                      pertanahans?.results?.map((element, i) => (
                        <tr
                          onClick={() => navigate(`/pertanahan/${element?.id}`)}
                          key={i}
                          className="cursor-pointer hover:border-2"
                        >
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            {element?.nama_pemilik_tanah}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 capitalize">
                            {element?.alamat}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                            {moment(element?.updated_date)
                              .local("id", idLocale)
                              .format("hh:mm - DD MMMM YYYY")}
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
    </LayoutDashboard>
  );
};

export default ListPertanahan;
