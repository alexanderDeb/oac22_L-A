import React, { useEffect, useState } from "react";
import { RiRemoteControlFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { sensor_list } from "../../../services/urls";
import NodeMapView from "../node_maps/node_map_view";
import NodesDataTable from "./node_datatable";

export default function Dashboard() {
  const [nodes, setNodes] = useState([]);

  const getNodeList = async () => {
    try {
      const response = await fetch(sensor_list, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setNodes(data);
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  useEffect(() => {
    getNodeList();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className="pt-20 pl-12 pr-4 w-full h-full space-y-4">
        <h3 className="font-bold text-xl text-left">Dashboard</h3>
        <div className="flex flex-row w-full justify-between space-x-4 text-green-700">
          <div className="flex flex-col p-5 h-full w-full bg-white shadow-md text-center items-center justify-center rounded-md hover:scale-105 transition-all">
            <h3 className="font-bold">Nodos Instalados</h3>
            <RiRemoteControlFill size={40} />
            <h3 className="font-semibold text-xl">{nodes.length}</h3>
          </div>

          <div className="flex flex-col p-5 h-full w-full bg-white shadow-md text-center items-center justify-center rounded-md hover:scale-105 transition-all">
            <h3 className="font-bold">Nodos Instalados</h3>
            <RiRemoteControlFill size={40} />
            <h3 className="font-semibold text-xl">{nodes.length}</h3>
          </div>

          <div className="flex flex-col p-5 h-full w-full bg-white shadow-md text-center items-center justify-center rounded-md hover:scale-105 transition-all">
            <h3 className="font-bold">Nodos Instalados</h3>
            <RiRemoteControlFill size={40} />
            <h3 className="font-semibold text-xl">{nodes.length}</h3>
          </div>

          <div className="flex flex-col p-5 h-full w-full bg-white shadow-md text-center items-center justify-center rounded-md hover:scale-105 transition-all">
            <h3 className="font-bold">Nodos Instalados</h3>
            <RiRemoteControlFill size={40} />
            <h3 className="font-semibold text-xl">{nodes.length}</h3>
          </div>
        </div>
        <div className="bg-white shadow-md w-full h-80 p-3 rounded-lg">
          <NodeMapView nodes={nodes} />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-left">Nodos disponibles</h3>
          <div className="w-full h-96">
            <NodesDataTable data={nodes} />
          </div>
        </div>
      </div>
    </div>
  );
}
