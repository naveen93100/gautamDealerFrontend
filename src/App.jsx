import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login';
import CreatePassword from './pages/CreatePassword';

import Layout from './pages/Dashboard/Layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

const App = () => {


   return (
      <Routes>
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

      </Routes>
   )
}
export default App;