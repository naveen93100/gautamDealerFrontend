import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";
import GaloPanelCard from "../../components/common/GaloPanelCard";
import GaloInput from "./../../components/common/GaloInput";

const GaloPannelProposal = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [pannelData, setPannelData] = useState([]);
    const [updatePannelData, setUpdatePannelData] = useState();
    const navigate = useNavigate();

    const field = [
        {
            label: "Panel Type",
            name: "panelType",
            type: "text",
            placeholder: "Enter panel type (DCR / Non-DCR)",
        },
    ];

    const fetchPannelData = useCallback(async () => {
        toast.dismiss();
        try {
            const response = await apiCall("get", "/api/galoAdmin/panel");
            setPannelData(response?.data?.data || []);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Server error while fetching panel data",
            );
        }
    }, []);

    useEffect(() => {
        fetchPannelData();
    }, [fetchPannelData]);

    const handleCreatePanel = async (data) => {
        try {
            const res = await apiCall("post", "/api/galoAdmin/panel", data);
            toast.success(res.data.message);
            fetchPannelData();
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const handleUpdatePanel = async (data) => {
        try {
            const res = await apiCall("put", "/api/galoAdmin/panel", {
                _id: updatePannelData?._id,
                ...data,
            });
            toast.success(res.data.message);
            setTimeout(() => {
                fetchPannelData();
            }, 500);
            setEdit(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const handleEdit = async (e, panel) => {
        e.stopPropagation();
        setEdit(true);
        setUpdatePannelData(panel);
    };

    const handleToggle = async (e, panel) => {
        e.stopPropagation();
        toast.dismiss();
        const payload = {
            id: panel?._id,
            panelActive: !panel?.panelActive,
        };
        try {
            const response = await apiCall(
                "patch",
                "/api/galoAdmin/panel/toggle",
                payload,
            );
            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchPannelData();
            }, 1000);
        } catch (error) {
            console.log("Error : ", error);
            toast.error(error?.response?.data?.message || "Not Found");
        }
    };

    const handleNavigate = async (e, panel) => {
        e.stopPropagation();
        navigate("/galo/admin/tech", {
            state: { id: panel?._id, name: panel?.panelType },
        });
    };

    return (
        <div className="w-full px-4 py-5 sm:px-6 mx-auto">
            <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-yellow-300">
                    <h1 className="text-xl font-semibold text-black">
                        Panel Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        + Add Panel
                    </button>
                </div>

                {/* Panel Cards – using GaloPanelCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pannelData.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No panels found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-yellow-600">
                                    Add Panel
                                </span>{" "}
                                to create one
                            </p>
                        </div>
                    ) : (
                        pannelData.map((panel) => (
                            <GaloPanelCard
                                key={panel._id}
                                title={panel?.panelType}
                                subtitle="Panel configuration"
                                active={panel?.panelActive}
                                onNavigate={(e) => handleNavigate(e, panel)}
                                onEdit={(e) => handleEdit(e, panel)}
                                onToggle={(e) => handleToggle(e, panel)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn border border-yellow-300">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50 hover:text-yellow-800 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-black mb-4">
                            Add Panel
                        </h2>
                        <GaloInput
                            field={field}
                            onSubmit={handleCreatePanel}
                            submitText="Add Panel"
                        />
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {edit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn border border-yellow-300">
                        <button
                            onClick={() => setEdit(false)}
                            className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50 hover:text-yellow-800 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-black mb-4">
                            Update Panel
                        </h2>
                        <GaloInput
                            field={field}
                            initialData={updatePannelData}
                            onSubmit={handleUpdatePanel}
                            submitText="Update Panel"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaloPannelProposal;
