 
 
import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/common/Input";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";

const PannelProposal = () => {
    const [open, setOpen] = useState(false);
    const [pannelData, setPannelData] = useState([]);

    const field = [
        {
            label: "Panel Type",
            name: "pannelType",
            type: "text",
            placeholder: "Enter panel type (DCR / Non-DCR)",
        },
    ];

    const api = { method: "post", url: "/createPannel" };

    const fetchPannelData = useCallback(async () => {
        toast.dismiss();
        try {
            const response = await apiCall("get", "/getPannelData");
            setPannelData(response?.data?.data || []);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Server error while fetching panel data"
            );
        }
    }, []);

    useEffect(() => {
        fetchPannelData();
    }, [fetchPannelData]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">
                    Panel Management
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                    + Add Panel
                </button>
            </div>

            {/* Panel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pannelData.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                        <p className="text-sm">No panels found</p>
                        <p className="text-xs mt-1">
                            Click{" "}
                            <span className="font-medium text-green-600">Add Panel</span> to
                            create one
                        </p>
                    </div>
                ) : (
                    pannelData.map((panel) => (
                        <div
                            key={panel._id}
                            className="p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition"
                        >
                            <h3 className="font-medium text-gray-800">
                                {panel.pannelType}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Panel configuration
                            </p>
                        </div>
                    ))
                )}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Add Panel
                        </h2>

                        
                        <Input
                            field={field}
                            apiData={api}
                            setOpen={setOpen}
                            refresh={fetchPannelData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PannelProposal;
