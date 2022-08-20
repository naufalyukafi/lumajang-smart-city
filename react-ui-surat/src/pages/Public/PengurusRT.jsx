import React from "react";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import API from "../../utils/host.config";
import { eToast, wToast } from "../../utils/toastCustom";
import LayoutDashboardUser from "../../component/LayoutDashboardUser";

const PengurusRT = () => {
  const { data: rts, error: errorRt } = useSWR(
    `${API.HOST}/pegawai/rt`,
    (url) =>
      axios(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("xtoken"),
        },
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

  if (errorRt) {
    swal({
      title: "Peringatan",
      text: errorRt.message,
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
          if (errorRt.status === 401) {
            window.location.reload();
          }
          break;
        default:
          return;
      }
    });
  }

  return (
    <LayoutDashboardUser>
      <div className="w-full grid grid-cols-1 gap-4 min-h-screen">
        <div className="bg-white min-w-full shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                List Pegawai Pengurus RT
              </h3>
              <span className="text-base font-normal text-gray-500">
                Berikut merupakan list pegawai Pengurus RT
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tanggal Lahir
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
                          RT
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          RW
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Jabatan
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nomor SK
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tanggal SK
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tanggal Akhir SK
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {!rts ? (
                        <tr className="absolute inset-0 flex items-center justify-center">
                          <td>
                            <CircularProgress />
                          </td>
                        </tr>
                      ) : (
                        rts?.results?.map((element, i) => (
                          <tr key={i}>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.nama}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.tanggal_lahir}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.alamat}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.RT}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.RW}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.jabatan}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.phone}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.nomor_sk}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.tanggal_sk}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {element?.tanggal_akhir_sk}
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
      </div>
    </LayoutDashboardUser>
  );
};

export default PengurusRT;
