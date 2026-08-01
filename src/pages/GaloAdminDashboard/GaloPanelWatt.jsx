// pages/GaloAdminDashboard/GaloPanelWatt.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../services/api";
import { BiLeftArrow } from "react-icons/bi";
import GaloPanelCard from "../../components/common/GaloPanelCard";
import GaloInput from "../../components/common/GaloInput";
import { X } from "lucide-react";

const GaloPanelWatt = () => {
    const location = useLocation();
    const constructiveId = location?.state?.data?._id;
    const constructiveName = location?.state?.data?.constructiveType;
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updateData, setUpdateData] = useState();

    const field = [
        {
            label: "Panel Watt",
            name: "watt",
            type: "number",
            placeholder: "Enter panel watt (555, 666, ...)",
        },
    ];

    const fetchData = async () => {
        toast.dismiss();
        try {
            const apiData = await apiCall(
                "get",
                "/api/galoAdmin/panel-watt",
                {},
                {
                    params: { constructiveId },
                },
            );
            setData(apiData?.data?.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = async (e, panelWatt) => {
        e.stopPropagation();
        toast.dismiss();
        try {
            const payload = {
                _id: panelWatt?._id,
                isActive: !panelWatt?.isActive,
                constructiveId,
            };
            const api = await apiCall(
                "patch",
                "/api/galoAdmin/panel-watt/toggle",
                {},
                {
                    params: { ...payload },
                },
            );
            toast.success(api?.data?.message);
            setTimeout(() => {
                fetchData();
            }, 1500);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    const handleCreatePanelWatt = async (data) => {
        const formData = {
            panelId: location?.state?.data?.panelId,
            technologyId: location?.state?.data?.technologyId,
            constructiveId,
            watt: Number(data?.watt),
        };
        try {
            const apiData = await apiCall(
                "post",
                "/api/galoAdmin/panel-watt",
                formData,
            );
            toast.success(apiData?.data?.message);
            setOpen(false);
            setTimeout(() => {
                fetchData();
            }, 1000);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    const handleOpenEdit = (e, data) => {
        e.stopPropagation();
        setEdit(true);
        setUpdateData(data);
    };

    const handleEditPanelWatt = async (data) => {
        toast.dismiss();
        try {
            const apiData = await apiCall("put", "/api/galoAdmin/panel-watt", {
                id: data?._id,
                watt: data?.watt,
                constructiveId: data?.constructiveId,
            });
            toast.success(apiData?.data?.message);
            setEdit(false);
            setTimeout(() => fetchData(), 1000);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };
    return (
        <div className="p-6 space-y-6">
            {/* Main container – Galo theme */}
            <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-yellow-300 shadow-lg shadow-yellow-200/50">
                    <h1 className="text-xl font-semibold text-black">
                        Panel Watt Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        + Add Panel Watt
                    </button>
                </div>

                {/* Constructive info with go‑back button */}
                <div className="mb-6 bg-gray-50 border border-yellow-300 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-black">
                                {constructiveName}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Panel Watt configuration
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                                text-yellow-700 hover:text-black hover:bg-yellow-100
                                rounded-lg transition"
                        >
                            <BiLeftArrow className="text-base" />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Panel Watt cards – using GaloPanelCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Panel Watt found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-yellow-600">
                                    Add Panel Watt
                                </span>{" "}
                                to create one
                            </p>
                        </div>
                    ) : (
                        data?.map((panelWatt) => (
                            <GaloPanelCard
                                key={panelWatt?._id}
                                title={`${panelWatt?.watt} Watt`}
                                subtitle="Panel Watt Configuration"
                                active={panelWatt?.isActive}
                                onNavigate={null} // no navigation from this level
                                onEdit={(e) => handleOpenEdit(e, panelWatt)}
                                onToggle={(e) => handleToggle(e, panelWatt)}
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
                            Add Panel Watt
                        </h2>
                        <GaloInput
                            field={field}
                            onSubmit={handleCreatePanelWatt}
                            submitText="Add Panel Watt"
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
                            Edit Panel Watt
                        </h2>
                        <GaloInput
                            field={field}
                            onSubmit={handleEditPanelWatt}
                            initialData={updateData}
                            submitText="Edit Panel Watt"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaloPanelWatt;
