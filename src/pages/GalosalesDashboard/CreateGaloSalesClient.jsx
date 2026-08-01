// import { useForm } from "react-hook-form";
// import { FiX } from "react-icons/fi";
// import { Loader2 } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../Context/AuthContext";
// import toast from "react-hot-toast";
// import axios from "axios";

// const CreateGaloSalesClient = ({
//     isOpen,
//     onClose,
//     onCreate,
//     onUpdate,
//     editData,
// }) => {
//     const {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         formState: { errors },
//     } = useForm();
//     const [loading, setLoading] = useState(false);
//     const { user } = useAuth();
//     const isEditing = !!editData;

//     if (!isOpen) return null;

//     useEffect(() => {
//         if (editData && isOpen) {
//             setValue("fullName", editData.fullName || "");
//             setValue("email", editData.email || "");
//             setValue("phone", editData.phone || "");
//             setValue("address", editData.address || "");
//             setValue("companyName", editData.companyName || "");
//             setValue("gstin", editData.gstin || "");
//         }
//     }, [editData, isOpen, setValue]);

//     const onSubmit = async (data) => {
//         try {
//             setLoading(true);

//             // Ensure the logged-in user has an _id
//             if (!user?._id) {
//                 toast.error("User ID not found. Please log in again.");
//                 return;
//             }

//             // Build the payload with correct field names and include galoSalesPersonId
//             const payload = {
//                 fullName: data.fullName,
//                 email: data.email,
//                 phone: data.phone,
//                 address: data.address,
//                 companyName: data.companyName,
//                 gstin: data.gstin,
//                 salesId: user._id,
//             };

//             const res = await axios.post(
//                 `${import.meta.env.VITE_SERVER_ADDRESS}/api/galoSales/create-galoclient`,
//                 payload,
//                 { withCredentials: true },
//             );

//             if (res?.data?.success) {
//                 // Notify parent and close
//                 onCreate(res.data.data);
//                 toast.success("Client created successfully!");
//                 reset();
//                 onClose();
//             } else {
//                 toast.error(res?.data?.message || "Failed to create client.");
//             }
//         } catch (er) {
//             toast.error(er?.response?.data?.message || er.message);
//             console.error("Create client error:", er);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleClose = () => {
//         reset();
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//             <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E8DDA0] overflow-hidden">
//                 {/* Header */}
//                 <div className="flex items-start justify-between bg-[#FFFCF0] border-b border-[#E8DDA0] px-6 py-5">
//                     <div>
//                         <h2 className="text-lg font-extrabold text-[#1a1a1a]">
//                             Add New Client
//                         </h2>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                             Fill in the details below
//                         </p>
//                     </div>
//                     <button
//                         onClick={handleClose}
//                         className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8DDA0] text-gray-500 hover:text-[#1a1a1a] transition-colors cursor-pointer"
//                     >
//                         <FiX />
//                     </button>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                         {/* Full Name */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 Full Name{" "}
//                                 <span className="text-red-600">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter full name"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("fullName", {
//                                     required: "Full name is required",
//                                 })}
//                             />
//                             {errors.fullName && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.fullName.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Email */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter email"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("email", {
//                                     pattern: {
//                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                         message: "Invalid email address",
//                                     },
//                                 })}
//                             />
//                             {errors.email && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.email.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Phone */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 Phone Number{" "}
//                                 <span className="text-red-600">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter mobile number"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("phone", {
//                                     required: "Phone number is required",
//                                 })}
//                             />
//                             {errors.phone && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.phone.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Address */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 Address <span className="text-red-600">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter address"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("address", {
//                                     required: "Address is required",
//                                 })}
//                             />
//                             {errors.address && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.address.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Company Name */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 Company Name{" "}
//                                 <span className="text-red-600">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter company name"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("companyName", {
//                                     required: "Company name is required",
//                                 })}
//                             />
//                             {errors.companyName && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.companyName.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* GST Number */}
//                         <div className="space-y-1.5">
//                             <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                                 GST Number{" "}
//                                 <span className="text-red-600">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter GST number"
//                                 className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
//                                 {...register("gstin", {
//                                     required: "GST number is required",
//                                 })}
//                             />
//                             {errors.gstin && (
//                                 <p className="text-xs text-red-600">
//                                     {errors.gstin.message}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center justify-end gap-3 mt-7">
//                         <button
//                             type="button"
//                             onClick={handleClose}
//                             className="px-6 py-2.5 rounded-xl border border-[#E8DDA0] text-sm font-bold text-gray-600 hover:bg-[#FFFCF0] transition-colors cursor-pointer"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FDC700] text-[#1a1a1a] text-sm font-bold border border-[#E8B800] hover:bg-[#f0bd00] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" size={16} />
//                             ) : (
//                                 "Create Client"
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateGaloSalesClient;




import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const CreateGaloSalesClient = ({
    isOpen,
    onClose,
    onCreate,
    onUpdate,
    editData,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const isEditing = !!editData;

    // Pre‑fill form when editData changes
    useEffect(() => {
        if (editData && isOpen) {
            setValue("fullName", editData.fullName || "");
            setValue("email", editData.email || "");
            setValue("phone", editData.phone || "");
            setValue("address", editData.address || "");
            setValue("companyName", editData.companyName || "");
            setValue("gstin", editData.gstin || "");
        }
    }, [editData, isOpen, setValue]);

    const handleClose = () => {
        reset();
        onClose();
    };

const onSubmit = async (data) => {
    try {
        setLoading(true);
        if (!user?._id) {
            toast.error("User ID not found. Please log in again.");
            return;
        }

        const basePayload = {
            phone: data.phone?.trim(),
            companyName: data.companyName?.trim(),
            gstin: data.gstin?.trim(),
            salesId: user._id,
        };
        if (data.fullName?.trim()) basePayload.fullName = data.fullName.trim();
        if (data.email?.trim()) basePayload.email = data.email.trim();
        if (data.address?.trim()) basePayload.address = data.address.trim();

        if (isEditing) {
            const payload = {
                ...basePayload,
                customerId: editData._id,
            };
            const res = await axios.patch(
                `${import.meta.env.VITE_SERVER_ADDRESS}/api/galoSales/update-galoclient`,
                payload,
                { withCredentials: true }
            );

            if (res?.data?.success) {
                toast.success("Client updated successfully!");
                // Build a complete client object with _id
                const updatedClient = { ...editData, ...basePayload };
                onUpdate?.(res.data.data || updatedClient);
                reset();
                onClose();
            } else {
                const errMsg = extractErrorMessage(res?.data?.message);
                toast.error(errMsg || "Update failed.");
            }
        } else {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_ADDRESS}/api/galoSales/create-galoclient`,
                basePayload,
                { withCredentials: true }
            );

            if (res?.data?.success) {
                toast.success("Client created successfully!");
                // Use server response, or fallback to a temp object if needed
                const newClient = res.data.data || { ...basePayload, _id: Date.now().toString() };
                onCreate?.(newClient);
                reset();
                onClose();
            } else {
                const errMsg = extractErrorMessage(res?.data?.message);
                toast.error(errMsg || "Create failed.");
            }
        }
    } catch (er) {
        console.error("Client operation error:", er);
        const errorData = er?.response?.data;
        if (errorData?.message) {
            const errMsg = extractErrorMessage(errorData.message);
            toast.error(errMsg);
        } else {
            toast.error(er?.message || "Something went wrong. Please try again.");
        }
    } finally {
        setLoading(false);
    }
};




    // Helper function to extract error messages from backend (string or array)
    const extractErrorMessage = (message) => {
        if (!message) return null;
        if (typeof message === "string") return message;
        if (Array.isArray(message)) {
            return message.map((item) => item.message || item).join(", ");
        }
        return "An error occurred.";
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E8DDA0] overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between bg-[#FFFCF0] border-b border-[#E8DDA0] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-extrabold text-[#1a1a1a]">
                            {isEditing ? "Edit Client" : "Add New Client"}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {isEditing
                                ? "Update the client details"
                                : "Fill in the details below"}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8DDA0] text-gray-500 hover:text-[#1a1a1a] transition-colors cursor-pointer"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name – optional */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("fullName")}
                            />
                        </div>

                        {/* Email – optional, but with format validation */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("email", {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone – required + pattern (10 digits) */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Phone Number{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 10-digit mobile number"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message:
                                            "Phone must be exactly 10 digits",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="text-xs text-red-600">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Address – optional */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Address
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("address")}
                            />
                        </div>

                        {/* Company Name – required */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Company Name{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter company name"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("companyName", {
                                    required: "Company name is required",
                                })}
                            />
                            {errors.companyName && (
                                <p className="text-xs text-red-600">
                                    {errors.companyName.message}
                                </p>
                            )}
                        </div>

                        {/* GST Number – required */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                GST Number{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter GST number"
                                className="w-full bg-[#FFFCF0] px-4 py-2.5 rounded-xl border border-[#E8DDA0] focus:outline-none focus:border-[#FDC700] text-sm"
                                {...register("gstin", {
                                    required: "GST number is required",
                                })}
                            />
                            {errors.gstin && (
                                <p className="text-xs text-red-600">
                                    {errors.gstin.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 mt-7">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2.5 rounded-xl border border-[#E8DDA0] text-sm font-bold text-gray-600 hover:bg-[#FFFCF0] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FDC700] text-[#1a1a1a] text-sm font-bold border border-[#E8B800] hover:bg-[#f0bd00] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={16} />
                            ) : isEditing ? (
                                "Update Client"
                            ) : (
                                "Create Client"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGaloSalesClient;
