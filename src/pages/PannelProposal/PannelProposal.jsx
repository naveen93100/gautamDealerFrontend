
import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/common/Input";
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";
import PanelCard from "../../components/common/panelCard";

const PannelProposal = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false)
    const [pannelData, setPannelData] = useState([]);
    const [updatePannelData, setUpdatePannelData] = useState()
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
            const response = await apiCall("get", "/adminPanel/getPanel");
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

    const handleCreatePanel = async (data) => {
        try {
            const res = await apiCall("post", "/adminPanel/addPanel", data);
            toast.success(res.data.message);
            fetchPannelData();
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    const handleUpdatePanel = async (data) => {
        try {
            const res = await apiCall(
                "put",
                "/adminPanel/updatePanel",
                null,
                {
                    params: {
                        _id: updatePannelData._id,
                        ...data
                    }
                }
            );

            toast.success(res.data.message);
            setTimeout(() => {
                fetchPannelData()
            }, 500);
            setEdit(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };


    const handleEdit = async (e, panel) => {
        // console.log("data : ", e, panel)
        e.stopPropagation();
        setEdit(true);
        setUpdatePannelData(panel)
    }
    const handleToggle = async (e, panel) => {
        // console.log("panel : ", panel)
        e.stopPropagation();
        toast.dismiss();
        const payload = {
            id: panel?._id,
            panelActive: !panel?.panelActive
        }
        // console.log("payload: ", payload)
        try {
            const response = await apiCall("PUT", "/adminPanel/togglePanel", payload)

            // console.log(response?.data?.message)
            toast.success(response?.data?.message)
            setTimeout(() => {
                fetchPannelData()
            }, 1000);

        } catch (error) {
            console.log("Error : ", error);
            toast.error(error?.response?.data?.message || "Not Found")
        }

    };

    const handleNavigate = async (e, panel) => {
        // console.log("panel : ", panel)
        e.stopPropagation();
        navigate("/admin/panel/technology", { state: { id: panel?._id, name: panel?.panelType } })
    }

    return (
        // <div className="p-6 space-y-6">
        <div className="space-y-6 max-w-7xl mx-auto">

            <div className="space-y-6 border p-8 rounded-2xl shadow-md shadow-gray-500 ">
                <div className="flex items-center justify-between bg-gray-200 p-4 rounded-xl border">
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
                            // <div
                            //     key={panel._id}
                            //     onClick={(e) => handleNavigate(e, panel)}
                            //     className="p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition"
                            // >
                            //     <h3 className="font-medium text-gray-800">
                            //         {panel.panelType}
                            //     </h3>

                            //     <p className="text-xs text-gray-500 mt-1">
                            //         Panel configuration
                            //     </p>

                            //     {/* Buttons */}
                            //     <div className="mt-4 flex items-center gap-3">

                            //         <button
                            //             className="px-4 py-1.5 text-sm font-medium rounded-lgbg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white transition"
                            //             onClick={(e) => handleEdit(e, panel)}
                            //         >
                            //             Edit
                            //         </button>

                            //         <button
                            //             className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition
                            //        ${panel?.panelActive ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white" : "bg-green-50 text-green-600 border-green-200 hover:bg-green-600 hover:text-white"
                            //                 }`}
                            //             onClick={(e) => handleToggle(e, panel)}
                            //         >
                            //             {panel?.panelActive ? "InActive" : "Active"}
                            //         </button>
                            //     </div>
                            // </div>
                            <PanelCard
                                title={panel?.panelType}
                                subtitle=" Panel configuration"
                                key={panel._id}
                                panel={panel}
                                active={panel?.panelActive}
                                onNavigate={(e) => handleNavigate(e, panel)}
                                onEdit={(e) => handleEdit(e, panel)}
                                onToggle={(e) => handleToggle(e, panel)}
                            />
                        ))

                    )}
                </div>
            </div>
            {
                open && (
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
                                onSubmit={handleCreatePanel}
                                submitText="Add Panel"
                            />
                        </div>
                    </div>
                )
            }
            {
                edit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn">
                            <button
                                onClick={() => setEdit(false)}
                                className="absolute top-3 right-3 p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Update Panel
                            </h2>


                            <Input
                                field={field}
                                initialData={updatePannelData}
                                onSubmit={handleUpdatePanel}
                                submitText="Update Panel"
                            />
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default PannelProposal;
