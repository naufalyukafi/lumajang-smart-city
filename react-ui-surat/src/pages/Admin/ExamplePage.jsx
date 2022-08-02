import React from 'react'
import LayoutDashboard from '../../component/LayoutDashboard'

const ExamplePage = () => {
    return (
        <LayoutDashboard>
            <div className="w-full grid grid-cols-1 laptop:grid-cols-2 gap-4 min-h-screen">
                <h1>Contoh halaman ExamplePage</h1>
            </div>
        </LayoutDashboard>
    )
}

export default ExamplePage