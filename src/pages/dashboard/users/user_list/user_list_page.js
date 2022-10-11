import React, { useEffect, useState } from "react";
import NavBar from "../../../../components/navbar/navbar";
import SideBar from "../../../../components/sidebar/sidebar";
import { users_URL } from "../../../../services/urls";
import UserDataTable from "../user_datatable";

export default function UserListPage() {
  useEffect(()=>{
    document.title = "Listado de Usuarios - OAC22"
  }, [])

  return (
    <div className="h-screen">
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className="pt-20 pl-12 pr-2 w-full h-full space-y-4">
        <h3 className="font-bold text-2xl">Listado de Usuarios</h3>
        <div className="w-full" style={{ height: "93%" }}>
          <UserDataTable/>
        </div>
      </div>
    </div>
  );
}
