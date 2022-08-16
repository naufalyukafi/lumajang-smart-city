import React from 'react'

const LayoutDashboard = ({children}) => {
    return (
        <div id="main-content" className="h-full max-w-full bg-gray-50 relative overflow-y-auto laptop:ml-64">
            <main>
                <div className="pt-20 laptop:pt-6 px-4 mr-2 laptop:mr-4 ml-4">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default LayoutDashboard