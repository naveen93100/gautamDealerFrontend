// import { icons, LayoutDashboard, LogOut, Users,  } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";

// const GaloAdminSidebar = ({ sidebarOpen }) => {
//     const navigate = useNavigate();
//     const [activeMenu, setActiveMenu] = useState("dashboard");
//     const { user, loginType, logout } = useAuth();

    
//     const menuItems = [
//         {
//             id: "dashboard",
//             label: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/galo/admin",
//             role: ["admin", "super_admin"],
//         },
//         {
//             id: "panel",
//             label: "Add Panels",
//             icon: Users,
//             path: "/galo/admin/panel",
//             role: ["admin", "super_admin"],
//         },
       
//     ];

//     const handleNavigate = (item) => {
//         setActiveMenu(item?.id);
//         navigate(item?.path);
//     };

//     const handleLogout = () => {
//         toast.dismiss();
//         try {
//             logout();
//             toast.success("Logged out");
//             navigate("/login");
//         } catch (error) {
//             toast.error("There was a problem logging out, please try again");
//         }
//     };

//     return (
//         <aside
//             className={`min-h-screen shrink-0 transition-all duration-300 ${
//                 sidebarOpen ? "w-64" : "w-20"
//             } bg-[#1a1a1a]`}
//         >
//             <div className="flex flex-col h-full">
//                 {/* Logo */}
//                 <div className="p-5 border-b border-white/10 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-[#FDC700] rounded-xl flex items-center justify-center text-[#1a1a1a] font-bold">
//                         G
//                     </div>
//                     {sidebarOpen && (
//                         <div>
//                             <p className="text-white font-bold">Galo Admin</p>
//                             <p className="text-xs text-gray-400">
//                                 {loginType === "super_admin"
//                                     ? "Super Admin"
//                                     : "Admin"}
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Menu */}
//                 <nav className="flex-1 px-3 py-6">
//                     {menuItems.map((item) => {
//                         const Icon = item.icon;
//                         if (!item.role.includes(loginType)) return null;

//                         return (
//                             <NavLink
//                                 key={item.id}
//                                 to={item.path}
//                                 end={item.path === "/galo/admin"}
//                                 onClick={() => handleNavigate(item)}
//                                 className={({ isActive }) =>
//                                     `w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
//                                         isActive
//                                             ? "bg-[#FDC700] text-[#1a1a1a]"
//                                             : "text-gray-300 hover:bg-white/10"
//                                     }`
//                                 }
//                             >
//                                 <Icon className="w-5 h-5" />
//                                 {sidebarOpen && item.label}
//                             </NavLink>
//                         );
//                     })}
//                 </nav>

//                 {/* Logout */}
//                 <div className="mb-10 flex justify-center">
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 border border-[#E8B800] rounded-2xl px-5 py-2 bg-[#FDC700] text-[#1a1a1a] font-semibold hover:bg-[#f0bd00] transition-colors"
//                     >
//                         <LogOut className="w-4 h-4" />
//                         {sidebarOpen && <span>Logout</span>}
//                     </button>
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default GaloAdminSidebar;




import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // ← add useLocation
import { useAuth } from "../../Context/AuthContext";

const GaloAdminSidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const { user, loginType, logout } = useAuth();

    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/galo/admin",
            role: ["admin", "super_admin"],
        },
        {
            id: "panel",
            label: "Add Panels",
            icon: Users,
            path: "/galo/admin/panel",
            role: ["admin", "super_admin"],
        },
    ];

    const handleNavigate = (item) => {
        setActiveMenu(item?.id);
        navigate(item?.path);
    };

    const handleLogout = () => {
        toast.dismiss();
        try {
            logout();
            toast.success("Logged out");
            navigate("/login");
        } catch (error) {
            toast.error("There was a problem logging out, please try again");
        }
    };

    return (
        <aside
            className={`min-h-screen shrink-0 transition-all duration-300 ${
                sidebarOpen ? "w-64" : "w-20"
            } bg-[#1a1a1a]`}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-5 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FDC700] rounded-xl flex items-center justify-center text-[#1a1a1a] font-bold">
                        G
                    </div>
                    {sidebarOpen && (
                        <div>
                            <p className="text-white font-bold">Galo Admin</p>
                            <p className="text-xs text-gray-400">
                                {loginType === "super_admin"
                                    ? "Super Admin"
                                    : "Admin"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        if (!item.role.includes(loginType)) return null;

                        // Custom active check
                        let isActive = false;
                        if (item.id === "dashboard") {
                            isActive = location.pathname === "/galo/admin";
                        } else if (item.id === "panel") {
                            // Active for any path under /galo/admin/ except the exact dashboard
                            isActive =
                                location.pathname.startsWith("/galo/admin/") &&
                                location.pathname !== "/galo/admin";
                        }

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                end={item.path === "/galo/admin"} // only exact for dashboard
                                onClick={() => handleNavigate(item)}
                                className={() =>
                                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                                        isActive
                                            ? "bg-[#FDC700] text-[#1a1a1a]"
                                            : "text-gray-300 hover:bg-white/10"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="mb-10 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 border border-[#E8B800] rounded-2xl px-5 py-2 bg-[#FDC700] text-[#1a1a1a] font-semibold hover:bg-[#f0bd00] transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default GaloAdminSidebar;
