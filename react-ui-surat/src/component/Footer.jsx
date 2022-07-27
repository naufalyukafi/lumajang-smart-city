import React from 'react'
import Twitter from '../assets/icons/ic-twitter.png'
import Facebook from '../assets/icons/ic-facebook.png'
import Instagram from '../assets/icons/ic-instagram.png'
import Youtube from '../assets/icons/ic-youtube.png'

const Footer = () => {
    return (
        <footer class="bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
            <div class="">
                <div class="grid grid-cols-1 md:grid-cols-2 md:justify-center  lg:grid-cols-3 gap-4 lg:gap-8">
                    <div class="p-4 rounded-md items-center md:justify-center">
                        <p className='font-bold'>PEMERINTAH KABUPATEN LUMAJANG</p>
                        <p>Jalan Alun - Alun Utara No.7 Lumajang</p>
                        <p>Telp. 0334-881146-881255</p>
                    </div>
                    <div class="p-4 rounded-md items-center md:justify-center">
                        <p className='font-bold uppercase text-center'>Follow Us</p>
                        <div className="flex justify-center m-2">
                            <img src={Twitter} alt="" className='mx-2 w-11 h-11 ' />
                            <img src={Instagram} alt="" className='mx-2 w-11 h-11 ' />
                            <img src={Facebook} alt="" className='mx-2 w-11 h-11 ' />
                            <img src={Youtube} alt="" className='mx-2 w-11 h-11 ' />
                        </div>
                    </div>
                    <div class="p-4 rounded-md text-right items-center md:justify-center lg:text-right sm:text-center md:text-center">
                        <div>Anda Pengunjung Ke</div>
                        <div>118.780</div>
                        <div className='font-bold mt-2'>V 2022.1</div>
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