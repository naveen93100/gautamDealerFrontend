import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    

    return token ? children : <Navigate to='/login' />

}

export default ProtectedRoute