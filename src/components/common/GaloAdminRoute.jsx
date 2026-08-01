import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCompany } from "../../Context/CompanyContext";

const GaloAdminRoute = () => {
    const { user, loginType, initialized } = useAuth();
    const { company } = useCompany();

    if (!user) return <Navigate to="/login" />;

    const isAllowed =
        company?.id === "galo" &&
        (loginType === "admin" || loginType === "super_admin");

    if (!isAllowed) return <Navigate to="/galo/dashboard" replace />;

    return <Outlet />;
};

export default GaloAdminRoute;
