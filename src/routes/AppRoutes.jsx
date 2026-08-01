// import { useEffect } from "react";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// import SelectCompany from "../pages/SelectCompany";
// import AdminLayout from "../pages/Dashboard/Layout/AdminLayout";

// import ProtectedRoute from "../components/common/ProtectedRoute";
// import PublicRoute from "../components/common/PublicRoute";
// import CompanyRoute from "../components/common/CompanyRoute";
// import AdminRoute from "../components/common/AdminRoute";

// import AuthRoutes from "./AuthRoutes";
// import AdminRoutes from "./AdminRoutes";
// import SalesRoutes from "./SalesRoutes";
// import GaloRoutes from "./GaloRoutes";
// import DealerRoutes from "./DealerRoutes";

// import { setNavigate } from "../utils/Navigate";
// import TestingProposalView from "../components/common/TestingProposalView";

// import GaloAdminRoutes   from "./GaloAdminRoutes"

// const AppRoutes = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         setNavigate(navigate);
//     }, []);

//     return (
//         <Routes>
//             <Route path="/" element={<Navigate to="/select-company" />} />
//             <Route path="/select-company" element={<SelectCompany />} />

//             <Route element={<CompanyRoute />}>
//                 <Route element={<PublicRoute />}>{AuthRoutes}</Route>

//                 <Route element={<AdminRoute />}>
//                     <Route path="/admin" element={<AdminLayout />}>
//                         {AdminRoutes}
//                     </Route>
//                 </Route>

//                 {DealerRoutes}
//                 {GaloRoutes}
//                 {GaloAdminRoutes}
//                 {SalesRoutes}
//             </Route>
//         </Routes>
//     );
// };

// export default AppRoutes;





import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Login from "../pages/Login"; // your unified login above
import AdminLayout from "../pages/Dashboard/Layout/AdminLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import AdminRoute from "../components/common/AdminRoute";

import AdminRoutes from "./AdminRoutes";
import SalesRoutes from "./SalesRoutes";
import GaloRoutes from "./GaloRoutes";
import DealerRoutes from "./DealerRoutes";
import GaloAdminRoutes from "./GaloAdminRoutes";

import { setNavigate } from "../utils/Navigate";
import TestingProposalView from "../components/common/TestingProposalView";

const AppRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, []);

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    {AdminRoutes}
                </Route>
            </Route>

            {DealerRoutes}
            {GaloRoutes}
            {GaloAdminRoutes}
            {SalesRoutes}
        </Routes>
    );
};

export default AppRoutes;
