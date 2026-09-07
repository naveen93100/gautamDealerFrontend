import { Outlet } from "react-router-dom";
import GaloHeader from "./GaloHeader"; 

const GaloLayout = () => {
    return (
        <div>
            <GaloHeader />
            <Outlet />
        </div>
    );
};

export default GaloLayout;