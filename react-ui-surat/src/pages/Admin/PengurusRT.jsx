import React from 'react'
import LayoutDashboard from '../../component/LayoutDashboard'

const PengurusRT = () => {
    return (
        <LayoutDashboard>
            <div className="w-full grid grid-cols-1 gap-4 min-h-screen">
            <div className="bg-white min-w-full shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">List Pegawai Pengurus RT</h3>
                            <span className="text-base font-normal text-gray-500">Berikut merupakan list pegawai Pengurus RT</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                            <div className="align-middle inline-block min-w-full">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nik
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal Lahir
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Alamat
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    RT
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    RW
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Jabatan
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Telp
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nomor SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal Akhir SK
                                                </th>
                                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Foto
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">1941720040</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">Naufal Yukafi Ridlo</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">1</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">2</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">asdfsdf</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">sdfgdsgsd</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">asdfsafd</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">asss</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">ggghh</td>
                       
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    )
}

export default PengurusRT