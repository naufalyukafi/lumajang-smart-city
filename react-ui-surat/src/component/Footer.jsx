import React from 'react'
import Twitter from '../assets/icons/ic-twitter.png'
import Facebook from '../assets/icons/ic-facebook.png'
import Instagram from '../assets/icons/ic-instagram.png'
import Youtube from '../assets/icons/ic-youtube.png'
import icLogo from '../assets/icons/ic-footer.png'

const Footer = () => {
    return (
        <footer className="bg-white rounded-lg md:px-6 md:py-8 dark:bg-gray-900 laptop:my-16 my-10">
            <div className="">
                <div className="grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-3 gap-4 lg:gap-8 justify-center handphone:items-center w-[90%] mx-auto">
                    <div className="rounded-md flex handphone:justify-center laptop:justify-start desktop:justify-start laptop:text-left">
                        <img src={icLogo} alt={icLogo} className="h-16" />
                    </div>
                    <div className="">
                    </div>
                    <div className="p-4 rounded-md text-right items-center handphone:justify-center lg:text-right handphone:text-center md:text-center">
                        <div className="flex justify-end mb-9 handphone:justify-center laptop:justify-end">
                            <a href="#twitter"><img src={Twitter} alt="" className='mx-2 w-9 h-9' /></a>
                            <a href="#instagram"><img src={Instagram} alt="" className='mx-2 w-9 h-9' /></a>
                            <a href="#facebook"><img src={Facebook} alt="" className='mx-2 w-9 h-9' /></a>
                            <a href="#youtube"><img src={Youtube} alt="" className='ml-2 w-9 h-9' /></a>
                        </div>
                        <div className='font-bold mt-2 handphone:text-center laptop:text-right'>Copyright © 2022 Lumajang Inc. All rights reserved.</div>
                    </div>
                </div>
            </div>
            {/* <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
            </span> */}
        </footer>

    )
}

export default Footer