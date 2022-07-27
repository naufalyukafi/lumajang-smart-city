import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Activity from '../component/Activity'
import Footer from '../component/Footer'
import Form from '../elements/Form/Form'
import NavbarMenu from '../component/NavbarMenu'

const LandingPage = () => {
    return <>
        <NavbarMenu />
        {/* <Navbar /> */}
        <Hero />
        <div class="p-8 mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 w-[80%] mx-auto">
                <div class="p-4 rounded-md flex items-center justify-center">
                    <Activity />
                    <Activity />
                    <Activity />
                </div>
                <div class="p-4 rounded-md flex items-center justify-center">
                    <Form />
                </div>
            </div>
        </div>
        <Footer />
    </>
}

export default LandingPage