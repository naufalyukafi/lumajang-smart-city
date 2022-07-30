import React, { useState } from "react";
import axios from 'axios'

const Form = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [photo, setPhoto] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [pekerjaan, setPekerjaan] = useState("")
    const [status_kependudukan, setStatusKependudukan] = useState("")
    const [alamat, setAlamat] = useState("")
    const [judul, setJudul] = useState("")
    const [status, setStatus] = useState("")
    const [message, setMessage] = useState("")

    const onChangeHandlerName = (e) => setName(e.target.value)
    const onChangeHandlerEmail = (e) => setEmail(e.target.value)
    const onChangeHandlerPhone = (e) => setPhone(e.target.value)
    const onChangeHandlerPhoto = (e) => setPhoto(e.target.value)
    const onChangeHandlerIdentitas = (e) => setIdentitas(e.target.value)
    const onChangeHandlerPekerjaan = (e) => setPekerjaan(e.target.value)
    const onChangeHandlerStatusKependudukan = (e) => setStatusKependudukan(e.target.value)
    const onChangeHandlerAlamat = (e) => setAlamat(e.target.value)
    const onChangeHandlerJudul = (e) => setJudul(e.target.value)
    const onChangeHandlerStatus = (e) => setStatus(e.target.value)
    const onChangeHandlerMessage = (e) => setMessage(e.target.value)

    const onSubmit = async () => {
        await axios.post('http://localhost:8000/api/v1/saran', {
            name,
            email,
            phone,
            photo,
            identitas,
            pekerjaan,
            status_kependudukan,
            alamat,
            judul,
            status,
            message,
        }).then(() => {
            console.log('success')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <form className="w-full content-start">
                <p className="font-bold uppercase text-center  py-2 px-4 rounded mb-4">Pengaduan Masyarakat</p>
                <div className="py-2 px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                        <div className="rounded-md flex items-center">
                            Nama Pelapor
                        </div>
                        <div className="rounded-md flex items-center justify-center">
                            <input value={name} onChange={(e) => onChangeHandlerName(e)} className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nama" />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <label for="warga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Status Kependudukan</label>
                    <select id="warga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={status_kependudukan} onChange={(e) => onChangeHandlerStatusKependudukan(e)}>Warga Ditotrunan</option>
                        <option value={status_kependudukan} onChange={(e) => onChangeHandlerStatusKependudukan(e)}>Bukan Warga Ditrotunan</option>
                    </select>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <label for="identitas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Identitias</label>
                    <select id="identitas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={identitas} onChange={(e) => onChangeHandlerIdentitas(e)}>KTP</option>
                        <option value={identitas} onChange={(e) => onChangeHandlerIdentitas(e)}>KK</option>
                        <option value={identitas} onChange={(e) => onChangeHandlerIdentitas(e)}>Pasport</option>
                    </select>
                </div>
                <div className="py-2 px-6 mx-auto">

                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Alamat</label>
                    <textarea value={alamat} onChange={(e) => onChangeHandlerAlamat(e)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>

                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                        <div className="rounded-md flex items-center">
                            Pekerjaan
                        </div>
                        <div className="rounded-md flex items-center justify-center">
                            <input value={pekerjaan} onChange={(e) => onChangeHandlerPekerjaan(e)} className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Pekerjaan" />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                        <div className="rounded-md flex items-center">
                            Email
                        </div>
                        <div className="rounded-md flex items-center justify-center">
                            <input value={email} onChange={(e) => onChangeHandlerEmail(e)} className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                        <div className="rounded-md flex items-center">
                            Phone
                        </div>
                        <div className="rounded-md flex items-center justify-center">
                            <input value={phone} onChange={(e) => onChangeHandlerPhone(e)} className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Phone" />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                        <div className="rounded-md flex items-center">
                            Judul
                        </div>
                        <div className="rounded-md flex items-center justify-center">
                            <input value={judul} onChange={(e) => onChangeHandlerJudul(e)} className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Isi Judul Keluhan" />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Pesan</label>
                    <textarea value={message} onChange={(e) => onChangeHandlerMessage(e)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="py-2 px-6 mx-auto">
                    <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Foto</label>
                    <input value={photo} onChange={(e) => onChangeHandlerPhoto(e)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                </div>
                <div className="py-2 px-6 mx-auto">
                    <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Status</label>
                    <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={status} onChange={(e) => onChangeHandlerStatus(e)}>Dirahasiakan</option>
                        <option value={status} onChange={(e) => onChangeHandlerStatus(e)}>Tidak Dirahasiakan</option>
                    </select>
                </div>
                <button onClick={onSubmit} type="submit" className="lg:mr-6 md:mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 laptop:float-right">Submit</button>
            </form>
        </>
    )
}

export default Form

// class Form extends React.Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             noPengaduan: '',
//             tgl: '',
//             keterangan: ''
//         }

//         this.onTitleChangeEvent = this.onTitleChangeEvent.bind(this)
//         this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
//     }

//     onTitleChangeEvent(e) {
//         this.setState((prevState) => {
//             return {
//                 ...prevState,
//                 keterangan: e.target.value
//             }
//         })
//     }

//     onSubmitEventHandler(event) {
//         event.preventDefault();
//         this.props.addNotes(this.state)
//     }

//     render() {

//         return (
//             <>

//                 <form className="w-full content-start">
//                     <p className="font-bold uppercase text-center  py-2 px-4 rounded mb-4">Pengaduan Masyarakat</p>
//                     <div className="py-2 px-6 mx-auto">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
//                             <div className="rounded-md flex items-center">
//                                 Nama Pelapor
//                             </div>
//                             <div className="rounded-md flex items-center justify-center">
//                                 <input className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nama" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <label for="warga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Status Kependudukan</label>
//                         <select id="warga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                             <option value="WargaDitotrunan">Warga Ditotrunan</option>
//                             <option value="BukanWargaDitrotunan">Bukan Warga Ditrotunan</option>
//                         </select>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <label for="identitas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Identitias</label>
//                         <select id="identitas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                             <option value="KTP">KTP</option>
//                             <option value="KK">KK</option>
//                             <option value="Pasport">Pasport</option>
//                         </select>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">

//                         <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Alamat</label>
//                         <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>

//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
//                             <div className="rounded-md flex items-center">
//                                 Pekerjaan
//                             </div>
//                             <div className="rounded-md flex items-center justify-center">
//                                 <input className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Pekerjaan" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
//                             <div className="rounded-md flex items-center">
//                                 Email
//                             </div>
//                             <div className="rounded-md flex items-center justify-center">
//                                 <input className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
//                             <div className="rounded-md flex items-center">
//                                 Phone
//                             </div>
//                             <div className="rounded-md flex items-center justify-center">
//                                 <input className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Phone" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Pesan</label>
//                         <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Foto</label>
//                         <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
//                     </div>
//                     <div className="py-2 px-6 mx-auto">
//                         <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Status</label>
//                         <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                             <option value="Dirahasiakan">Dirahasiakan</option>
//                             <option value="TidakDirahasiakan">Tidak Dirahasiakan</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="lg:mr-6 md:mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 laptop:float-right">Submit</button>
//                 </form>

//             </>
//         )
//     }
// }

// export default Form