import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../services/api";
import GaloPanelCard from "../../components/common/GaloPanelCard";
import GaloInput from "../../components/common/GaloInput";
import { X } from "lucide-react";
import { BiLeftArrow } from "react-icons/bi";

const GaloConstructivePanel = () => {
    const location = useLocation();
    const panelId = location?.state?.data?.panelId;
    const panelName = location?.state?.panelName;
    const technologyId = location?.state?.data?._id;
    const technologyName = location?.state?.data?.technologyPanel;
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [constructiveData, setConstructiveData] = useState();

    const navigate = useNavigate();

    const field = [
        {
            label: "Panel Constructive",
            name: "constructiveType",
            type: "text",
            placeholder:
                "Enter panel constructive Type (glass-to-glass/glass-to-backsheet)",
        },
    ];

    const fetchData = async () => {
        toast.dismiss();
        try {
            const response = await apiCall(
                "get",
                "/api/galoAdmin/constructive",
                null,
                {
                    params: { technologyId },
                },
            );
            setConstructiveData(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                    "There have some server error. We are resolve your error please Wait..",
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = async (e, data) => {
        e.stopPropagation();
        toast.dismiss();
        const payload = {
            panelId,
            technologyId,
            id: data?._id,
            isActive: !data?.isActive,
        };
        try {
            const response = await apiCall(
                "patch",
                "/api/galoAdmin/constructive/toggle",
                { ...payload },
            );
            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchData();
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                    "There have some error in server, please wait we are resolve your error..",
            );
        }
    };

    const handleCreate = async (data) => {
        toast.dismiss();
        try {
            const response = await apiCall(
                "post",
                "/api/galoAdmin/constructive",
                {
                    constructiveType: data?.constructiveType,
                    panelId,
                    technologyId,
                },
            );
            toast.success(response?.data?.message);
            fetchData();
            setOpen(false);
        } catch (error) {
            console.log("error : ", error);
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    const handleOpenEdit = async (e, data) => {
        e.stopPropagation();
        setEdit(true);
        setUpdateData(data);
    };

    const UpdateConstructive = async (data) => {
        toast.dismiss();
        const payload = {
            panelId,
            technologyId,
            id: data?._id,
            constructiveType: data?.constructiveType,
        };
        try {
            const response = await apiCall(
                "put",
                "/api/galoAdmin/constructive",
                { ...payload },
            );
            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchData();
            }, 1000);
            setEdit(false);
        } catch (error) {
            console.log("Error : ", error);
            toast.error(
                error?.response?.data?.message ||
                    "There have some server error, please wait we are resolve your error..",
            );
        }
    };

    const handleNavigate = async (e, data) => {
        e.stopPropagation();
        navigate("/galo/admin/watt", { state: { data } });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Main container – Galo theme: white bg, yellow border & shadow */}
            <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-yellow-300 shadow-lg shadow-yellow-200/50">
                    <h1 className="text-xl font-semibold text-black">
                        Panel Constructive Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        + Add Constructive
                    </button>
                </div>

                {/* Technology info with go‑back button */}
                <div className="mb-6 bg-gray-50 border border-yellow-300 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-black">
                                {technologyName}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Technology Constructive configuration
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

                {/* Constructive cards – using GaloPanelCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {constructiveData?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Constructive found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-yellow-600">
                                    Add Constructive
                                </span>{" "}
                                to create one
                            </p>
                        </div>
                    ) : (
                        constructiveData?.map((constructive) => (
                            <GaloPanelCard
                                key={constructive?._id}
                                title={constructive?.constructiveType}
                                subtitle="Constructive Configuration"
                                active={constructive?.isActive}
                                onNavigate={(e) =>
                                    handleNavigate(e, constructive)
                                }
                                onEdit={(e) => handleOpenEdit(e, constructive)}
                                onToggle={(e) => handleToggle(e, constructive)}
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
                            Add Constructive
                        </h2>
                        <GaloInput
                            field={field}
                            onSubmit={handleCreate}
                            submitText="Add Constructive"
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
                            Update Constructive
                        </h2>
                        <GaloInput
                            field={field}
                            initialData={updateData}
                            onSubmit={UpdateConstructive}
                            submitText="Update Constructive"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaloConstructivePanel;
