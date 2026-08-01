import { Route } from "react-router-dom";
import Layout from "../pages/Dashboard/Layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import MainPage from "../components/common/MainPage";
import PanelPropsalView from "../components/common/PanelPropsalView";
import ClientPanelHistory from "../pages/Dashboard/Layout/ClientPanelHistory";

const DealerRoutes = [
    <Route
        key="dashboard"
        path="/dashboard"
        element={
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        }
    />,
    <Route key="preview-proposal" path="preview-proposal" element={<MainPage />} />,
    <Route
        key="view-panel-proposal"
        path="viewPanelProposal"
        element={<PanelPropsalView />}
    />,
    <Route
        key="clientpanel-history"
        path="clientpanel-history"
        element={<ClientPanelHistory />}
    />,
];

export default DealerRoutes;