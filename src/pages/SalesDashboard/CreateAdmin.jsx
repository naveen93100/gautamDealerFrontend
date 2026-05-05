import React, { useEffect, useState } from "react";
import { apiCall } from "../../services/api";
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
const CreateAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const initials = (email) => email.split("@")[0].slice(0, 2).toUpperCase();

    const roleConfig = {
        super_admin: {
            label: "Super Admin",
            cls: "bg-purple-50 text-purple-700",
        },
        admin: { label: "Admin", cls: "bg-blue-50 text-blue-700" },
    };
    const superAdminCount = admins?.filter(
        (a) => a.role === "super_admin",
    ).length;

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const { email, password, role } = formData;

            const emailRegex =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            // Check empty fields
            if (!email || !password || !role) {
                alert("All fields are required");
                return;
            }

            // Email validation
            if (!emailRegex.test(email)) {
                alert("Invalid email");
                return;
            }

            // Password validation (optional improvement)
            if (password.length < 6) {
                alert("Password must be at least 6 characters");
                return;
            }

            // Role validation (optional safety)
            if (!["admin", "super_admin"].includes(role)) {
                alert("Invalid role selected");
                return;
            }

            let res = await apiCall(
                "POST",
                "/adminPanel/createAdmin",
                formData,
            );

            if (res?.data?.success) {
                setAdmins((prev) => [...prev, res?.data?.data]);
                setFormData({ email: "", password: "", role: "" });
            }

            // Reset
            setShowModal(false);
        } catch (er) {
            console.log(er);
        }
        setFormData({ email: "", password: "", role: "" });
        setShowModal(false);
    };

    const toggle = async (id, isActive) => {
        const newStatus = !isActive;

        // optimistic update
        setAdmins((prev) =>
            prev.map((a) => (a._id === id ? { ...a, isActive: newStatus } : a)),
        );

        try {
            let res = await apiCall("POST", "/adminPanel/toggle-admin", {
                adminId: id,
                isActive: newStatus,
            });
            console.log(res);
        } catch (err) {
            console.error(err);

            // rollback
            setAdmins((prev) =>
                prev.map((a) => (a._id === id ? { ...a, isActive } : a)),
            );
        }
    };

    useEffect(() => {
        const fetchAllAdmin = async () => {
            try {
                let res = await apiCall("GET", "/adminPanel/getAdmin");
                if (res?.data?.success) {
                    setAdmins(res?.data?.data);
                }
            } catch (er) {
                console.log(er);
            }
        };
        fetchAllAdmin();
    }, []);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        Admin list
                        <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                            {admins.length}
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage system admins, roles, and access.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-1.5 bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    <span className="text-base leading-none">+</span> Add admin
                </button>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Active</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {admins.map((admin) => (
                            <tr
                                key={admin._id}
                                className="border-t hover:bg-gray-50 transition duration-200"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                            <Mail
                                                className="text-green-600"
                                                size={18}
                                            />
                                        </div>
                                        <span className="font-medium text-gray-800">
                                            {admin.email || "N/A"}
                                        </span>
                                    </div>

                                    {/* <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-xs font-medium flex items-center justify-center shrink-0">
                                            {initials(admin.email)}
                                        </span>
                                        {admin.email}
                                    </div> */}
                                </td>
                                <td className="px-4 py-3">
                                    {admin.role && (
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleConfig[admin.role]?.cls}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            {roleConfig[admin.role]?.label}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                            admin.isActive
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                        {admin.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {admin.role === "super_admin" &&
                                    superAdminCount >= 2 ? (
                                        <span className="text-xs text-gray-400">
                                            Locked
                                        </span>
                                    ) : (
                                        <button
                                            role="switch"
                                            aria-checked={admin.isActive}
                                            onClick={() => {
                                                (console.log("clicked"),
                                                    toggle(
                                                        admin._id,
                                                        admin.isActive,
                                                    ));
                                            }}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                                admin.isActive
                                                    ? "bg-green-600"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                                                    admin.isActive
                                                        ? "translate-x-4"
                                                        : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
                    onClick={(e) =>
                        e.target === e.currentTarget && setShowModal(false)
                    }
                >
                    <div className="bg-white rounded-xl border border-gray-200 p-6 w-[340px]">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-medium">
                                Add new admin
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                            >
                                ✕
                            </button>
                        </div>
                        <form className="flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                                    required
                                >
                                    <option value="">Select role</option>
                                    <option value="super_admin">
                                        Super Admin
                                    </option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    type="submit"
                                    className="px-4 py-1.5 text-sm font-medium bg-green-800 hover:bg-green-900 text-white rounded-lg transition-colors"
                                >
                                    Add admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAdmin;
