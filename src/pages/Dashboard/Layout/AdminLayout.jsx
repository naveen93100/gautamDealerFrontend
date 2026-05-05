
import { Outlet } from "react-router-dom";
import { Menu, MoveLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/common/AdminSideBar/AdminSidebar";
const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setSidebarOpen(false); // auto collapse
            } else {
                setIsMobile(false);
                setSidebarOpen(true); // auto open
            }
        };

        handleResize(); // run once
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="flex flex-col min-h-screen overflow-y-hidden">
            <div className="flex min-h-screen border bg-gray-100">
                <AdminSidebar sidebarOpen={sidebarOpen} />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-16 bg-white border-b flex items-center px-6">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? <MoveLeft /> : <Menu />}
                        </button>

                        <div className=" ml-5  w-45 ">
                            <img src="/companyLogo/companyLogo.png" alt="Gautam Solar" />
                            
                        </div>

                        <div className="ml-auto text-right mr-5">
                            <p className="text-red-600 ">Admin Dashboard</p>
                            <p className="text-md font-bold text-red-700">Powered by Gautam Solar</p>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-hidden p-6 bg-gray-200">
                        <div className=" mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
