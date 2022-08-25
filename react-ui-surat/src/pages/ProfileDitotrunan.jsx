import React from 'react'
import Footer from '../component/Footer'
import NavbarMenu from '../component/NavbarMenu'

const ProfileDitotrunan = () => {
    return (
        <>
            <NavbarMenu />
            <div className="mx-auto desktop:p-8">
                <div className="grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 gap-4 w-[90%] mx-auto">
                    <div className=" laptop:h-64 grid gap-x-0 rounded-md handphone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2" data-aos="fade-down">
                        <h1>content</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProfileDitotrunan