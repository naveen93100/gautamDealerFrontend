// import { Route } from "react-router-dom";
// import GaloDashboard from "../pages/GalosalesDashboard/GaloDashboard";
// import GlaoSalesClientPanelHistory from "../pages/GalosalesDashboard/GlaoSalesClientPanelHistory";

// const GaloRoutes = [
//     <Route key="galo-dashboard" path="/galo/dashboard" element={<GaloDashboard />} />,
//     <Route
//         key="galo-panel-history"
//         path="galo-panel-history"
//         element={<GlaoSalesClientPanelHistory />}
//     />,
// ];

// export default GaloRoutes;

import { Route } from "react-router-dom";
import GaloLayout from "../pages/GalosalesDashboard/GaloLayout";
import GaloDashboard from "../pages/GalosalesDashboard/GaloDashboard";
import GlaoSalesClientPanelHistory from "../pages/GalosalesDashboard/GlaoSalesClientPanelHistory";
import GaloSalesProposalView from "../pages/GalosalesDashboard/GaloSalesProposalView";

const GaloRoutes = [
    <Route key="galo-layout" path="/galo" element={<GaloLayout />}>
        <Route
            key="galo-dashboard"
            path="dashboard"
            element={<GaloDashboard />}
        />
        <Route
            key="galo-panel-history"
            path="galo-panel-history"
            element={<GlaoSalesClientPanelHistory />}
        />
    </Route>,
        <Route
            key="galo-parposal-view"
            path="galo-parposal-view"
            element={<GaloSalesProposalView />}
        />
];

export default GaloRoutes;
