import React from 'react'
import Button from '../elements/button/button'

const Card = () => {
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img className='rounded-md' src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/blog.jpg?alt=media&token=271cb624-94d4-468d-a14d-455377ba75c2" alt="" />
            <a href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bupati Lumajang Resmi Buka GERBAS TANI di Desa Kedungrejo</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order...</p>
                <div className="grid justify-items-end">
                    <Button className="bg-yellow-400 hover:bg-gray-800 ">Selengkapnya</Button>
                </div>
            </div>
        </div>
    )
}

export default Card