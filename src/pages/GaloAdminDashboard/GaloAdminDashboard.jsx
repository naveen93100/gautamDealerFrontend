// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Context/AuthContext";
// import { apiCall } from "../../services/api";
// import toast from "react-hot-toast";
// import { X, Edit } from "lucide-react";
// import GaloInput from "../../components/common/GaloInput";
// import { useNavigate } from "react-router-dom";

// const GaloAdminDashboard = () => {
//     const { user } = useAuth();
//     const [salesList, setSalesList] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [editData, setEditData] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);

//     // Pagination state
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6); // fixed limit per page
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [hasNextPage, setHasNextPage] = useState(false);

//     const navigate = useNavigate();

//     const allFields = [
//         {
//             label: "Full Name",
//             name: "name",
//             type: "text",
//             placeholder: "Enter full name",
//         },
//         {
//             label: "Phone Number",
//             name: "phone",
//             type: "text",
//             placeholder: "Enter phone number",
//         },
//         {
//             label: "Password",
//             name: "password",
//             type: "password",
//             placeholder: "Enter password",
//         },
//     ];

//     const getFields = () => {
//         if (editData) {
//             return allFields.filter((f) => f.name !== "password");
//         }
//         return allFields;
//     };

//     const fetchSales = async (pageNum = page) => {
//         toast.dismiss();
//         try {
//             const res = await apiCall("get", "/api/galoAdmin/sales", null, {
//                 params: { page: pageNum, limit },
//             });
//             setSalesList(res?.data?.data || []);
//             setTotalRecords(res?.data?.totalRecord || 0);
//             setHasNextPage(res?.data?.hasNextPage || false);
//             setPage(pageNum);
//         } catch (error) {
//             toast.error(
//                 error?.response?.data?.message ||
//                     "Failed to load sales persons",
//             );
//         }
//     };

//     useEffect(() => {
//         fetchSales(1);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const handlePageChange = (newPage) => {
//         if (newPage < 1) return;
//         if (newPage > page && !hasNextPage) return;
//         fetchSales(newPage);
//     };

//     const handleCreate = async (data) => {
//         try {
//             const res = await apiCall(
//                 "post",
//                 "/api/galoAdmin/sales/create-account",
//                 {
//                     name: data.name,
//                     phone: data.phone,
//                     password: data.password,
//                 },
//             );
//             toast.success(res?.data?.message || "Account created successfully");
//             fetchSales(1);
//             setOpenModal(false);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Creation failed");
//         }
//     };

//     const handleUpdate = async (data) => {
//         try {
//             const res = await apiCall(
//                 "patch",
//                 `/api/galoAdmin/sales/update-account`,
//                 { salesId: editData._id, name: data.name, phone: data.phone },
//             );
//             toast.success(res?.data?.message);
//             fetchSales(page);
//             setOpenModal(false);
//             setEditData(null);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Update failed");
//         }
//     };

//     const handleToggle = async (id, currentStatus) => {
//         try {
//             const res = await apiCall(
//                 "patch",
//                 `/api/galoAdmin/sales/toggle-account`,
//                 {
//                     salesId: id,
//                     isActive: !currentStatus,
//                 },
//             );
//             toast.success(res?.data?.message);
//             fetchSales(page);
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Toggle failed");
//         }
//     };

//     const handleEdit = (item) => {
//         setEditData(item);
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setEditData(null);
//         setShowPassword(false);
//     };

//     const handleSubmit = (data) => {
//         if (editData) {
//             handleUpdate(data);
//         } else {
//             handleCreate(data);
//         }
//     };

//     return (
//         <div className="w-full p-4 sm:p-6 mx-auto">
//             <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-md shadow-yellow-300/50 p-6 sm:p-8">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-black">
//                             Sales Person List
//                         </h1>
//                         <p className="text-sm text-gray-600">
//                             Manage all sales persons in the system
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => {
//                             setEditData(null);
//                             setOpenModal(true);
//                         }}
//                         className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition w-full sm:w-auto"
//                     >
//                         + Add Sales Person
//                     </button>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="border-b-2 border-yellow-300">
//                                 <th className="py-3 px-4 text-sm font-semibold text-black">
//                                     Name
//                                 </th>
//                                 <th className="py-3 px-4 text-sm font-semibold text-black">
//                                     UserId
//                                 </th>
//                                 <th className="py-3 px-4 text-sm font-semibold text-black">
//                                     Phone
//                                 </th>

//                                 <th className="py-3 px-4 text-sm font-semibold text-black">
//                                     Actions
//                                 </th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {salesList.length === 0 ? (
//                                 <tr>
//                                     <td
//                                         colSpan="6"
//                                         className="text-center py-8 text-gray-500"
//                                     >
//                                         No sales persons found. Click{" "}
//                                         <span className="text-yellow-600 font-medium">
//                                             + Add Sales Person
//                                         </span>{" "}
//                                         to create one.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 salesList.map((item) => (
//                                     <tr
//                                         key={item._id}
//                                         className="border-b border-gray-100 hover:bg-gray-50 transition"
//                                     >
//                                         <td className="py-3 px-4 text-sm text-black">
//                                             {item.name}
//                                         </td>
//                                         <td className="py-3 px-4 text-sm text-black">
//                                             {item.userId}
//                                         </td>
//                                         <td className="py-3 px-4 text-sm text-gray-700">
//                                             {item.phone}
//                                         </td>
//                                         <td className="py-3 px-4 text-sm">
//                                             <button
//                                                 onClick={() => handleEdit(item)}
//                                                 className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded transition"
//                                                 title="Edit"
//                                             >
//                                                 <Edit size={16} />
//                                             </button>
//                                         <td className="py-3 px-4">
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() =>
//                                                         handleToggle(
//                                                             item._id,
//                                                             item.isActive,
//                                                         )
//                                                     }
//                                                     className={`px-3 py-1 text-xs font-medium rounded border transition ${
//                                                         item.isActive !== false
//                                                             ? "bg-green-50 text-green-600 border-green-300 hover:bg-green-600 hover:text-white"
//                                                             : "bg-yellow-50 text-yellow-600 border-yellow-300 hover:bg-yellow-600 hover:text-white"
//                                                     }`}
//                                                 >
//                                                     {item.isActive !== false
//                                                         ? "Active"
//                                                         : "Inactive"}
//                                                 </button>

//                                                 <button
//                                                     onClick={() =>
//                                                         navigate(
//                                                             "/galo/admin/admin-galo-proposal",
//                                                             {
//                                                                 state: {
//                                                                     salesId:
//                                                                         item._id,
//                                                                     name: item.name,
//                                                                     userId: item.userId,
//                                                                     phone: item.phone,
//                                                                 },
//                                                             },
//                                                         )
//                                                     }
//                                                     className="px-3 py-1 text-xs font-medium rounded border bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white transition"
//                                                 >
//                                                     View
//                                                 </button>
//                                             </div>
//                                         </td>
//                                         </td>

//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {salesList.length > 0 && (
//                     <div className="flex items-center justify-between mt-6 border-t border-yellow-200 pt-4">
//                         <div className="text-sm text-gray-600">
//                             Showing {(page - 1) * limit + 1} –{" "}
//                             {Math.min(page * limit, totalRecords)} of{" "}
//                             {totalRecords}
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() => handlePageChange(page - 1)}
//                                 disabled={page === 1}
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
//                                     page === 1
//                                         ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                         : "bg-black text-white border-black hover:bg-gray-800"
//                                 }`}
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={() => handlePageChange(page + 1)}
//                                 disabled={!hasNextPage}
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
//                                     !hasNextPage
//                                         ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                         : "bg-black text-white border-black hover:bg-gray-800"
//                                 }`}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Modal – Add / Edit Sales Person */}
//             {openModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                     <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300 animate-fadeIn">
//                         <button
//                             onClick={handleCloseModal}
//                             className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50 hover:text-yellow-800 transition"
//                         >
//                             <X size={20} />
//                         </button>
//                         <h2 className="text-lg font-semibold text-black mb-4">
//                             {editData
//                                 ? "Edit Sales Person"
//                                 : "Add Sales Person"}
//                         </h2>
//                         <GaloInput
//                             key={editData?._id || "new"}
//                             field={getFields()}
//                             initialData={editData || {}}
//                             onSubmit={handleSubmit}
//                             passwordVisibility={{
//                                 show: showPassword,
//                                 toggle: () => setShowPassword((prev) => !prev),
//                             }}
//                             submitText={editData ? "Update" : "Add"}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GaloAdminDashboard;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { apiCall } from "../../services/api";
import toast from "react-hot-toast";
import {
    X,
    Edit,
    Phone,
    IdCard,
    Users,
    ChevronRight,
    ChevronLeft,
    Plus,
} from "lucide-react";
import GaloInput from "../../components/common/GaloInput";
import { useNavigate } from "react-router-dom";

// Full class names are written out so Tailwind can detect them
const COLOR_PALETTE = [
    {
        card: "bg-red-50 border-red-200 hover:border-red-400",
        avatar: "bg-red-200 text-red-800",
    },
    {
        card: "bg-orange-50 border-orange-200 hover:border-orange-400",
        avatar: "bg-orange-200 text-orange-800",
    },
    {
        card: "bg-amber-50 border-amber-200 hover:border-amber-400",
        avatar: "bg-amber-200 text-amber-800",
    },
    {
        card: "bg-green-50 border-green-200 hover:border-green-400",
        avatar: "bg-green-200 text-green-800",
    },
    {
        card: "bg-teal-50 border-teal-200 hover:border-teal-400",
        avatar: "bg-teal-200 text-teal-800",
    },
    {
        card: "bg-blue-50 border-blue-200 hover:border-blue-400",
        avatar: "bg-blue-200 text-blue-800",
    },
    {
        card: "bg-purple-50 border-purple-200 hover:border-purple-400",
        avatar: "bg-purple-200 text-purple-800",
    },
    {
        card: "bg-pink-50 border-pink-200 hover:border-pink-400",
        avatar: "bg-pink-200 text-pink-800",
    },
];

// Same first letter always gives the same color
const getColorByName = (name = "") => {
    const code = name.trim().charAt(0).toUpperCase().charCodeAt(0);
    if (!code || code < 65 || code > 90) return COLOR_PALETTE[0];
    return COLOR_PALETTE[(code - 65) % COLOR_PALETTE.length];
};

const GaloAdminDashboard = () => {
    const { user } = useAuth();
    const [salesList, setSalesList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(6); // fixed limit per page
    const [totalRecords, setTotalRecords] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);

    const navigate = useNavigate();

    const totalPages = Math.max(Math.ceil(totalRecords / limit), 1);

    const allFields = [
        {
            label: "Full Name",
            name: "name",
            type: "text",
            placeholder: "Enter full name",
        },
        {
            label: "Phone Number",
            name: "phone",
            type: "text",
            placeholder: "Enter phone number",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter password",
        },
    ];

    const getFields = () => {
        if (editData) {
            return allFields.filter((f) => f.name !== "password");
        }
        return allFields;
    };

    const fetchSales = async (pageNum = page) => {
        toast.dismiss();
        try {
            setLoading(true);
            const res = await apiCall("get", "/api/galoAdmin/sales", null, {
                params: { page: pageNum, limit },
            });
            setSalesList(res?.data?.data || []);
            setTotalRecords(res?.data?.totalRecord || 0);
            setHasNextPage(res?.data?.hasNextPage || false);
            setPage(pageNum);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to load sales persons",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage > page && !hasNextPage) return;
        fetchSales(newPage);
    };

    const handleCreate = async (data) => {
        try {
            const res = await apiCall(
                "post",
                "/api/galoAdmin/sales/create-account",
                {
                    name: data.name,
                    phone: data.phone,
                    password: data.password,
                },
            );
            toast.success(res?.data?.message || "Account created successfully");
            fetchSales(1);
            setOpenModal(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Creation failed");
        }
    };

    const handleUpdate = async (data) => {
        try {
            const res = await apiCall(
                "patch",
                `/api/galoAdmin/sales/update-account`,
                { salesId: editData._id, name: data.name, phone: data.phone },
            );
            toast.success(res?.data?.message);
            fetchSales(page);
            setOpenModal(false);
            setEditData(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed");
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const res = await apiCall(
                "patch",
                `/api/galoAdmin/sales/toggle-account`,
                {
                    salesId: id,
                    isActive: !currentStatus,
                },
            );
            toast.success(res?.data?.message);
            fetchSales(page);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Toggle failed");
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditData(null);
        setShowPassword(false);
    };

    const handleSubmit = (data) => {
        if (editData) {
            handleUpdate(data);
        } else {
            handleCreate(data);
        }
    };

    const handleView = (item) => {
        navigate("/galo/admin/admin-galo-proposal", {
            state: {
                salesId: item._id,
                name: item.name,
                userId: item.userId,
                phone: item.phone,
            },
        });
    };

    return (
        <div className="w-full p-4 sm:p-6 mx-auto">
            <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-md shadow-yellow-300/50 p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black">
                            Sales Person List
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage all sales persons in the system
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditData(null);
                            setOpenModal(true);
                        }}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition w-full sm:w-auto"
                    >
                        <Plus size={16} />
                        Add Sales Person
                    </button>
                </div>

                {/* States */}
                {loading && salesList.length === 0 && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Loading...
                    </div>
                )}

                {!loading && salesList.length === 0 && (
                    <div className="py-10 text-center text-gray-500">
                        No sales persons found. Click{" "}
                        <span className="text-yellow-600 font-medium">
                            + Add Sales Person
                        </span>{" "}
                        to create one.
                    </div>
                )}

                {/* Cards */}
                {salesList.length > 0 && (
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 transition-opacity ${
                            loading ? "opacity-60" : "opacity-100"
                        }`}
                    >
                        {salesList.map((item) => {
                            const color = getColorByName(item.name);
                            const isActive = item.isActive !== false;

                            return (
                                <div
                                    key={item._id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleView(item)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.target === e.currentTarget &&
                                            (e.key === "Enter" || e.key === " ")
                                        ) {
                                            e.preventDefault();
                                            handleView(item);
                                        }
                                    }}
                                    className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer focus:outline-none ${color.card}`}
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <div
                                            className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-bold text-lg ${color.avatar}`}
                                        >
                                            {(item.name || "?")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-black truncate">
                                                {item.name}
                                            </p>
                                            <span
                                                className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                                    isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-200 text-gray-600"
                                                }`}
                                            >
                                                {isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(item);
                                            }}
                                            title="Edit"
                                            className="p-2 rounded-lg bg-white/70 text-yellow-600 hover:bg-yellow-500 hover:text-white transition shrink-0"
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-sm text-gray-700 flex-1">
                                        <p className="flex items-center gap-2">
                                            <IdCard
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.userId || "-"}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <Phone
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.phone || "-"}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <Users
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span>
                                                Total Clients:{" "}
                                                <span className="font-semibold text-black">
                                                    {item.totalClient ?? 0}
                                                </span>
                                            </span>
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggle(
                                                    item._id,
                                                    isActive,
                                                );
                                            }}
                                            className={`px-3 py-1 text-xs font-medium rounded border transition ${
                                                isActive
                                                    ? "bg-white text-green-600 border-green-300 hover:bg-green-600 hover:text-white"
                                                    : "bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-600 hover:text-white"
                                            }`}
                                        >
                                            {isActive
                                                ? "Deactivate"
                                                : "Activate"}
                                        </button>

                                        <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                                            View
                                            <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {salesList.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 border-t border-yellow-200 pt-4">
                        <div className="text-sm text-gray-600">
                            Showing {(page - 1) * limit + 1} –{" "}
                            {Math.min(page * limit, totalRecords)} of{" "}
                            {totalRecords}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1 || loading}
                                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium border transition ${
                                    page === 1 || loading
                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                        : "bg-black text-white border-black hover:bg-gray-800"
                                }`}
                            >
                                <ChevronLeft size={14} />
                                Previous
                            </button>

                            <span className="px-2 text-sm text-gray-600">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={!hasNextPage || loading}
                                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium border transition ${
                                    !hasNextPage || loading
                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                        : "bg-black text-white border-black hover:bg-gray-800"
                                }`}
                            >
                                Next
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal – Add / Edit Sales Person */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative border border-yellow-300 animate-fadeIn">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 p-2 rounded-full text-yellow-600 hover:bg-yellow-50 hover:text-yellow-800 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-black mb-4">
                            {editData
                                ? "Edit Sales Person"
                                : "Add Sales Person"}
                        </h2>
                        <GaloInput
                            key={editData?._id || "new"}
                            field={getFields()}
                            initialData={editData || {}}
                            onSubmit={handleSubmit}
                            passwordVisibility={{
                                show: showPassword,
                                toggle: () => setShowPassword((prev) => !prev),
                            }}
                            submitText={editData ? "Update" : "Add"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaloAdminDashboard;
