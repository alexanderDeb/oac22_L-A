import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BatteryPer from "../../../components/graphics_nodes/graphBattery";
import Humidity from "../../../components/graphics_nodes/graphHumidity";
import SolarRadiation from "../../../components/graphics_nodes/graphSolarRadiation";
import Temperature from "../../../components/graphics_nodes/graphTemperature";
import Vaux from "../../../components/graphics_nodes/graphVaux";
import WindDirection from "../../../components/graphics_nodes/graphWindDirection";
import WindSpeed from "../../../components/graphics_nodes/graphWindSpeed";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { sensor_prom_day, sensor_data_list } from "../../../services/urls";

export default function NodeDetailPage() {
  const navigate = useNavigate();
  const deviceId_url = useParams()["deviceId"];
  const [sensor_data, setSensorData] = useState([]);

  const getDeviceData = async () => {
    let url = sensor_data_list + deviceId_url;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (response.status == 200) {
      const data = await response.json();
      setSensorData(data);
    } else {
      // window.sessionStorage.clear();
      // Swal.fire({
      //   position: "top-center",
      //   icon: "error",
      //   title: "Tiempo inactivo",
      //   text: " Se han vencido las credenciales porfavor vuelve a iniciar seccion ",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      // navigate("../login", { replace: true });
      console.log("hola como estas")
    }
  };

  const handlesubmitday = async (e) => {
    e.preventDefault();
    try {
      let url = sensor_data_list + deviceId_url;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.status == 200) {
        const data = await response.json();
        setSensorData(data);
      } else {
        alert("no se logro acceder a la data")
      }
    } catch { }
  }

  const handlesubmitweek = async (e) => {
    e.preventDefault();
    try {
      fetch(`${sensor_prom_day}?deviceId=${deviceId_url}&fecha_inicio=2022-09-18&fecha_fin=2022-10-03`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then(async function (response) {
        const data = await response.json();
        if (response.status === 200) {
          console.log(data)
          setSensorData(data)
        }
      });

    } catch { }
  }

  useEffect(() => {
    getDeviceData();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className="flex flex-row pt-20 pl-12 pr-2 w-full h-full my-5 space-x-6 justify-center">
        <a className="shadow px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-green-500 hover:scale-105 transition-all" onClick={handlesubmitday}>dia</a>
        <a className="shadow px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-green-500 hover:scale-105 transition-all" onClick={handlesubmitweek}>semana</a>
      </div>
      <div className="flex flex-col mx-12 space-y-5 mb-5">
        <div className="flex flex-row">
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <BatteryPer data={sensor_data} />
          </div>
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <Humidity data={sensor_data} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <SolarRadiation data={sensor_data} />
          </div>
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <Temperature data={sensor_data} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <Vaux data={sensor_data} />
          </div>
          <div className="w-1/2 border-2 rounded-lg shadow-md">
            <WindDirection data={sensor_data} />
          </div>
        </div>
        <div className="border-2 rounded-lg shadow-md">
          <WindSpeed data={sensor_data} />
        </div>
      </div>
    </div>
  );
}
