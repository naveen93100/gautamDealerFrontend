import { Route } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import CreatePassword from "../pages/CreatePassword";
import { useCompany } from "../Context/CompanyContext";
import GaloLogin from "../pages/GalosalesDashboard/GaloLogin";

const CompanyAwareLogin = () => {
    const { company } = useCompany();
    return company?.id === "galo" ? <GaloLogin /> : <Login />;
};

const AuthRoutes = [
    <Route key="login" path="/login" element={<CompanyAwareLogin />} />,
    <Route key="register" path="/register" element={<Registration />} />,
    <Route
        key="create-password"
        path="/create-password/:token"
        element={<CreatePassword />}
    />,
];

export default AuthRoutes;