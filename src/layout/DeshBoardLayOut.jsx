import React from "react";
import { NavLink, Outlet,  } from "react-router";
import Fasttracklogo from "../page/sheared/FastTrackLogo/Fasttracklogo";
 
import { Clock, CreditCard, Home, Package, User } from "lucide-react";

const DeshBoardLayOut = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">DeshBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Fasttracklogo></Fasttracklogo>
          <li>
            <NavLink to="/">
              <Home className="inline-block mr-2" size={18} /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/deshboard/myparchels">
              <Package className="inline-block mr-2" size={18} /> My Parcel
            </NavLink>
          </li>

          <li>
            <NavLink to="/deshboard/paymenthistory">
              <CreditCard className="inline-block mr-2" size={18} /> Payments
              History
            </NavLink>
          </li>

          <li>
            <NavLink to="/deshboard/activeriders">
              <User className="inline-block mr-2" size={18} /> Active Riders
            </NavLink>
          </li>

          <li>
            <NavLink to="/deshboard/pendingriders">
              <Clock className="inline-block mr-2" size={18} /> Pending Riders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeshBoardLayOut;
