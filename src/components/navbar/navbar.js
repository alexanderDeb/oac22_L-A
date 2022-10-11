import React from "react";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";

// import logo from "../../Assets/svg/emcali_logo.svg"
import logo from "../../assets/logos/oac_logo.png";

export default function NavBar() {
  return (
    <div className="relative z-10">
      <nav
        id="navbar"
        className="fixed top-0 left-0 bg-slate-100 border-b shadow-sm right-0 px-2 sm:px-4 py-2"
      >
        <div className="flex w-full justify-between items-center">
          <Link to="/" className="hidden md:flex  items-center pl-10">
            <img src={logo} className="mr-3 h-8 md:h-9" alt="" />
              {/* <span className="self-center text-xl hidden lg:flex font-medium whitespace-nowrap text-white dark:text-white">
                Emcali Esolar
              </span> */}
          </Link>

          <div className="flex">
            {/* <button
              type="button"
              onClick={showNavBar}
              className="inline-flex items-center p-2 text-sm text-white rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 z-20"
            >
              <FaBars size={20} />
            </button> */}
          </div>
          {window.sessionStorage.getItem("token") ? <Link to="/profile">
            <div className="flex flex-row items-center text-white justify-center text-lg font-thin space-x-2 px-4 py-1 ">
              <h3 className="font-thin">{localStorage.getItem("username")}</h3>
              <div className="rounded-full bg-white border-2 border-green-500 text-green-500 hover:scale-110 active:scale-90 transition-all p-2">
                <IoPerson color="green"/>
              </div>
            </div>
          </Link> : <a className="shadow px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-green-500 hover:scale-105 transition-all" href="/login">Ingresar</a>}
        </div>
      </nav>
    </div>
  );
}