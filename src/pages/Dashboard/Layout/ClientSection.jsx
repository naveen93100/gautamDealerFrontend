import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Search, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../services/api";
import { useAuth } from "../../../Context/AuthContext";
import toast from "react-hot-toast";
const COLOR_MAP = {
    coral: {
        bg: "bg-[#FAECE7]",
        text: "text-[#993C1D]",
        stripe: "bg-[#D85A30]",
    },
    teal: {
        bg: "bg-[#E1F5EE]",
        text: "text-[#0F6E56]",
        stripe: "bg-[#1D9E75]",
    },
    purple: {
        bg: "bg-[#EEEDFE]",
        text: "text-[#534AB7]",
        stripe: "bg-[#7F77DD]",
    },
    blue: {
        bg: "bg-[#E6F1FB]",
        text: "text-[#185FA5]",
        stripe: "bg-[#378ADD]",
    },
};

const initials = (name = "") =>
    name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

export default function ClientSection() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrosr] = useState({});

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    useEffect(() => {
        const getClient = async () => {
            try {
                const res = await apiCall(
                    "GET",
                    `/api/dealer/get-customers?dealerId=${user?.id}`,
                );

                setClients(res?.data?.data || []);
            } catch (error) {
                console.log("Something went wrong:", error?.res?.data?.message);
                setClients([]);
            }
        };

        if (user?.id) {
            getClient();
        }
    }, [user?.id]);

    const filtered = clients.filter((c) => {
        const q = search.trim().toLowerCase();

        return (
            !q ||
            String(c?.name || "")
                .toLowerCase()
                .includes(q) ||
            String(c?.email || "")
                .toLowerCase()
                .includes(q) ||
            String(c?.phone || "")
                .toLowerCase()
                .includes(q) ||
            String(c?.address || "")
                .toLowerCase()
                .includes(q)
        );
    });
    const handleCreate = async () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Full Name is required";
        }
        if (!form.email.trim()) {
            newErrors.email = "Emial is required";
        }
        if (!form.phone.trim()) {
            newErrors.phone = "Phone is required";
        }
        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }

        // if (!form.name.trim()) {
        //     toast.error("Full name is required");
        //     return;
        // }

        if (Object.keys(newErrors).length > 0) {
            setErrosr(newErrors);
            toast.error("please fill all required fields");
            return;
        }

        const newClient = {
            ...form,
            dealerId: user.id,
        };

        try {
            const res = await apiCall(
                "POST",
                "/api/dealer/create-customer",
                newClient,
            );

            // console.log("shoing the cretae clinet response?", res?.data);

            if (res?.data?.success) {
                setClients((prev) => [newClient, ...prev]);

                setForm({
                    dealerId: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    location: "",
                });
                setErrosr({});
                setShowModal(false);
                toast.success("Client created successfully");
            } else {
                toast.error("Failed to create client");
            }
        } catch (er) {
            // console.log(er?.)
            toast.error(er?.response?.data?.message);
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            phone: "",
            address: "",
        });

        setErrosr({});
        setSelectedClient(null);
        setIsEdit(false);
    };
    const handleEditClient = (client) => {
        setIsEdit(true);
        setSelectedClient(client);

        setForm({
            name: client.name || "",
            email: client.email || "",
            phone: client.phone || "",
            address: client.address || "",
        });

        setShowModal(true);
    };

    const handleUpdateClient = async () => {
        try {
            const response = await apiCall(
                "PATCH",
                `/api/dealer/edit-customer/${selectedClient._id}`,
                form,
            );

            if (response?.data?.success) {
                setClients((prev) =>
                    prev.map((item) =>
                        item._id === selectedClient._id
                            ? { ...item, ...form }
                            : item,
                    ),
                );

                toast.success("Client updated successfully");

                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    const field = (key, label, ph) => {
        const hasError = errors[key];

        return (
            <div key={key} className="mb-3">
                <label className="text-md text-gray-400 mb-1 block">
                    {label} <span className="text-red-700 text-lg">*</span>{" "}
                </label>
                <input
                    className={`w-full border border-gray-200 rounded-xl px-3 py-2  text-sm outline-none focus:border-[#D85A30] focus:ring-2 focus:ring-[#D85A30]/20 bg-gray-50 ${
                        hasError
                            ? "border-red-500 focus:ring-2 focus:ring-red-300"
                            : "border-gray-200 focus:border-[#D85A30] focus:ring-2-[#D85A30]/20"
                    }`}
                    placeholder={ph}
                    value={form[key]}
                    onChange={(e) => {
                        setForm((p) => ({ ...p, [key]: e.target.value }));

                        setErrosr((p) => ({
                            ...p,
                            [key]: "",
                        }));
                    }}
                />

                {hasError && (
                    <p className="text-red-500 text-sm mt-1">{hasError}</p>
                )}
            </div>
        );
    };

    return (
        <div className="mt-2">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5 bg-white px-5 py-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="relative w-full md:w-72">
                    <input
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#D85A30] focus:ring-2 focus:ring-[#D85A30]/20 bg-gray-50 transition-all"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 text-sm shrink-0" />
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-red-700 hover:bg-[#e75050] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                    <span className="text-base leading-none">＋</span>
                    Create Client
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-400 py-16 text-sm bg-white rounded-2xl border border-gray-200">
                        No clients found
                    </p>
                ) : (
                    filtered.map((c, index) => {
                        const colors = Object.values(COLOR_MAP);
                        const col = colors[index % colors.length];
                        return (
                            <div
                                key={index}
                                onClick={(e) => {
                                    // e.stopPropagation()
                                    navigate("/clientpanel-history", {
                                        state: {
                                            clientId: c._id,
                                        },
                                    });
                                }}
                                className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
                            >
                                {/* Left stripe */}
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-1 ${col.stripe} rounded-l-2xl`}
                                />

                                {/* Top row — avatar + name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${col.bg} ${col.text}`}
                                    >
                                        {initials(c.name)}
                                    </div>
                                    <div className="flex justify-between items-center w-full min-w-0">
                                        <div className="text-sm font-semibold text-gray-800 truncate">
                                            {c.name || "—"}
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClient(c);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg border border-amber-500 text-amber-600 hover:bg-amber-50 transition text-sm font-medium"
                                        >
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 mb-3" />

                                {/* Info rows */}
                                <div className="space-y-1.5">
                                    {c.email && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate">
                                                {c.email}
                                            </span>
                                        </div>
                                    )}
                                    {c.phone && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span>{c.phone}</span>
                                        </div>
                                    )}
                                    {c.address && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span>{c.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Arrow */}
                                <div className="flex justify-end mt-3">
                                    <span className="text-gray-300 text-sm group-hover:text-[#D85A30] transition-colors">
                                        →
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Create Client Modal */}
            {showModal && (
                <div
                    className="fixed inset-0  bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
                    onClick={(e) =>
                        e.target === e.currentTarget && setShowModal(false)
                    }
                >
                    <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-sm p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-semibold text-gray-800">
                                Add new client
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setForm({
                                        name: "",
                                        email: "",
                                        phone: "",
                                        address: "",
                                    });
                                }}
                                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {field("name", "Full Name", "Enter Name")}
                        {field("email", "Email", "Enter Email")}
                        {field("phone", "Phone", "Enter Mobile Number")}
                        {field("address", "Address", "Enter Address")}

                        <div className="flex gap-2 justify-end mt-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-500 cursor-pointer hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={
                                    isEdit ? handleUpdateClient : handleCreate
                                }
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                                    isEdit
                                        ? "bg-amber-500 hover:bg-amber-600"
                                        : "bg-[#D85A30] hover:bg-[#c04e28]"
                                }`}
                            >
                                {isEdit ? "Update Client" : "Create Client"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
