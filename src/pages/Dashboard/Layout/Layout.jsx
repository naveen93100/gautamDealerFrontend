import { Outlet } from 'react-router-dom'
import Header from '../../../components/Header'
import Dashboard from '../../Dashboard'

const Layout = () => {
  return (
    <>
    {/* <Header/> */}
    <Dashboard/>
    {/* <Outlet/> */}
    </>
  )
}

export default Layout