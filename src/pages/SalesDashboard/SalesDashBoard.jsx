import React from "react";
import CreateSalesClient from "./CreateSalesClient";

const SalesDashBoard = () => {
    return (
        <>
            <div className=" dont-print min-h-screen bg-linear-to-br from-red-50 via-orange-100 to-white">
                <div className="max-w-7.2xl  mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                    <CreateSalesClient />
                </div>
            </div>
        </>
    );
};

export default SalesDashBoard;
