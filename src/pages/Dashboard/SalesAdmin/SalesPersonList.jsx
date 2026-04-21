import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Search,
    Pencil,
    UserPlus,
    X,
    Receipt,
    Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SalesPersonList = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedClient, setSelectedClient] = useState(null);
    const [enabled, setEnabled] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
        });
        setErrors({});
        setSelectedClient(null);
        setIsEdit(false);
    };

    const Field = ({ fkey, label, placeholder }) => {
        const hasError = errors[fkey];
        return (
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    {label}{" "}
                    <span className="text-red-500 normal-case tracking-normal text-sm">
                        *
                    </span>
                </label>
                <input
                    className={`w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 bg-gray-50 border
                        ${
                            hasError
                                ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/30"
                                : "border-gray-200 focus:border-[#D85A30] focus:ring-2 focus:ring-[#D85A30]/15 focus:bg-white"
                        }`}
                    placeholder={placeholder}
                    value={form[fkey]}
                    onChange={(e) => {
                        setForm((p) => ({ ...p, [fkey]: e.target.value }));
                        setErrors((p) => ({ ...p, [fkey]: "" }));
                    }}
                />
                {hasError && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {hasError}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center px-4 py-4 justify-between mb-5 border border-red-500 rounded-xl  shadow-md hover:shadow-lg transition-all duration-300">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Sales Person List
                    </h1>
                    <p className="text-slate-500 mt-1">
                        List of all sales persons in the system.
                    </p>
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    Add Sales Person
                </button>
            </div>

            {/* Showing the all sales persons list */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                            <th className="px-6 py-4 text-center">Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                        <UserPlus
                                            className="text-green-600"
                                            size={18}
                                        />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        John Doe
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="text-blue-600" size={18} />
                                    john.doe@example.com
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone
                                        className="text-green-600"
                                        size={16}
                                    />
                                    (123) 456-7890
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-medium">
                                    Edit
                                </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => setEnabled(!enabled)}
                                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                                        enabled ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                                            enabled ? "right-1" : "left-1"
                                        }`}
                                    ></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
                    style={{
                        background: "rgba(15,15,15,0.55)",
                        backdropFilter: "blur(6px)",
                    }}
                    onClick={(e) =>
                        e.target === e.currentTarget &&
                        (setShowModal(false), resetForm())
                    }
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
                        style={{
                            animation:
                                "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                    >
                        {/* Modal header */}
                        <div
                            className={`px-6 pt-6 pb-5 ${isEdit ? "bg-gradient-to-br from-amber-50 to-orange-50" : "bg-gradient-to-br from-[#FAECE7] to-[#F5C4B3]/40"}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-gray-800">
                                        {isEdit
                                            ? "Edit Sales Person"
                                            : "Add New Sales Person"}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {isEdit
                                            ? "Update sales person information"
                                            : "Fill in the details below"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center
                            text-gray-400 hover:text-gray-600 transition-all border border-gray-200/60"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Form body */}
                        <div className="w-full px-6 py-5">
                            <Field
                                fkey="name"
                                label="Full Name"
                                placeholder="Enter full name"
                            />
                            <Field
                                fkey="email"
                                label="Email Address"
                                placeholder="Enter email"
                            />
                            <Field
                                fkey="phone"
                                label="Phone Number"
                                placeholder="Enter mobile number"
                            />
                            <Field
                                fkey="password"
                                label="Password"
                                placeholder="Enter password"
                            />

                            <div className="flex gap-2.5 mt-2">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl
                            text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={isEdit ? "" : ""}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                            transition-all duration-200 shadow-md active:scale-[0.97]
                            ${
                                isEdit
                                    ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-200 hover:shadow-amber-300 hover:shadow-lg"
                                    : "bg-gradient-to-br from-[#D85A30] to-[#993C1D] shadow-[#D85A30]/30 hover:shadow-[#D85A30]/50 hover:shadow-lg"
                            }`}
                                >
                                    {isEdit
                                        ? "Update Sales Person"
                                        : "Create Sales Person"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesPersonList;
