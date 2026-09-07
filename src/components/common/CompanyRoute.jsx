import { Navigate, Outlet } from "react-router-dom";
import { useCompany } from "../../Context/CompanyContext";

// Wraps every route that requires a company to already be selected
const CompanyRoute = () => {
    const { company } = useCompany();

    if (!company) {
        return <Navigate to="/select-company" replace />;
    }

    return <Outlet />;
};

export default CompanyRoute;
