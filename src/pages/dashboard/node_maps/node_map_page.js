import React, { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { sensor_list } from "../../../services/urls";
import NodeMapView from "./node_map_view";

export default function NodeMapPage() {
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
      <div className="pt-20 pl-12 pr-2 w-full h-full space-y-4">
        <h3 className="font-bold text-2xl">Mapa de Nodos</h3>
        <div
          className="bg-white shadow-md w-full p-3 rounded-lg"
          style={{ height: "85vh" }}
        >
          <NodeMapView nodes={nodes} />
        </div>
      </div>
    </div>
  );
}
