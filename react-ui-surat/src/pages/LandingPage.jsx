import React from 'react'
import Hero from '../component/Hero'
import Activity from '../component/Activity'
import Footer from '../component/Footer'
import Form from '../elements/form/form'
import NavbarMenu from '../component/NavbarMenu'

const LandingPage = () => {
    return <>
        <NavbarMenu />
        {/* <Navbar /> */}
        <Hero />
        <div className="p-8 mx-auto">
            <div className="grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 gap-4 w-4/5 mx-auto">
                <div className=" laptop:h-64 grid gap-x-0 rounded-md flex items-start justify-center handphone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2">
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                    <Activity />
                </div>
                <div className="p-4 rounded-md flex items-center justify-center">
                    <Form />
                </div>
            </div>
        </div>
        <Footer />
    </>
}

export default LandingPage