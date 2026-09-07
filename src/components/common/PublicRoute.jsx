// import { useAuth } from "../../Context/AuthContext";
// import { Navigate, Outlet } from "react-router-dom";

// const PublicRoute = () => {
//     const loginType=localStorage.getItem('loginType')||null
//     const token=localStorage.getItem('token')||null

//     if (!token) {
//         return <Outlet />;
//     }

//     if (loginType === "dealer") {
//         return <Navigate to="/dashboard" replace />;
//     }

//     if (loginType === "sales") {
//         return <Navigate to="/salesdashbord" replace />;
//     }

//     if (loginType === "admin") {
//         return <Navigate to="/admin/sales" replace />;
//     }

//     if (loginType === "super_admin") {
//         return <Navigate to="/admin" replace />;
//     }

//     return <Outlet />;
// };

// export default PublicRoute;




import { useAuth } from "../../Context/AuthContext";
import { useCompany } from "../../Context/CompanyContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const loginType = localStorage.getItem("loginType") || null;
    const token = localStorage.getItem("token") || null;
    const { company } = useCompany();

    if (!token) {
        return <Outlet />;
    }

    if (company?.id === "galo") {
        if (loginType === "admin" || loginType === "super_admin") {
            return <Navigate to="/galo/admin" replace />;
        }
        return <Navigate to="/galo/dashboard" replace />;
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