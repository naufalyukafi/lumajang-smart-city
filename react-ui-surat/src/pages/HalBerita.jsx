import React from 'react'
import Card from '../component/Card'
import NavbarMenu from '../component/NavbarMenu'
import Footer from '../component/Footer'

const HalBerita = () => {
    return (
        <div>
            <NavbarMenu />
            {/* <ImageCard /> */}
            <p className='w-4/5 mx-auto font-bold desktop:text-3xl py-6 handphone:text-xl'>Kegiatan Terkini</p>
            <div className="w-4/5 mx-auto grid tablet:grid-cols-2 laptop:grid-cols-3 gap-4 lg:gap-8">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <Footer />
        </div>
    )
}

export default HalBerita