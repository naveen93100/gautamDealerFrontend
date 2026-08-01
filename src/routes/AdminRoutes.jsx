import { lazy } from "react";
import { Route } from "react-router-dom";
import PannelProposal from "../pages/PannelProposal/PannelProposal";
import TechnologyPanel from "../pages/PannelProposal/TechnologyPanel";
import ConstructivePanel from "../pages/PannelProposal/ConstructivePanel";
import PanelWatt from "../pages/PannelProposal/PanelWatt";
import DealerList from "../pages/DealerList";
import CreateDealerAccount from "../pages/Dashboard/Admin Dashboard/CreateDealerAccount";
import SalesPersonList from "../pages/Dashboard/SalesAdmin/SalesPersonList";
import CreateAdmin from "../pages/SalesDashboard/CreateAdmin";
import ShowSalesAllproposalToAdmin from "../pages/SalesDashboard/ShowSalesAllproposalToAdmin";

const AdminDashboard = lazy(
    () => import("../pages/Dashboard/Admin Dashboard/adminDashboard"),
);

const AdminRoutes = [
    <Route key="admin-index" index element={<AdminDashboard />} />,
    <Route key="admin-panel" path="panel" element={<PannelProposal />} />,
    <Route
        key="admin-panel-tech"
        path="panel/technology"
        element={<TechnologyPanel />}
    />,
    <Route
        key="admin-panel-tech-constructive"
        path="panel/technology/constructive"
        element={<ConstructivePanel />}
    />,
    <Route
        key="admin-panel-watt"
        path="panel/technology/constructive/panelWatt"
        element={<PanelWatt />}
    />,
    <Route key="admin-dealer" path="dealer" element={<DealerList />} />,
    <Route
        key="admin-create-dealer"
        path="create-dealer"
        element={<CreateDealerAccount />}
    />,
    <Route key="admin-sales" path="sales" element={<SalesPersonList />} />,
    <Route
        key="admin-create-admin"
        path="create-admin"
        element={<CreateAdmin />}
    />,
    <Route
        key="admin-sales-client"
        path="sales-client/:salesId"
        element={<ShowSalesAllproposalToAdmin />}
    />,
];

export default AdminRoutes;
