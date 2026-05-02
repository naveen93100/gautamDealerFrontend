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
import { apiCall } from "../../services/api";
import { useAuth } from "../../Context/AuthContext";

const PALETTE = [
    {
        bg: "from-[#FAECE7] to-[#F5C4B3]",
        avatar: "from-[#D85A30] to-[#993C1D]",
        stripe: "bg-[#D85A30]",
        ring: "ring-[#D85A30]/20",
        badge: "bg-[#FAECE7] text-[#993C1D]",
    },
    {
        bg: "from-[#E1F5EE] to-[#9FE1CB]",
        avatar: "from-[#1D9E75] to-[#0F6E56]",
        stripe: "bg-[#1D9E75]",
        ring: "ring-[#1D9E75]/20",
        badge: "bg-[#E1F5EE] text-[#0F6E56]",
    },
    {
        bg: "from-[#EEEDFE] to-[#CECBF6]",
        avatar: "from-[#7F77DD] to-[#534AB7]",
        stripe: "bg-[#7F77DD]",
        ring: "ring-[#7F77DD]/20",
        badge: "bg-[#EEEDFE] text-[#534AB7]",
    },
    {
        bg: "from-[#E6F1FB] to-[#B5D4F4]",
        avatar: "from-[#378ADD] to-[#185FA5]",
        stripe: "bg-[#378ADD]",
        ring: "ring-[#378ADD]/20",
        badge: "bg-[#E6F1FB] text-[#185FA5]",
    },
    {
        bg: "from-[#FBEAF0] to-[#F4C0D1]",
        avatar: "from-[#D4537E] to-[#993556]",
        stripe: "bg-[#D4537E]",
        ring: "ring-[#D4537E]/20",
        badge: "bg-[#FBEAF0] text-[#993556]",
    },
    {
        bg: "from-[#FAEEDA] to-[#FAC775]",
        avatar: "from-[#EF9F27] to-[#BA7517]",
        stripe: "bg-[#EF9F27]",
        ring: "ring-[#EF9F27]/20",
        badge: "bg-[#FAEEDA] text-[#854F0B]",
    },
];

const initials = (fullName = "") =>
    fullName
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

export default function CreateSalesClient() {
    const { user, loginType } = useAuth();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        companyName: "",
    });

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            phone: "",
            address: "",
            compnayName: "",
            gstNumbar: "",
        });
        setErrors({});
        setSelectedClient(null);
        setIsEdit(false);
    };

    const filtered = clients.filter((c) => {
        const q = search.trim().toLowerCase();
        return (
            !q ||
            [c.fullName, c.email, c.phone, c.address].some((v) =>
                String(v || "")
                    .toLowerCase()
                    .includes(q),
            )
        );
    });

    useEffect(() => {
        const fetchSalesCleints = async () => {
            try {
                const response = await apiCall(
                    "GET",
                    `/api/sales/get-client/${user?._id}`,
                );
                if (response?.data?.success) {
                    setClients(response?.data?.sales || []);
                } else {
                    toast.error(
                        response?.data?.message || "Failed to fetch clients",
                    );
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while fetching clients");
            }
        };
        if (user?._id) {
            fetchSalesCleints();
        }
    }, [user?._id]);

    const handleCreate = async () => {
        const paylod = {
            fullName: form.fullName,
            email: form?.email.trim() ? form?.email : undefined,
            phone: form.phone,
            address: form?.address.trim() ? form?.email : undefined,
            companyName: form.companyName,
            gstin: form.gstNumber,
            salesId: user._id,
        };

        try {
            const response = await apiCall(
                "POST",
                "/api/sales/create-client",
                paylod,
            );

            if (response?.data?.success) {
                toast.success("Client created successfully");
                setClients((prev) => [response.data.client, ...prev]);

                resetForm();
                setShowModal(false);
            }
        } catch (error) {
            toast.dismiss();
            const errors = error?.response?.data?.message || [];

            toast.error(
                <div>
                    <strong>Please fix the following:</strong>
                    <ul className="mt-1">
                        {errors.map((err, i) => (
                            <li key={i} className="capitalize text-sm">
                                • {err.message}
                            </li>
                        ))}
                    </ul>
                </div>,
            );
        }
    };

    const handleEdit = (c) => {
        setIsEdit(true);
        setSelectedClient(c);
        setForm({
            fullName: c.fullName || "",
            email: c.email || "",
            phone: c.phone || "",
            address: c.address || "",
            companyName: c.companyName || "",
            gstNumber: c.gstin || "",
        });
        setShowModal(true);
    };

    const handleUpdate = async () => {
        try {
            const paylod = {
                fullName: form.fullName.trim() ? form.fullName : undefined,
                email: form.email.trim() ? form.email : undefined,
                phone: form.phone,
                address: form.address ? form.address : undefined,
                companyName: form.companyName,
                gstin: form.gstNumber,
                salesId: user._id,
                clientId: selectedClient._id,
            };
            // console.log(
            //     "show the payload when i update the sales client",
            //     paylod,
            // );

            const response = await apiCall(
                "PATCH",
                "/api/sales/update-client/",
                paylod,
            );
            if (response?.data?.success) {
                toast.success("Client updated successfully");
                setClients((p) =>
                    p.map((item) =>
                        item._id === selectedClient._id
                            ? { ...item, ...response.data.client }
                            : item,
                    ),
                );
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            toast.dismiss();
            const errors = error?.response?.data?.message || [];

            toast.error(
                <div>
                    <strong>Please fix the following:</strong>
                    <ul className="mt-1">
                        {errors.map((err, i) => (
                            <li key={i} className="capitalize text-sm">
                                • {err.message}
                            </li>
                        ))}
                    </ul>
                </div>,
            );
        }
    };

    const Field = ({ fkey, label, placeholder, required = false }) => {
        const hasError = errors[fkey];
        return (
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    {label}{" "}
                    {required && (
                        <span className="text-red-500 normal-case tracking-normal text-sm">
                            *
                        </span>
                    )}
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
        <div className="mt-2">
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6
                bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm"
            >
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50
                            outline-none focus:border-[#D85A30] focus:ring-2 focus:ring-[#D85A30]/15 focus:bg-white transition-all"
                        placeholder="Search clients…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="group flex items-center justify-center gap-2
                        bg-linear-to-br from-[#970f0f] to-[#d30909]
                        hover:from-[#a20000] hover:to-[#a20000]
                        text-white text-sm font-semibold
                        px-5 py-2.5 rounded-xl
                        shadow-md shadow-[#D85A30]/30
                        hover:shadow-lg hover:shadow-[#D85A30]/40
                        transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                    <UserPlus className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    Create Sales Client
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                    <div className="col-span-3 flex flex-col items-center justify-center py-20  rounded-2xl border border-dashed border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Search className="w-5 h-5 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">
                            No clients found
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                            Try a different search term
                        </p>
                    </div>
                ) : (
                    filtered.map((c, i) => {
                        const col = PALETTE[i % PALETTE.length];
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    navigate("/salesclient-history", {
                                        state: {
                                            clientId: c._id,
                                            clientName: c.fullName,
                                        },
                                    })
                                }
                                className={`group relative bg-white rounded-2xl border border-gray-100
                                    cursor-pointer overflow-hidden
                                    hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/80
                                    hover:border-gray-200 transition-all duration-250`}
                            >
                                <div
                                    className={`h-1.5 w-full bg-linear-to-r ${col.bg}`}
                                />

                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={`w-11 h-11 rounded-full bg-linear-to-br ${col.avatar}
                                            flex items-center justify-center
                                            text-xs font-bold text-white shrink-0
                                            shadow-md ring-4 ${col.ring}`}
                                        >
                                            {initials(c?.fullName) || "N/A"}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                                                {c?.fullName || "—"}
                                            </p>
                                            <span
                                                className={`inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${col.badge}`}
                                            >
                                                Client
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(c);
                                            }}
                                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5
                                                rounded-lg border border-amber-200 bg-amber-50
                                                text-amber-600 hover:bg-amber-100 hover:border-amber-300
                                                transition-all duration-150 text-xs font-semibold"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-100 mb-3.5" />

                                    <div className="space-y-2.5">
                                        {c?.email && (
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0">
                                                    <svg width="0" height="0">
                                                        <linearGradient
                                                            id="gmailGradient"
                                                            x1="0%"
                                                            y1="0%"
                                                            x2="100%"
                                                            y2="100%"
                                                        >
                                                            <stop
                                                                offset="0%"
                                                                stopColor="#4285F4"
                                                            />
                                                            <stop
                                                                offset="35%"
                                                                stopColor="#EA4335"
                                                            />
                                                            <stop
                                                                offset="70%"
                                                                stopColor="#FBBC05"
                                                            />
                                                            <stop
                                                                offset="100%"
                                                                stopColor="#34A853"
                                                            />
                                                        </linearGradient>
                                                    </svg>

                                                    <Mail
                                                        className="w-3.5 h-3.5"
                                                        style={{
                                                            stroke: "url(#gmailGradient)",
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500 truncate">
                                                    <span className="text-black text-lx">
                                                        Email :
                                                    </span>{" "}
                                                    {c?.email}
                                                </span>
                                            </div>
                                        )}
                                        {c?.phone && (
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0">
                                                    <Phone className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    <span className="text-black text-lx">
                                                        Phone :
                                                    </span>{" "}
                                                    {c?.phone}
                                                </span>
                                            </div>
                                        )}
                                        {c?.address && (
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0">
                                                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                                                </div>
                                                <span className="text-xs text-gray-500 line-clamp-1">
                                                    <span className="text-black text-lx">
                                                        Address :
                                                    </span>{" "}
                                                    {c?.address}
                                                </span>
                                            </div>
                                        )}
                                        {c?.companyName && (
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0">
                                                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-xs text-gray-500 line-clamp-1">
                                                    <span className="text-black text-lx">
                                                        Company :
                                                    </span>{" "}
                                                    {c?.companyName}
                                                </span>
                                            </div>
                                        )}
                                        {c?.gstin && (
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0">
                                                    <Receipt className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-xs text-gray-500 line-clamp-1 hover:text-blue-500 transition-colors duration-150">
                                                    <span className="text-black text-lx">
                                                        GSTIN :
                                                    </span>{" "}
                                                    {c?.gstin}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <span className="text-xs text-gray-300 group-hover:text-[#D85A30] transition-colors duration-200 font-semibold tracking-wider">
                                            VIEW →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
                        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
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
                                            ? "Edit Client"
                                            : "Add New Client"}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {isEdit
                                            ? "Update client information"
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
                        <div className="px-6 py-5 flex-1 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Field({
                                    fkey: "fullName",
                                    label: "Full Name",
                                    placeholder: "Enter full name",
                                })}
                                {Field({
                                    fkey: "email",
                                    label: "Email Address",
                                    placeholder: "Enter email",
                                })}
                                {Field({
                                    fkey: "phone",
                                    label: "Phone Number",
                                    placeholder: "Enter mobile number",
                                    required : true
                                })}

                                {Field({
                                    fkey: "address",
                                    label: "Address",
                                    placeholder: "Enter address",
                                    required : true
                                })}
                                {Field({
                                    fkey: "companyName",
                                    label: "Company Name",
                                    placeholder: "Enter Company Name",
                                    required : true
                                })}
                                {Field({
                                    fkey: "gstNumber",
                                    label: "GST Number",
                                    placeholder: "Enter GST Number",
                                    required : true
                                })}
                            </div>

                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 py-3 text-sm font-semibold border border-gray-200 rounded-xl
                                        text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={
                                        isEdit ? handleUpdate : handleCreate
                                    }
                                    className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white
                                        transition-all duration-200 shadow-md active:scale-[0.97]
                                        ${
                                            isEdit
                                                ? "bg-linear-to-br from-amber-400 to-amber-600 shadow-amber-200 hover:shadow-amber-300 hover:shadow-lg"
                                                : "bg-linear-to-br from-[#D85A30] to-[#993C1D] shadow-[#D85A30]/30 hover:shadow-[#D85A30]/50 hover:shadow-lg"
                                        }`}
                                >
                                    {isEdit ? "Update Client" : "Create Client"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyframe animation */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)  scale(1); }
                }
            `}</style>
        </div>
    );
}
