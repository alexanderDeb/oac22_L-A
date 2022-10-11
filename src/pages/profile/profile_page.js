import React, { useEffect, useState } from "react";
import {
  IoPerson,
  IoPersonCircle,
  IoPersonCircleOutline,
} from "react-icons/io5";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";

export default function ProfilePage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    document.title = "Profile - OAC22";
  }, []);

  return (
    <div>
      <div className="w-full">
        <NavBar />
        <SideBar />
      </div>
      <div className="pt-20 pl-12 pr-2 w-full flex flex-col items-center justify-center h-full space-y-2">
        <h3 className="font-semibold text-2xl">
          Bienvenido{" "}
          <span className="text-green-700">
            {sessionStorage.getItem("name")}
          </span>
        </h3>
        <div className="flex flex-col justify-center p-5 space-y-4 items-center shadow-md w-1/2 rounded-md">
          <div>
            <IoPersonCircleOutline size={100} color={"#166534"} />
          </div>
          <div className="flex shadow-inner bg-slate-100 flex-col p-5 rounded-md w-full">
            <div className="flex flex-row justify-start space-x-4">
              <h3 className="font-bold text-lg text-green-800">Nombre:</h3>
              <h3 className="text-lg">{sessionStorage.getItem("name")}</h3>
            </div>
            <div className="flex flex-row justify-start space-x-4">
              <h3 className="font-bold text-lg text-green-800">Apellido:</h3>
              <h3 className="text-lg">{sessionStorage.getItem("last_name")}</h3>
            </div>
            <div className="flex flex-row justify-start space-x-4">
              <h3 className="font-bold text-lg text-green-800">Correo:</h3>
              <h3 className="text-lg">{sessionStorage.getItem("username")}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
