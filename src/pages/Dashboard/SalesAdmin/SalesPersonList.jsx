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
    FileText,
    Users,
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
    const navigate = useNavigate();

    // console.log("show sales detials", { salesPerson });

    // console.log("Sales Clients State:", selectedClient);
    const [form, setForm] = useState({
        name: "",
        // email: "",
        // userid: "",
        phone: "",
        password: "",
    });

    const resetForm = () => {
        setForm({
            name: "",
            // email: "",
            // userid: "",
            phone: "",
            password: "",
        });
        setErrors({});
        setSelectedClient(null);
        setIsEdit(false);
    };

    const createSalesAccount = async () => {
        try {
            const { name, phone, password } = form;
            const newErrors = {};
            if (!name || !name.trim()) newErrors.name = "Name is required";
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
                // email: form.email,
                // : form.userid,
                phone: form.phone,
                password: form.password,
            };

            const response = await apiCall(
                "POST",
                "/api/sales/create-account",
                payload,
            );

            if (response?.data?.success) {
                toast.success("Sales person account created successfully!");
                fetchSalesClient();
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create sales person account.");
        }
    };

    const fetchSalesClient = async () => {
        try {
            const responser = await apiCall("GET", "/api/sales");

            if (responser?.data?.success) {
                setSalesClients(responser?.data?.data || []);
            }
        } catch (error) {
            console.error("Error fetching sales clients:", error);
        }
    };

    useEffect(() => {
        fetchSalesClient();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            setForm({
                name: selectedClient.name || "",
                // email: selectedClient.email || "",
                // userid: selectedClient.userid || "",
                phone: selectedClient.phone || "",
            });
        }
    }, [selectedClient]);

    const updateSalesAccount = async () => {
        try {
            const payload = {
                name: form.name,
                // email: form.email,
                // userid: form.userid,
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
                toast.success(`${response.data.message} successfully!`);
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
                            {/* <th className="px-6 py-4">Email</th> */}
                            <th className="px-6 py-4">User Id</th>
                            <th className="px-6 py-4">Phone</th>

                            <th className="px-6 py-4 text-center">Actions</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            salesPerson.map((person, index) => (
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
                                    {/* <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail
                                                    className="text-blue-600"
                                                    size={18}
                                                />
                                                {person.email || "N/A"}
                                            </div>
                                        </td> */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users
                                                className="text-blue-600"
                                                size={18}
                                            />
                                            {/* {person.email || "N/A"} */}
                                            {person.userId || "N/A"}
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

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedClient(person);
                                                    setIsEdit(true);
                                                    setShowModal(true);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 font-medium cursor-pointer shadow-sm"
                                            >
                                                <Pencil size={16} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/admin/sales-client/${person?._id}`,
                                                    );
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-all duration-200 font-medium cursor-pointer shadow-sm"
                                            >
                                                <FileText size={16} />
                                                Show Proposals
                                            </button>
                                        </div>
                                    </td>

                                    {/*  */}
                                    <td className="px-6 py-4 text-center">
                                        {person?.isActive ? (
                                            <div className="flex text-green-600  bg-green-100 p-1 rounded-md gap-2 items-center font-medium">
                                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 bg-gray-200 p-1 rounded-md text-gray-500 font-medium">
                                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                                Inactive
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <button
                                            role="switch"
                                            aria-checked={person.isActive}
                                            onClick={() =>
                                                handleToggleActive(
                                                    person._id,
                                                    person.isActive,
                                                )
                                            }
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${
                                                person.isActive
                                                    ? "bg-green-600 shadow-inner"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-300 ${
                                                    person.isActive
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            // .slice(0, 5)
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
                                placeholder="Enter full name.."
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            />
                            {/* <Field
                                fkey="email"
                                label="Email Address"
                                placeholder="Enter email"
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            /> */}

                            {/* <Field
                                fkey="userId"
                                label="User Id"
                                placeholder="Enter UserId.."
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            /> */}
                            <Field
                                fkey="phone"
                                label="Phone Number"
                                placeholder="Enter mobile number.."
                                form={form}
                                setForm={setForm}
                                errors={errors}
                            />
                            {/* if update then disable password field */}
                            {!isEdit && (
                                <Field
                                    fkey="password"
                                    label="Password"
                                    placeholder="Enter password.."
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
