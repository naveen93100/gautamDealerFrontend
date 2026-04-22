import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    FileText,
    Download,
    Pencil,
    Trash2,
    PanelsTopLeft,
    ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateSalesPanelProposal from "./CreateSalesPanelProposal";

const SalesClientPanelHistory = () => {
    const [createSalesPanelProp, setCreateSalesPanelProp] = useState(false);

    const [selectSales, setSelectSales] = useState(null);
    const navigate = useNavigate();
    const bgColor = "#a20000";

    const proposals = [
        {
            id: 1,
            type: "Panel Proposal",
            date: "4/16/2026, 3:24:53 PM",
        },
        {
            id: 2,
            type: "Panel Proposal",
            date: "4/17/2026, 6:38:25 PM",
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-white pb-10">
            {/* Header */}
            <div
                className="fixed top-0 left-0 w-full z-50 text-white shadow-xl"
                style={{ backgroundColor: bgColor }}
            >
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Client Panel Proposal
                        </h1>
                        <p className="text-sm text-red-100">
                            Proposal Summary & Details
                        </p>
                    </div>

                    <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-2xl">
                        <p className="text-xs text-red-100">Client Name</p>
                        <p className="text-xl font-semibold">Naveen Kumar</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="pt-30 max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#a20000] hover:bg-red-800 text-white px-5 py-3 rounded-xl shadow-md transition-all"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                        <button
                            onClick={() => {
                                setSelectSales(null);
                                setCreateSalesPanelProp(true);
                            }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#a20000] hover:bg-red-800 text-white px-5 py-3 rounded-xl shadow-md transition-all"
                        >
                            <PanelsTopLeft size={18} />
                            Create Panel Proposal
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-1 gap-5 mb-8">
                        <div className="bg-[#a20000] text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
                            <h2 className="text-lg font-semibold mb-4">
                                Panel Proposals
                            </h2>

                            <p className="text-5xl font-bold">2</p>
                            <p className="text-red-100 mt-2">
                                Total Created Proposals
                            </p>

                            <PanelsTopLeft
                                className="absolute right-5 top-5 opacity-20"
                                size={40}
                            />
                        </div>
                    </div>

                    {/* Proposal List */}
                    <div className="space-y-5">
                        {proposals.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                    {/* Left */}
                                    <div>
                                        <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                                            <FileText
                                                className="text-red-600"
                                                size={20}
                                            />
                                            Proposal Type:
                                            <span className="text-[#a20000]">
                                                {item.type}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-3">
                                            Date: {item.date}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3">
                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-400 text-red-600 hover:bg-red-50 font-medium">
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-orange-400 text-orange-600 hover:bg-orange-50 font-medium">
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-400 text-blue-600 hover:bg-blue-50 font-medium">
                                            <Download size={16} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {createSalesPanelProp && (
                        <CreateSalesPanelProposal
                            onClose={() => setCreateSalesPanelProp(false)}
                            // proposalData={fetchProposal}
                            // data={select}
                            // setData={setSelect}
                            // customerId={customerId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesClientPanelHistory;
