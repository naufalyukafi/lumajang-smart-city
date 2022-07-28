import React from 'react'
import CardDetail from '../component/CardDetail'
import NavbarMenu from '../component/NavbarMenu'
import Footer from '../component/Footer'
import Card from '../component/Card'

const DetailBerita = () => {
    return (
        <div>
            <NavbarMenu />
            <p className='w-4/5 mx-auto font-bold desktop:text-3xl py-6 handphone:text-xl'>Bupati Lumajang Resmi Buka GERBAS TANI di Desa Kedungrejo</p>
            <div className="w-[80%] mx-auto grid grid-cols-1 handphone:grid-cols-1 laptop:grid-cols-2 gap-1 handphone:mb-5">
                <div className="rounded-md flex items-center justify-center w-[100%] items-start handphone:mb-5 laptop:w-[850px]" >
                    <div className="self-start handphone:mb-5">
                        <CardDetail />
                    </div>
                </div>
                <div className="rounded-md flex-col items-center laptop:justify-self-end laptop:justify-center handphone:justify-self-center w-[400px]">
                    <p className='my-3 text-2xl font-medium'>Berita Lainnya</p>
                    <div className="flex justify-center mb-5">
                        <Card />
                    </div>
                    <div className="flex justify-center mb-5">
                        <Card />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailBerita