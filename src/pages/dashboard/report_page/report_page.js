import React from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";

export default function ReportPage() {
  return (
    <div>
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className="pt-20 pl-12 pr-2 w-full h-full space-y-4">
        <h3 className="font-bold text-2xl">Reporte de Monitoreo</h3>
      </div>
    </div>
  );
}
