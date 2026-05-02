import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const loginType=localStorage.getItem('loginType')||null
    const token=localStorage.getItem('token')||null

    if (!token) {
        return <Outlet />;
    }

    if (loginType === "dealer") {
        return <Navigate to="/dashboard" replace />;
    }

    if (loginType === "sales") {
        return <Navigate to="/salesdashbord" replace />;
    }

    if (loginType === "admin") {
        return <Navigate to="/admin/sales" replace />;
    }

    if (loginType === "super_admin") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
