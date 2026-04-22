// import { useAuth } from '../../Context/AuthContext'
// import { Navigate, Outlet } from 'react-router-dom';

// const PublicRoute = () => {
//     const { token , loginType } = useAuth();
//     return (
//         token ? <Navigate to='/dashboard' replace /> : <Outlet/>

//     )
// }

// export default PublicRoute

import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { token, loginType } = useAuth();

    if (!token) {
        return <Outlet />;
    }

    if (loginType === "dealer") {
        return <Navigate to="/dashboard" replace />;
    }

    if (loginType === "sales") {
        return <Navigate to="/salesdashbord" replace />;
    }

    if (loginType === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
