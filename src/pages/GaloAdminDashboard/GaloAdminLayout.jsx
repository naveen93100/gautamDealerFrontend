// import { Outlet } from "react-router-dom";
// import GaloHeader from "../GalosalesDashboard/GaloHeader";
// import GaloAdminSidebar from "./GaloAdminSidebar";

// const GaloAdminLayout = () => {
//   return (
//     <div className="min-h-screen bg-[#FFFCF0] flex flex-col">
//       <GaloHeader />
//       <div className="flex flex-1 overflow-hidden">
//         <GaloAdminSidebar />
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default GaloAdminLayout;




import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import GaloHeader from "../GalosalesDashboard/GaloHeader";
import GaloAdminSidebar from "./GaloAdminSidebar";

const GaloAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex bg-[#FFFCF0]">
            <GaloAdminSidebar sidebarOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col min-w-0">
                <GaloHeader onMenuClick={() => setSidebarOpen((prev) => !prev)} />
                <Outlet />
            </div>
        </div>
    );
};

export default GaloAdminLayout;