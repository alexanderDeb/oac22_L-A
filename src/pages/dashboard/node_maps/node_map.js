import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/Sidebar/SideBar";
import { format } from "date-fns";

// asset
import NavBar from "../../../Components/NavBar/NavBar";
import ProjectMapView from "./ProjectMapView";
import { list_projectURL } from "../../../Services/URLS";

export default function DashboardProjectsMaps() {
  const [project, setProject] = useState([]);

  // Project List
  const getProjectList = async () => {
    try {
      const response = await fetch(list_projectURL);
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
        // Format creation date
        data[i]["creation_date"] = format(
          new Date(data[i]["creation_date"]),
          "dd/MM/yyyy"
        );
        // convert true into active or else
        if (data[i]["status"] == true) {
          data[i]["status"] = "Active";
        } else {
          data[i]["status"] = "Inactive";
        }
      }
      console.log(data);
      setProject(data);
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  // ASK FOR DATA
  useEffect(() => {
    document.title = "Mapa de proyectos - ESolar";
    getProjectList();
  }, []);

  return (
    <div className="flex flex-row bg-gray-100 h-screen">
      <div className="">
        <SideBar />
        <NavBar />
      </div>
      <section className="ml-5 md:ml-0 md:pl-10 mt-16 flex flex-col p-2 space-y-4 items-center w-full">
        <h3 className="text-xl font-bold">Mapa de Proyectos</h3>
        <div className="bg-white shadow-md w-full p-3 rounded-lg" style={{height: "85vh"}}>
          <ProjectMapView projects={project} />
        </div>
      </section>
    </div>
  );
}
