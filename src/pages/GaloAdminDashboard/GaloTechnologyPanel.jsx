import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../services/api";
import GaloPanelCard from "../../components/common/GaloPanelCard";
import GaloInput from "../../components/common/GaloInput";
import { X } from "lucide-react";
import { BiLeftArrow } from "react-icons/bi";

const GaloTechnologyPanel = () => {
    const location = useLocation();
    const panelId = location?.state?.id;
    const panelName = location?.state?.name;
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    console.log("shwoing the panel id", panelId);
    const field = [
        {
            label: "Panel Technology",
            name: "technologyPanel",
            type: "text",
            placeholder: "Enter panel technology (mono/topcorn)",
        },
    ];
    const navigate = useNavigate();
    const [updateTechData, setUpdateTechData] = useState();
    const [technologyPanel, setTechnologyPanel] = useState();

    const fetchData = useCallback(async () => {
        try {
            const response = await apiCall(
                "get",
                "/api/galoAdmin/technology",
                null,
                {
                    params: { panelId },
                },
            );
            setTechnologyPanel(response?.data?.data);
        } catch (error) {
            console.log("Error : ", error);
            toast.error(
                error?.response?.data?.message ||
                    "There have some Server error, we are resolve the error please wait ..",
            );
        }
    }, [panelId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreateTech = async (data) => {
        toast.dismiss();
        try {
            const res = await apiCall("post", "/api/galoAdmin/technology", {
                ...data,
                panelId,
            });
            toast.success(res.data.message);
            fetchData();
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const handleOpenEdit = async (e, data) => {
        e.stopPropagation();
        setEdit(true);
        setUpdateTechData(data);
    };

    const handleUpdateTech = async (data) => {
        toast.dismiss();
        const payload = {
            panelId,
            _id: data?._id,
            technologyPanel: data?.technologyPanel,
        };
        try {
            const response = await apiCall("put", "/api/galoAdmin/technology", {
                ...payload,
            });
            toast.success(response?.data?.message);
            fetchData();
            setEdit(false);
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                    "There have some server error ,we are resolve your error please wait..",
            );
        }
    };

    const handleToggle = async (e, tech) => {
        e.stopPropagation();
        toast.dismiss();
        try {
            const payload = {
                panelId,
                id: tech?._id,
                isActive: !tech?.isActive,
            };
            const response = await apiCall(
                "patch",
                "/api/galoAdmin/technology/toggle",
                payload,
            );
            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchData();
            }, 500);
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                    "there have some server error , we are resolving your error please wait..",
            );
        }
    };

    const handleNavigate = async (e, tech) => {
        e.stopPropagation();
        navigate("/galo/admin/constructive", {
            state: { data: tech, panelName: panelName },
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Main container – Galo theme: white bg, yellow border & shadow */}
            <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 border border-yellow-300 rounded-xl shadow-lg shadow-yellow-200/50">
                    <h1 className="text-xl font-semibold text-black">
                        Panel Technology Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        + Add Technology
                    </button>
                </div>

                {/* Panel info with go‑back button */}
                <div className="mb-6 bg-gray-50 border border-yellow-300 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-black">
                                {panelName}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Panel technology configuration
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:text-black hover:bg-yellow-100 rounded-lg transition"
                        >
                            <BiLeftArrow className="text-base" />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Technology cards – using GaloPanelCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {technologyPanel?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Technology found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-yellow-600">
                                    Add Technology
                                </span>{" "}
                                to create one
                            </p>
                        </div>
                    ) : (
                        technologyPanel?.map((tech) => (
                            <GaloPanelCard
                                key={tech?._id}
                                title={tech?.technologyPanel}
                                subtitle="Technology Configuration"
                                active={tech?.isActive}
                                onNavigate={(e) => handleNavigate(e, tech)}
                                onEdit={(e) => handleOpenEdit(e, tech)}
                                onToggle={(e) => handleToggle(e, tech)}
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
                            Add Technology
                        </h2>
                        <GaloInput
                            field={field}
                            onSubmit={handleCreateTech}
                            submitText="Add Technology"
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
                            Update Technology
                        </h2>
                        <GaloInput
                            field={field}
                            initialData={updateTechData}
                            onSubmit={handleUpdateTech}
                            submitText="Update Technology"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaloTechnologyPanel;
