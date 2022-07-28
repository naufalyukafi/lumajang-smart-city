import React from 'react'
import Button from '../elements/button/button'

const Activity = () => {
    return (
        <>
            <div className="p-4">
                <div className="h-full rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/blog.jpg?alt=media&token=271cb624-94d4-468d-a14d-455377ba75c2" alt="blog cover" />
                    <div className="p-1">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Judul</h1>
                        <div className="flex items-center flex-wrap ">
                            <a href="/" className="text-green-800 md:mb-1 lg:mb-0">
                                <p className="inline-flex items-center">Deskripsi</p>
                            </a>
                        </div>
                    </div>
                    <div className="float-right">
                        <Button className="bg-yellow-400 hover:bg-gray-800">Button</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activity