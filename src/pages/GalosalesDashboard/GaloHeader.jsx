// import { useAuth } from "../../Context/AuthContext";

// const GaloHeader = () => {
//     const { user, logout } = useAuth();

//     return (
//         <header className="bg-[#FDC700] border-b border-[#E8B800] px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-lg bg-white border border-black/10 flex items-center justify-center">
//                     <span className="text-lg font-extrabold text-[#1a1a1a]">G</span>
//                 </div>
//                 <div>
//                     <p className="font-extrabold text-[#1a1a1a] tracking-tight leading-tight  capitalize">
//                         Welcome {user.role} Dashboard
//                     </p>
//                     <p className="text-[11px] text-[#1a1a1a]/60 font-semibold">
//                         Powered by Galo Solar
//                     </p>
//                 </div>
//             </div>

//             <div className="flex items-center gap-3">
//                 <span className="hidden sm:block text-sm font-bold text-[#1a1a1a] bg-white/40 px-3 py-1.5 rounded-lg border border-black/10">
//                     {user?.name || "Sales"}
//                 </span>
//                 <button
//                     onClick={logout}
//                     className="flex items-center gap-1.5 text-sm font-bold text-[#FDC700] bg-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#000] transition-colors cursor-pointer"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default GaloHeader;

import { Menu } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { apiCall } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GaloHeader = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 1. Call logout API
            const res = await apiCall("post", "/api/galoSales/logout");
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            logout();
            // 3. Show success message
            toast.success(res?.data?.message || "Logged out successfully");

            // 4. Navigate to login
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    return (
        <header className="bg-[#FDC700] border-b border-[#E8B800] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {onMenuClick && (
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 rounded-lg hover:bg-black/10 transition-colors"
                    >
                        <Menu className="w-5 h-5 text-[#1a1a1a]" />
                    </button>
                )}
               
                {user?.role !== "admin" && (
                    <div className="w-9 h-9 rounded-lg bg-white border border-black/10 flex items-center justify-center">
                        <span className="text-lg font-extrabold text-[#1a1a1a]">
                            G
                        </span>
                    </div>
                )}
                <div>
                    <p className="font-extrabold text-[#1a1a1a] tracking-tight leading-tight capitalize">
                        Welcome {user?.role || "Sales"} Dashboard
                    </p>
                    <p className="text-[11px] text-[#1a1a1a]/60 font-semibold">
                        Powered by Galo Solar
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm capitalize font-bold text-[#1a1a1a] bg-white/40 px-3 py-1.5 rounded-lg border border-black/10">
                    {user?.role || "Sales"}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-bold text-[#FDC700] bg-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#000] transition-colors cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default GaloHeader;
