import { LayoutDashboard, LogOut, UserRound, UserRoundPlus, Users, SolarPanel, Unplug } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { apiCall } from "../../../services/api";
import { useAuth } from "../../../Context/AuthContext";
import { BiSolidUserAccount } from "react-icons/bi";

const AdminSidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const { user, setToken, setLoginType, } = useAuth();

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin", role: ['super_admin'] },

        { id: "panel", label: "Panel Management", icon: SolarPanel, path: "/admin/panel", role: ['super_admin'] },

        { id: "inverter", label: "Inverter Management", icon: Unplug, path: "/admin/inverter", role: ['super_admin'] },

        { id: "sales", label: "Sales Accounts", icon: Users, path: "/admin/sales", role: ['admin', 'super_admin'] },

        { id: "createAdmin", label: "Admin Management", icon: UserRoundPlus, path: "/admin/create-admin", role: ['super_admin'] },

        { id: "createDealer", label: "Dealer Management", icon: UserRound, path: "/admin/create-dealer", role: ['super_admin'] },
    ];

    const handleNavigate = (item) => {
        setActiveMenu(item?.id);
        navigate(item?.path)
    }

    const handleLogout = async () => {
        toast.dismiss()
        try {
            const response = await apiCall("get", "/adminPanel/logoutAdmin", null, { withCredentials: true });
            navigate("/login")
            toast.success(response?.data?.message);
            setToken(null);
            setLoginType(null)
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('loginType');

        } catch (error) {
            toast.error(error?.response?.data?.message || "There have some server error,please wait we are resolving this error")

        }

    }

    return (
        <aside
            className={`min-h-screen  shrink-0 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 `}
        >
            <div className="flex flex-col h-full ">
                {/* Logo */}
                <div className="p-5 border-b border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                        G
                    </div>

                    {sidebarOpen && (
                        <div>
                            {/* <p className="text-white font-bold">Dealer</p> */}
                            <p className="text-xs text-slate-400">{user?.role === 'super_admin' ? 'Super Admin' : "Admin"}</p>
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-6 ">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = activeMenu === item._id;

                        return (
                            // <React.Fragment key={item?._id}>
                            <div key={i}>

                                {item?.role.includes(user?.role) &&
                                    <NavLink
                                        key={item?._id}
                                        to={item.path}
                                        end={item.path === '/admin'}
                                        className={({ isActive }) =>
                                            `w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2
    ${isActive
                                                ? "bg-[#a20000] text-white"
                                                : "text-slate-300 hover:bg-slate-800"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        {sidebarOpen && item.label}
                                    </NavLink>
                                }
                            </div>
                            // </React.Fragment>
                        );
                    })}
                </nav>
                <div className="mb-10 text-white flex justify-center">
                    <button onClick={() => { handleLogout() }} className="flex flex-row border rounded-2xl px-5 py-2 bg-red-700 ">
                        <span> <LogOut /></span>{sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
