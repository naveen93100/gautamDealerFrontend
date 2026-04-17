import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiCall } from '../../../services/api'
import { Link } from 'react-router-dom'


const adminDashboard = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await apiCall("get", "/adminPanel/adminDashBoardData");
                setData(apiData?.data?.data)

            } catch (error) {
                console.log(error?.response?.data?.message || "We are resolving your error...")
            }
        }
        fetchData();
    }, [])

    
    // console.log("data : ", data)
    return (
        <div className="w-full p-6">

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-medium text-red-700">Welcome to Admin Dashboard</h1>
                <div className="w-24 h-1 bg-red-700 rounded"></div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
               
                <Link to='dealer' state={{data:data?.dealerData}} className="w-full sm:w-64 border border-red-200 p-5 rounded-2xl shadow-md bg-red-100">
                    <p className="text-lg font-medium text-gray-600">Total Dealer</p>
                    <h2 className="text-3xl font-bold text-red-700 mt-1">{data?.dealerData?.length}</h2>
                </Link>


                <div className="w-full sm:w-64 border border-red-200 p-5 rounded-2xl shadow-md bg-red-100">
                    <p className="text-lg font-medium text-gray-600">Total Panel Technology</p>
                    <h2 className="text-3xl font-bold text-red-700 mt-1">{data?.pannelData?.length}</h2>
                </div>
            </div>
          
        </div>

    )
}

export default adminDashboard