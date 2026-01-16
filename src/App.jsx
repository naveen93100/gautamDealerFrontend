
import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
const AdminDashboard = lazy(() => import("./pages/Dashboard/Admin Dashboard/adminDashboard"))

import Registration from './pages/Registration'
import Login from './pages/Login';
import CreatePassword from './pages/CreatePassword';

import Layout from './pages/Dashboard/Layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

import { setNavigate } from './utils/Navigate';
import MainPage from './components/common/MainPage';



const App = () => {
   const navigate = useNavigate();

   useEffect(() => {
      setNavigate(navigate);
   }, []);

   return (
      <Routes>
         <Route path='/' element={<Navigate to='/login' />} />
         <Route element={<PublicRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/create-password/:token' element={<CreatePassword />} />
         </Route>

         <Route path='/dashboard' element={
            <ProtectedRoute>
               <Layout />
            </ProtectedRoute>
         } />
         <Route path='preview-proposal' element={<MainPage />} />

         <Route path='test' element={<AdminDashboard />} />



      </Routes>
   )
}
export default App;