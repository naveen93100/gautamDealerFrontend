import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
const AdminDashboard = lazy(
    () => import("./pages/Dashboard/Admin Dashboard/adminDashboard"),
);

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CreatePassword from "./pages/CreatePassword";

import Layout from "./pages/Dashboard/Layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

import { setNavigate } from "./utils/Navigate";
import MainPage from "./components/common/MainPage";
import TechnologyPanel from "./pages/PannelProposal/TechnologyPanel";
import ConstructivePanel from "./pages/PannelProposal/ConstructivePanel";
import AdminLayout from "./pages/Dashboard/Layout/AdminLayout";
import PannelProposal from "./pages/PannelProposal/PannelProposal";
import PanelWatt from "./pages/PannelProposal/PanelWatt";
import PanelPropsalView from "./components/common/PanelPropsalView";
import DealerList from "./pages/DealerList";
import ClientPanelHistory from "./pages/Dashboard/Layout/ClientPanelHistory";

// sales proposal
import SalesDashBoard from "./pages/SalesDashboard/SalesDashBoard";
import SalesClientPanelHistory from "./pages/SalesDashboard/SalesClientPanelHistory";
import SalesPersonList from "./pages/Dashboard/SalesAdmin/SalesPersonList";
import SalesProposalView from "./pages/SalesDashboard/SalesProposalView";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route
                    path="/create-password/:token"
                    element={<CreatePassword />}
                />
            </Route>

            {/* <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}> */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="panel" element={<PannelProposal />} />
                <Route path="panel/technology" element={<TechnologyPanel />} />
                <Route
                    path="panel/technology/constructive"
                    element={<ConstructivePanel />}
                />
                <Route
                    path="panel/technology/constructive/panelWatt"
                    element={<PanelWatt />}
                />
                <Route path="dealer" element={<DealerList />} />
                <Route path="sales" element={<SalesPersonList/>}/>
            </Route>
            {/* <Route path="users" element={<AdminUsers />} /> */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            />

            {/* power plant */}
            <Route path="preview-proposal" element={<MainPage />} />

            {/* solar panel */}
            <Route path="viewPanelProposal" element={<PanelPropsalView />} />
            {/* client panel history  */}
            <Route
                path="clientpanel-history"
                element={<ClientPanelHistory />}
            />

            {/* <Route path='test' element={<AdminDashboard />} /> */}

            {/* sales porposal router  */}
                <Route path="/salesdashbord" element={<SalesDashBoard />} />
                <Route
                    path="/salesclient-history"
                    element={<SalesClientPanelHistory />}
                />

                <Route path="/sales-panel-proposal-view" element={<SalesProposalView/>}/>
        </Routes>
    );
};
export default App;
