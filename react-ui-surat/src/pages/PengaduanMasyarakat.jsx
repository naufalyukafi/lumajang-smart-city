import React from 'react'
import Footer from '../component/Footer'
import NavbarMenu from '../component/NavbarMenu'
import Form from '../elements/form/form'

const PengaduanMasyarakat = () => {
    return (
        <>
            <NavbarMenu />
            <section className='items-center desktop:w-[50%] laptop:w-[50%] mx-auto my-auto content-center py-12 handphone:w-[80%]'>
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 ">
                    <Form />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PengaduanMasyarakat