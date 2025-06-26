 import { Outlet } from 'react-router'
import Navbar from '../page/sheared/Navbar/Navbar'
import Footer from '../page/sheared/Footer/Footer'

function Rootlayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Rootlayout