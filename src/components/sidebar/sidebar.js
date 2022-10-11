import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiRemoteControl2Line, RiRemoteControlFill } from "react-icons/ri";
import { RiRoadMapFill } from "react-icons/ri";
import { MdSettingsRemote, MdSpaceDashboard } from "react-icons/md";
import {
  IoPerson,
  IoLogOut,
  IoBusiness,
  IoPersonAdd,
  IoAdd,
  IoRemove,
  IoAddCircle,
  IoBus,
  IoPeople,
  IoPulse,
  IoList,
  IoDocument,
} from "react-icons/io5";
import { GiWifiRouter } from "react-icons/gi";
import SidebarMenu from "./sidebar_menu";
import Swal from "sweetalert2";
import "./sidebar.css";

import logo from "../../assets/logos/oac_logo.png";
import { logout_URL } from "../../services/urls";

const otherRoutes = [
  {
    path: "/profile",
    name: "Perfil Usuario",
    icon: <IoPerson />,
  },
];

const routes = [
  {
    path: "/dashboard/home",
    name: "Dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    path: "/dashboard/nodes",
    name: "Gestión de Nodos",
    icon: <RiRemoteControlFill />,
    subRoutes: [
      {
        path: "/dashboard/nodes/list",
        name: "Listado de Nodos",
        icon: <RiRemoteControlFill />,
      },
      {
        path: "/dashboard/nodes/map",
        name: "Mapa de Nodos",
        icon: <RiRoadMapFill />,
      },
    ],
  },
  {
    path: "/dashboard/users",
    name: "Usuarios",
    icon: <IoPeople />,
    subRoutes: [
      {
        path: "/dashboard/users/list",
        name: "Listado de Usuarios",
        icon: <IoPerson />,
      },
      {
        path: "/dashboard/users/create",
        name: "Registro de Usuario",
        icon: <IoPersonAdd />,
      },
      {
        path: "/dashboard/users/groups",
        name: "Roles de Usuario",
        icon: <IoPeople />,
      },
    ],
  },
  {
    path: "/dashboard/reports",
    name: "Documento de Actividad",
    icon: <IoDocument />,
  },
];

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    try {
      fetch(logout_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: id }),
      }).then(async function (response) {
        if (response.status === 200) {
          window.sessionStorage.clear();
          Toast.fire({
            icon: "success",
            title: "Has salido con exito",
          });
          navigate("../home", { replace: true });
        } else {
          window.sessionStorage.clear();
          Toast.fire({
            icon: "success",
            title: "Has salido con exito",
          });
          navigate("../home", { replace: true });
        }
      });
    } catch (error) {
      console.error();
    }
  };

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.1,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.1,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    show: {
      opacity: 1,
      width: 100,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 15,
        bounce: 0.1,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "40px",

            transition: {
              duration: 0.1,
              type: "spring",
              damping: 15,
              bounce: 0.25,
            },
          }}
          className="sidebar bg-green-700 py-3 "
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo space-x-4 flex font-extralight flex-row items-center "
                >
                  <Link to="/">
                    <img src={logo} className="w-22" />
                  </Link>
                  {/* <div className="text-xl">Emcali Esolar</div> */}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>

          <section className="other_routes">
            {otherRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <motion.div>
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link_profile"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </motion.div>
              );
            })}
            <motion.div>
              <motion.button
                className="link_profile w-full items-center"
                activeClassName="active"
                onClick={logout}
              >
                <IoLogOut className="icon" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Cerrar sesión
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
