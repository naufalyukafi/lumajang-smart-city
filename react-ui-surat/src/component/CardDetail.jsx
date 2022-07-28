import React from 'react'
import DetailBerita from '../assets/images/img-detail.jpg'

const CardDetail = () => {
    return (
        <div className="w-full bg-white rounded-lg dark:bg-gray-800">
            <p className='my-4'>24 Juli 2022 | Penulis Andika . Redaktur Anam</p>
            <a href="#">
                <img className="rounded-t-lg object-cover" src={DetailBerita} alt="" />
            </a>
            <div className="p-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">Bupati Lumajang Thoriqul Haq (Cak Thoriq) membuka kegiatan GERBAS TANI (Gerakan Belanja Sayuran di Lahan Petani), di Desa Kedungrejo Kecamatan Rowokangkung, Kabupaten Lumajang, Sabtu (23/7/2022).
                    <br /> GERBAS TANI digelar selama 3 hari, yakni mulai tanggal 23-25 Juli. Hal itu merupakan salah satu upaya Pemerintah Desa bersama petani dalam meningkatkan kesejahteraan petani. Dengan begitu, petani dapat berinteraksi langsung dengan pembeli, sekaligus menjadikan pembelajaran bagi petani dalam beragribisnis dan menjadikan desa agrowisata.
                    <br /> Dalam sambutannya, Cak Thoriq menyampaikan, bahwa Gerakan Belanja Sayuran di Lahan Petani merupakan ide yang menarik dan cemerlang, karena gerakan tersebut orisinil inovasi dari Desa Kedungrejo.
                </p>
            </div>
        </div>

    )
}

export default CardDetail