import { ArrowLeft, Download } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PanelPropsalView = () => {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col gap-6 bg-gray-200 ">
            <div className=''>
                <button
                    onClick={() => navigate(-1)}
                    className=" fixed bottom-6 left-18 z-50 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 print:hidden  "
                >
                    <ArrowLeft /> Go Back
                </button>
                <button
                    onClick={() => window.print()}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 print:hidden"
                >
                    <Download className="w-5 h-5" />
                    Download
                </button>
            </div>


        </div>
    )
}
 


export default PanelPropsalView