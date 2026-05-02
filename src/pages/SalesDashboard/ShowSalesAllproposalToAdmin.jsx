import React from "react";
import {
    User,
    FileText,
    Phone,
    Mail,
    CalendarDays,
    IndianRupee,
    Eye,
    ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowSalesAllproposalToAdmin = () => {
    const navigate = useNavigate();

    const dummyData = [
        {
            id: 1,
            salesPerson: "Seraj Ansari",
            email: "seraj@gmail.com",
            phone: "9876543210",
            comanyName: "Gautam Solar",
            totalRevenue: "₹4,50,000",
            lastProposalDate: "28 Apr 2026",
        },
        {
            id: 2,
            salesPerson: "Naveen Kumar",
            email: "naveen@gmail.com",
            phone: "9123456780",
            comanyName: "Gautam Solar",
            totalRevenue: "₹2,80,000",
            lastProposalDate: "26 Apr 2026",
        },
        {
            id: 3,
            salesPerson: "Manish Singh",
            email: "mainsh@gmail.com",
            phone: "9988776655",
            comanyName: "Gautam Solar",
            totalRevenue: "₹6",
            lastProposalDate: "30 Apr 2026",
        },
    ];

    const initalNameColor = [
        {
            bg: "from-[#FAECE7] to-[#F5C4B3]",
            avatar: "from-[#D85A30] to-[#993C1D]",
            stripe: "bg-[#D85A30]",
            ring: "ring-[#D85A30]/20",
            badge: "bg-[#FAECE7] text-[#993C1D]",
        },
        {
            bg: "from-[#E1F5EE] to-[#9FE1CB]",
            avatar: "from-[#1D9E75] to-[#0F6E56]",
            stripe: "bg-[#1D9E75]",
            ring: "ring-[#1D9E75]/20",
            badge: "bg-[#E1F5EE] text-[#0F6E56]",
        },
        {
            bg: "from-[#EEEDFE] to-[#CECBF6]",
            avatar: "from-[#7F77DD] to-[#534AB7]",
            stripe: "bg-[#7F77DD]",
            ring: "ring-[#7F77DD]/20",
            badge: "bg-[#EEEDFE] text-[#534AB7]",
        },
        {
            bg: "from-[#E6F1FB] to-[#B5D4F4]",
            avatar: "from-[#378ADD] to-[#185FA5]",
            stripe: "bg-[#378ADD]",
            ring: "ring-[#378ADD]/20",
            badge: "bg-[#E6F1FB] text-[#185FA5]",
        },
        {
            bg: "from-[#FBEAF0] to-[#F4C0D1]",
            avatar: "from-[#D4537E] to-[#993556]",
            stripe: "bg-[#D4537E]",
            ring: "ring-[#D4537E]/20",
            badge: "bg-[#FBEAF0] text-[#993556]",
        },
        {
            bg: "from-[#FAEEDA] to-[#FAC775]",
            avatar: "from-[#EF9F27] to-[#BA7517]",
            stripe: "bg-[#EF9F27]",
            ring: "ring-[#EF9F27]/20",
            badge: "bg-[#FAEEDA] text-[#854F0B]",
        },
    ];

    const initalsName = (salesPerson = "") =>
        salesPerson
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    return (
        <>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Sales Proposal Overview
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track all sales persons proposal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {dummyData.map((item, i) => {
                        const nameColors =
                            initalNameColor[i % initalNameColor.length];

                        console.log(nameColors.avatar);

                        return (
                            <div
                                key={item?.id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                            >
                                <div
                                    className={`p-5 border-b bg-linear-to-r ${nameColors.bg}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-14 h-14 rounded-full bg-linear-to-br ${nameColors.avatar}
    flex items-center justify-center text-white font-bold text-lg shadow-md`}
                                        >
                                            {item?.salesPerson ? (
                                                initalsName(item?.salesPerson)
                                            ) : (
                                                <User
                                                    className="text-orange-700"
                                                    size={24}
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800">
                                                {item.salesPerson}
                                            </h2>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                <Mail size={14} />
                                                {item.email}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                <Phone size={14} />
                                                {item.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FileText size={18} />
                                            <span>Compnay Name : </span>
                                        </div>

                                        <span className="font-bold text-gray-800">
                                            {item.comanyName}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <IndianRupee size={18} />
                                            <span>Total Revenue</span>
                                        </div>

                                        <span className="font-bold text-gray-800">
                                            {item.totalRevenue}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <CalendarDays size={18} />
                                            <span>Last Proposal</span>
                                        </div>

                                        <span className="text-sm font-medium text-gray-700">
                                            {item.lastProposalDate}
                                        </span>
                                    </div>

                                    <button className="w-full mt-3 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                                        <Eye size={18} />
                                        View Proposals
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ShowSalesAllproposalToAdmin;
