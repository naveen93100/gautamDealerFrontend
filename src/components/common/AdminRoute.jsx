import { Navigate, Outlet, useLocation } from "react-router-dom"


const AdminRoute = () => {
    const location = useLocation();

    let user = JSON.parse(localStorage.getItem('userData'))
    if (!user) return <Navigate to='/login' />

    if (user?.role === "admin" && location.pathname === "/admin") {
        return <Navigate to="/admin/sales" replace />;
    }

    return <Outlet />
}

export default AdminRoute;