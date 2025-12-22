import { useAuth } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const { token } = useAuth();
    return (
        token ? <Navigate to='/dashboard' replace /> : <Outlet/>
    )
}

export default PublicRoute