import { useEffect, useState } from "react";
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
import { apiCall } from "../../../services/api";

const Field = ({ fkey, label, placeholder, form, setForm, errors }) => {
    const hasError = errors[fkey];

    return (
        <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
                <span className="text-red-500 ml-1">*</span>
            </label>

            <input
                value={form[fkey] || ""}
                onChange={(e) =>
                    setForm((p) => ({ ...p, [fkey]: e.target.value }))
                }
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-white shadow-sm
        ${
            hasError
                ? "border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400"
        }`}
            />

            {hasError && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                    {hasError}
                </p>
            )}
        </div>
    );
};
const SalesPersonList = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [enabled, setEnabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [salesPerson, setSalesClients] = useState([]);

    console.log("Sales Clients State:", selectedClient);
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

    const createSalesAccount = async () => {
        try {
            const { name, email, phone, password } = form;
            const newErrors = {};
            if (!name.trim()) newErrors.name = "Name is required";
            if (!email.trim()) newErrors.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                newErrors.email = "Invalid email format";
            if (!phone.trim()) newErrors.phone = "Phone number is required";
            else if (!/^\d{10}$/.test(phone))
                newErrors.phone = "Phone number must be 10 digits";
            if (!password.trim()) newErrors.password = "Password is required";
            else if (password.length < 6)
                newErrors.password = "Password must be at least 6 characters";
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
            };

            const response = await apiCall(
                "POST",
                "/api/sales/create-account",
                payload,
            );

            console.log("API Response:", response);
            if (response?.data?.success) {
                toast.success("Sales person account created successfully!");
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            toast.error("Failed to create sales person account.");
        }
    };

    useEffect(() => {
        const fetchSalesClient = async () => {
            try {
                const responser = await apiCall("GET", "/api/sales");
                console.log("Sales Clients:", responser?.data);
                if (responser?.data?.success) {
                    setSalesClients(responser?.data?.data || []);
                }
            } catch (error) {
                console.error("Error fetching sales clients:", error);
            }
        };
        fetchSalesClient();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            setForm({
                name: selectedClient.name || "",
                email: selectedClient.email || "",
                phone: selectedClient.phone || "",
            });
        }
    }, [selectedClient]);

    const updateSalesAccount = async () => {
        try {
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                salesId: selectedClient._id,
            };
            const response = await apiCall(
                "PATCH",
                `/api/sales/update-account`,
                payload,
            );
            if (response?.data?.success) {
                toast.success("Sales person account updated successfully!");
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            toast.error("Failed to update sales person account.");
        }
    };

    const handleToggleActive = async (salesId, currentStatus) => {
        try {
            const response = await apiCall(
                "POST",
                `/api/sales/toggle-account`,
                { salesId, isActive: !currentStatus },
            );
            if (response?.data?.success) {
                toast.success(
                    `${response.data.message} successfully!`,
                );
                setSalesClients((prev) =>
                    prev.map((person) =>
                        person._id === salesId
                            ? { ...person, isActive: !currentStatus }
                            : person,
                    ),
                );
            }
        } catch (error) {
            toast.error("Failed to update sales person account.");
        }
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
                        {
                            salesPerson
                                .map((person, index) => (
                                    <tr
                                        key={index}
                                        className="border-t hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                                    <UserPlus
                                                        className="text-green-600"
                                                        size={18}
                                                    />
                                                </div>
                                                <span className="font-medium text-gray-800">
                                                    {person.name || "N/A"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail
                                                    className="text-blue-600"
                                                    size={18}
                                                />
                                                {person.email || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone
                                                    className="text-green-600"
                                                    size={16}
                                                />
                                                {person.phone || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedClient(person);
                                                    setIsEdit(true);
                                                    setShowModal(true);
                                                }}
                                                className="px-4 py-1.5 bg-blue-100 text-blue-600 cursor-pointer rounded-lg hover:bg-blue-200 transition font-medium"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleToggleActive(
                                                        person._id,
                                                        person.isActive,
                                                    )
                                                }
                                                className={`relative w-14 h-7 cursor-pointer rounded-full transition-all duration-300 ${
                                                    person.isActive
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                                                        person.isActive
                                                            ? "right-1"
                                                            : "left-1"
                                                    }`}
                                                ></span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                .slice(0, 5) /* Show only first 5 for demo */
                        }
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
                            className={`px-6 pt-6 pb-5 ${isEdit ? "bg-linear-to-br from-amber-50 to-orange-50" : "bg-linear-to-br from-[#FAECE7] to-[#F5C4B3]/40"}`}
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
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            />
                            <Field
                                fkey="email"
                                label="Email Address"
                                placeholder="Enter email"
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            />
                            <Field
                                fkey="phone"
                                label="Phone Number"
                                placeholder="Enter mobile number"
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            />
                            {/* if update then disable password field */}
                            {!isEdit && (
                                <Field
                                    fkey="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    form={form}
                                    setForm={setForm}
                                    errors={errors}
                                />
                            )}

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
                                    onClick={
                                        isEdit
                                            ? updateSalesAccount
                                            : createSalesAccount
                                    }
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                            transition-all duration-200 shadow-md active:scale-[0.97]
                            ${
                                isEdit
                                    ? "bg-linear-to-br from-amber-400 to-amber-600 shadow-amber-200 hover:shadow-amber-300 hover:shadow-lg"
                                    : "bg-linear-to-br from-[#D85A30] to-[#993C1D] shadow-[#D85A30]/30 hover:shadow-[#D85A30]/50 hover:shadow-lg"
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
