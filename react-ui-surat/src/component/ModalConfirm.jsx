import React, { useState } from 'react'
import axios from 'axios';
import { refresh } from "../redux/counterSlice";
import { useDispatch } from "react-redux";

const ModalConfirm = ({ open, setOpen, data }) => {
    const [onProses, setonProses] = useState(false);
    const dispatch = useDispatch();

    const onVerifikasi = async (type) => {
        if (onProses) return;
        setonProses(true);
        await axios.post(`http://localhost:8000/api/v1/auth/verifikasi/${data?.id}`, {
            status: type
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("xtoken"),
            },
        }).then(data => {
            setonProses(false);
            console.log(data)
            if (data.data.status === true) {
                dispatch(refresh());
                alert(data.data.message)
            } else {
                alert(data.data.message)
            }

        }).catch(err => {
            setonProses(false);
            console.error(err)
        })
    }

    const handleVerifikasi = (type) => {
        setOpen()
        onVerifikasi(type)
    }

    return (
        <div className={`${open !== true && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex justify-center align-middle items-center`}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={setOpen} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="p-6 text-center">
                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda ingin verifikasi akun {data.email} ini?</h3>
                        <button onClick={() => handleVerifikasi("verifikasi")} type="button" className="text-white mr-4 bg-green-600 hover:bg-green-800  focus:ring-4 focus:outline-none  rounded-lg border focus:ring-green-300 dark:focus:ring-green-800 border-gray-200 text-sm font-medium px-5 py-2.5 e focus:z-10 ">Verifikasi</button>
                        <button onClick={() => handleVerifikasi("tolak")} type="button" className="text-white bg-red-600 hover:bg-red-800  focus:ring-4 focus:outline-none  rounded-lg border focus:ring-red-300 dark:focus:ring-red-800 border-gray-200 text-sm font-medium px-5 py-2.5 e focus:z-10 ">Tolak</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm