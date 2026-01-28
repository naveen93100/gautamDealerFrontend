import { LayoutDashboard, Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
        { id: "panel", label: "Panel Data", icon: Package, path: "/admin/panel" },
        // { id: "customers", label: "Customers", icon: Users, path: "/admin/customers" },
    ];

    useEffect(() => {
        navigate("/admin", { replace: true });
    }, []);

    const handleNavigate = (item) => {
        setActiveMenu(item?.id);
        navigate(item?.path)

    }


 
    return (
        <aside
            className={`min-h-screen  shrink-0 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 `}
        >
            <div className="flex flex-col h-full ">
                {/* Logo */}
                <div className="p-6 border-b border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                        G
                    </div>
                    {sidebarOpen && (
                        <div>
                            <p className="text-white font-bold">Dealer</p>
                            <p className="text-xs text-slate-400">Admin Panel</p>
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-6 ">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeMenu === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    handleNavigate(item)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2
                  ${isActive
                                        ? "bg-orange-600 text-white"
                                        : "text-slate-300 hover:bg-slate-800"}
                `}
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default AdminSidebar;
