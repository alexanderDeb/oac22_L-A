import React, {useState,useEffect} from 'react'
import NavBar from '../../../components/navbar/navbar'
import SideBar from '../../../components/sidebar/sidebar'
import { sensor_list } from '../../../services/urls';
import NodesDataTable from '../main_page/node_datatable'

export default function NodeListPage() {

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
      <NavBar />
      <SideBar />
      <div className='pt-20 pl-12 space-y-6'>
        <h4 className='font-bold text-xl text-center'>Listado de los Nodos disponibles</h4>
        <div className="space-y-4">
          <div className="w-full h-96">
            <NodesDataTable data={nodes} />
          </div>
        </div>
      </div>
    </div>
  )
}
