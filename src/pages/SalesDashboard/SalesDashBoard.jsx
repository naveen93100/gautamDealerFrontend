import React from "react";
import CreateSalesClient from "./CreateSalesClient";
import Header from "../../components/Header";

const SalesDashBoard = () => {
    return (
        <>
            <div className=" dont-print min-h-screen bg-linear-to-br from-red-50 via-orange-100 to-white">
                {/* <div
                    className="fixed top-0 left-0 w-full z-50 text-white shadow-xl"
                    style={{ backgroundColor: "#a20000" }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-4">
                  
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate">
                                Sales Dashboard
                            </h1>
                            <p className="text-xs sm:text-sm text-red-100 truncate">
                                Manage your sales proposals and clients
                            </p>
                        </div>

                     
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-xs sm:text-sm font-semibold">
                                    Welcome Back
                                </span>
                                <span className="text-xs text-red-100">
                                    Sales Executive
                                </span>
                            </div>

                            <button
                          
                                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-white/30 bg-red-600 hover:bg-red-700 hover:border-white/50 text-white font-semibold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                            >
                                
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.2}
                                    stroke="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h10.5m0 0l-3-3m3 3l-3 3"
                                    />
                                </svg>
                                <span className=" xs:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div> */}
                <Header />

                <div className="max-w-7.2xl mt-20  mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                    <CreateSalesClient />
                </div>
            </div>
        </>
    );
};

export default SalesDashBoard;
