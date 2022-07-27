import React from 'react'
import Button from '../elements/button/Button'

const Activity = () => {
    return (
        <>
            <div class="p-4 w-60 ">
                <div class="h-full rounded-lg overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/blog.jpg?alt=media&token=271cb624-94d4-468d-a14d-455377ba75c2" alt="blog cover" />
                    <div class="p-1">
                        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Judul</h1>
                        <div class="flex items-center flex-wrap ">
                            <a href="/" class="text-green-800 md:mb-1 lg:mb-0">
                                <p class="inline-flex items-center">Deskripsi</p>
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