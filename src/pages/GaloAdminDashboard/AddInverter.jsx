// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { BiLeftArrow } from "react-icons/bi";
// import { X } from "lucide-react";
// import GaloPanelCard from "../../components/common/GaloPanelCard";
// import GaloInput from "../../components/common/GaloInput";
// import apiCall from "../../services/api";

// const AddInverter = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const constructiveId = location?.state?.data?._id;
//     const constructiveName = location?.state?.data?.constructiveType;
//     const panelId = location?.state?.data?.panelId;
//     const technologyId = location?.state?.data?.technologyId;

//     const [data, setData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [edit, setEdit] = useState(false);
//     const [updateData, setUpdateData] = useState(null);

//     const field = [
//         {
//             label: "Inverter Watt",
//             name: "inverterWatt",
//             type: "number",
//             placeholder: "Enter inverter watt (5, 7, 8 ...)",
//         },
//     ];

//     // Fetch existing inverters
//     const fetchData = async () => {
//         toast.dismiss();
//         try {
//             const apiData = await apiCall(
//                 "get",
//                 "/api/galoAdmin/inverter",
//                 {},
//                 { params: { constructiveId } },
//             );
//             setData(apiData?.data?.data || []);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error?.message);
//         }
//     };

//     useEffect(() => {
//         if (constructiveId) fetchData();
//     }, [constructiveId]);

//     // Create
//     const handleCreate = async (formData) => {
//         const payload = {
//             panelId,
//             technologyId,
//             constructiveId,
//             watt: Number(formData?.inverterWatt),
//         };
//         try {
//             const res = await apiCall(
//                 "post",
//                 "/api/galoAdmin/inverter",
//                 payload,
//             );
//             toast.success(res?.data?.message);
//             setOpen(false);
//             setTimeout(fetchData, 1000);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error?.message);
//         }
//     };

//     // Toggle
//     const handleToggle = async (e, inverter) => {
//         e.stopPropagation();
//         toast.dismiss();
//         try {
//             await apiCall(
//                 "patch",
//                 "/api/galoAdmin/inverter/toggle",
//                 {},
//                 {
//                     params: {
//                         _id: inverter._id,
//                         isActive: !inverter.isActive,
//                         constructiveId,
//                     },
//                 },
//             );
//             toast.success("Status updated");
//             setTimeout(fetchData, 1500);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error?.message);
//         }
//     };

//     // Edit
//     const handleEdit = async (formData) => {
//         toast.dismiss();
//         try {
//             await apiCall("put", "/api/galoAdmin/inverter", {
//                 id: updateData?._id,
//                 watt: formData?.inverterWatt,
//                 constructiveId,
//             });
//             toast.success("Updated successfully");
//             setEdit(false);
//             setTimeout(fetchData, 1000);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error?.message);
//         }
//     };

//     return (
//         <div className="p-6 space-y-6">
//             <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
//                 {/* Header */}
//                 <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-yellow-300 shadow-lg shadow-yellow-200/50">
//                     <h1 className="text-xl font-semibold text-black">
//                         Inverter Management
//                     </h1>
//                     <button
//                         onClick={() => setOpen(true)}
//                         className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
//                     >
//                         + Add Inverter
//                     </button>
//                 </div>

//                 {/* Constructive info */}

//                 {/* <div className="mb-6 bg-gray-50 border border-yellow-300 rounded-xl p-5 shadow-sm">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-xl font-semibold text-black">
//                                 {constructiveName}
//                             </h1>
//                             <p className="text-sm text-gray-600 mt-1">
//                                 Inverter configuration
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:text-black hover:bg-yellow-100 rounded-lg transition"
//                         >
//                             <BiLeftArrow className="text-base" />
//                             Go Back
//                         </button>
//                     </div>
//                 </div> */}

//                 {/* Cards - using GaloPanelCard */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {data.length === 0 ? (
//                         <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
//                             <p className="text-sm">No Inverters found</p>
//                             <p className="text-xs mt-1">
//                                 Click{" "}
//                                 <span className="font-medium text-yellow-600">
//                                     Add Inverter
//                                 </span>{" "}
//                                 to create one
//                             </p>
//                         </div>
//                     ) : (
//                         data.map((inv) => (
//                             <GaloPanelCard
//                                 key={inv._id}
//                                 title={`${inv.watt} Watt`}
//                                 subtitle="Inverter Configuration"
//                                 active={inv.isActive}
//                                 onNavigate={null}
//                                 onEdit={(e) => {
//                                     e.stopPropagation();
//                                     setEdit(true);
//                                     setUpdateData(inv);
//                                 }}
//                                 onToggle={(e) => handleToggle(e, inv)}
//                             />
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Create Modal */}
//             {open && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                     <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300">
//                         <button
//                             onClick={() => setOpen(false)}
//                             className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
//                         >
//                             <X size={20} />
//                         </button>
//                         <h2 className="text-lg font-semibold text-black mb-4">
//                             Add Inverter
//                         </h2>
//                         <GaloInput
//                             field={field}
//                             onSubmit={handleCreate}
//                             submitText="Add Inverter"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Edit Modal */}
//             {edit && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                     <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300">
//                         <button
//                             onClick={() => setEdit(false)}
//                             className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
//                         >
//                             <X size={20} />
//                         </button>
//                         <h2 className="text-lg font-semibold text-black mb-4">
//                             Edit Inverter
//                         </h2>
//                         <GaloInput
//                             field={field}
//                             onSubmit={handleEdit}
//                             initialData={updateData}
//                             submitText="Edit Inverter"
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddInverter;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import GaloPanelCard from "../../components/common/GaloPanelCard";
import { apiCall } from "../../services/api";

const AddInverter = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updateData, setUpdateData] = useState(null);

    // Simple form states
    const [newWatt, setNewWatt] = useState("");
    const [editWatt, setEditWatt] = useState("");

    // Fetch existing inverters
    const fetchData = async () => {
        toast.dismiss();
        try {
            const apiData = await apiCall("get", "/api/galoAdmin/inverter");
            console.log("Fetched Inverters:", apiData?.data?.data);
            setData(apiData?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Create
    const handleCreate = async (e) => {
        e.preventDefault();
        const payload = {
            inverterCapacity: newWatt,
        };
        try {
            const res = await apiCall(
                "post",
                "/api/galoAdmin/inverter",
                payload,
            );
            toast.success(res?.data?.message);
            setOpen(false);
            setNewWatt("");
            setTimeout(fetchData, 1000);
        } catch (error) {
            console.log(error.response?.data || error?.message);
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    // Toggle
    const handleToggle = async (e, inverter) => {
        e.stopPropagation();
        toast.dismiss();
        try {
            await apiCall(
                "patch",
                "/api/galoAdmin/inverter/toggle",
                {},
                {
                    params: {
                        id: inverter._id,
                    },
                },
            );
            toast.success("Status updated");
            setTimeout(fetchData, 1500);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    // Edit
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        try {
            await apiCall("put", "/api/galoAdmin/inverter", {
                id: updateData?._id,
                inverterCapacity: editWatt,
            });
            toast.success("Updated successfully");
            setEdit(false);
            setEditWatt("");
            setTimeout(fetchData, 1000);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    // Open edit modal and populate watt
    const openEditModal = (inv) => {
        setUpdateData(inv);
        setEditWatt(String(inv.inverterCapacity)); // pre‑fill
        setEdit(true);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="space-y-6 border-2 border-yellow-400 p-8 rounded-2xl shadow-md shadow-yellow-300/50 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-yellow-300 shadow-lg shadow-yellow-200/50">
                    <h1 className="text-xl font-semibold text-black">
                        Inverter Management
                    </h1>
                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        + Add Inverter
                    </button>
                </div>

                {/* Cards - using GaloPanelCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Inverters found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-yellow-600">
                                    Add Inverter
                                </span>{" "}
                                to create one
                            </p>
                        </div>
                    ) : (
                        data.map((inv) => (
                            <GaloPanelCard
                                key={inv._id}
                                title={`${inv.inverterCapacity} Watt`}
                                subtitle="Inverter Configuration"
                                active={inv.isActive}
                                onNavigate={null}
                                onEdit={(e) => {
                                    e.stopPropagation();
                                    openEditModal(inv);
                                }}
                                onToggle={(e) => handleToggle(e, inv)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300">
                        <button
                            onClick={() => {
                                setOpen(false);
                                setNewWatt("");
                            }}
                            className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-black mb-4">
                            Add Inverter
                        </h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Inverter Watt
                                </label>
                                <input
                                    type="number"
                                    value={newWatt}
                                    onChange={(e) => setNewWatt(e.target.value)}
                                    placeholder="Enter inverter watt (5, 7, 8 ...)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                            >
                                Add Inverter
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {edit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300">
                        <button
                            onClick={() => {
                                setEdit(false);
                                setEditWatt("");
                            }}
                            className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-black mb-4">
                            Edit Inverter
                        </h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Inverter Watt
                                </label>
                                <input
                                    type="number"
                                    value={editWatt}
                                    onChange={(e) =>
                                        setEditWatt(e.target.value)
                                    }
                                    placeholder="Enter inverter watt"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                            >
                                Edit Inverter
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddInverter;
