import { Route } from "react-router-dom";
import SalesDashBoard from "../pages/SalesDashboard/SalesDashBoard";
import SalesClientPanelHistory from "../pages/SalesDashboard/SalesClientPanelHistory";
import SalesProposalView from "../pages/SalesDashboard/SalesProposalView";

const SalesRoutes = [
    <Route key="sales-dashboard" path="/salesdashbord" element={<SalesDashBoard />} />,
    <Route
        key="sales-client-history"
        path="/salesclient-history"
        element={<SalesClientPanelHistory />}
    />,
    <Route
        key="sales-proposal-view"
        path="/sales-panel-proposal-view"
        element={<SalesProposalView />}
    />,
];

export default SalesRoutes;