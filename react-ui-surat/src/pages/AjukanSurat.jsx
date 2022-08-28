import React from 'react'
import Logo from "../assets/images/img-logo.png"
import Footer from '../component/Footer'
import NavbarMenu from '../component/NavbarMenu'

const AjukanSurat = () => {
    return (
        <>
            <NavbarMenu />
            <section className='flex items-center justify-center h-screen'>
                <div className="p-6 handphone:max-w-sm laptop:max-w-xl tablet:max-w-xl desktop::max-w-xl bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="brand flex items-center p-5 justify-evenly">
                        <img className="bg-contain h-36" src={Logo} alt="Logo" />
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white handphone:text-center">KABUPATEN LUMAJANG</h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 text-center dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, labore ducimus tempora mollitia culpa natus.</p>
                    <form>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</label>
                            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nama" required="" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">NIK</label>
                            <input type="number" id="nik" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='NIK' required="" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="pilihSurat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Pilih Surat</label>
                            <select id="pilihSurat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Surat 1">Surat 1</option>
                                <option value="Surat 2">Surat 2</option>
                                <option value="Surat 3">Surat 3</option>
                                <option value="Surat 4">Surat 4</option>13
                            </select>
                        </div>
                        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajukan Surat</button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default AjukanSurat