import { Route } from "react-router-dom";
import GaloAdminLayout from "../pages/GaloAdminDashboard/GaloAdminLayout";
import GaloAdminRoute from "../components/common/GaloAdminRoute";
import GaloAdminDashboard from "../pages/GaloAdminDashboard/GaloAdminDashboard";
import GaloAdminSalesList from "../pages/GaloAdminDashboard/GaloAdminSalesList";
import GaloPannelProposal from "../pages/GaloAdminDashboard/GaloPannelProposal";
import GaloTechnologyPanel from "../pages/GaloAdminDashboard/GaloTechnologyPanel";
import GaloConstructivePanel from "../pages/GaloAdminDashboard/GaloConstructivePanel";
import GaloPanelWatt from "../pages/GaloAdminDashboard/GaloPanelWatt";
import AddInverter from "../pages/GaloAdminDashboard/AddInverter";

const GaloAdminRoutes = [
    <Route key="galo-admin-guard" element={<GaloAdminRoute />}>
        <Route
            key="galo-admin-layout"
            path="/galo/admin"
            element={<GaloAdminLayout />}
        >
            <Route index element={<GaloAdminDashboard />} />
            <Route path="panel" element={<GaloPannelProposal />} />
            <Route path="tech" element={<GaloTechnologyPanel />} />
            <Route path="constructive" element={<GaloConstructivePanel />} />
            <Route path="watt" element={<GaloPanelWatt />} />

            {/* Sales – nested path (matches /galo/admin/sales) */}
            <Route path="sales" element={<GaloAdminSalesList />} />
            <Route path="inverter" element={<AddInverter />} />
        </Route>
    </Route>,
];

export default GaloAdminRoutes;
