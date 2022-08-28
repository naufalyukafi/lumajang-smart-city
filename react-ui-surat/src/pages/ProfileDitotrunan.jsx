import React from 'react'
import Footer from '../component/Footer'
import NavbarMenu from '../component/NavbarMenu'
import BarChart from './BarChart'
import Diagram from './Diagram'
import PieChart from './PieChart'

import useSWR from "swr";
import swal from "sweetalert";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../utils/host.config";
import { eToast, wToast } from "../utils/toastCustom";

const ProfileDitotrunan = () => {
    const { data: rts, error: errorRt } = useSWR(
        `${API.HOST}/laporan-kependudukan`,
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
        <>
            <NavbarMenu />
            <section className='w-[75%] mx-auto'>

                <p type="button" className="my-1 flex items-center justify-center w-full p-2 font-bold text-left text-gray-900 dark:text-gray-400 hover:bg-gray-300 bg-spruce dark:hover:bg-gray-800" aria-controls="accordion-collapse-body-1">
                    <span className='uppercase'>PROFILE RT / RW</span>
                </p>
                <p type="button" className="my-1 flex items-center justify-center w-full p-2 font-bold text-left text-gray-900 dark:text-gray-400 hover:bg-gray-300 bg-spruce dark:hover:bg-gray-800" aria-controls="accordion-collapse-body-1">
                    <span className='uppercase'>Kelurahan Ditotrunan</span>
                </p>
                <div className="pick my-5">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Pilih RT / RW</label>

                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue="RT" selected>RW 1</option>
                        <option defaultValue="US">RW 2</option>
                        <option defaultValue="CA">RW 3</option>
                        <option defaultValue="FR">RW 4</option>
                        <option defaultValue="DE">RW 5</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-1 laptop:grid-cols-2">
                    <div className="flex items-start justify-center">

                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="uppercase py-3 px-6 text-center" colSpan="3">
                                            Identitas Umum
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                            Nama RT / RW
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            RW 07
                                        </th>
                                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                            Satuan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!rts ? (
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                Nama Lurah / Ketua RW / Ketua RT
                                            </th>
                                            <td className="py-4 px-6">
                                                Sliver
                                            </td>
                                            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                                0
                                            </td>
                                        </tr>
                                    ) : (
                                        rts?.results.map((element, i) => (
                                            <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                    {element.RT}
                                                </th>
                                                <td className="py-4 px-6">
                                                    {element.id}
                                                </td>
                                                <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                                    {element.luas_wilayah}
                                                </td>
                                            </tr>
                                        ))
                                    )}

                                    {/* <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            Luas Wilayah
                                        </th>
                                        <td className="py-4 px-6">
                                            Black
                                        </td>
                                        <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                            0
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            Batas Wilayah
                                        </th>
                                        <td className="py-4 px-6">
                                            Gray
                                        </td>
                                        <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                            0
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="chart">
                        <div className="flex items-center justify-center rounded-md">
                            <div className="grid w-full grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2">
                                <div className="">
                                    <p className="font-bold uppercase text-center">penduduk berdasarkan jenis kelamin</p>
                                    <div className="h-56 justify-center flex">
                                        <Diagram />
                                    </div>
                                    <p className="font-bold uppercase text-center">penduduk</p>
                                </div>
                                <div className="">
                                    <p className="font-bold uppercase text-center">penduduk berdasarkan jenis usia</p>
                                    <div className="flex items-center justify-center">
                                        <PieChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=""> <BarChart f /></div>
                        <div className=""> <BarChart f /></div>
                        <div className=""> <BarChart f /></div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}

export default ProfileDitotrunan