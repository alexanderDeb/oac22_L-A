import React from "react";
import DataTable from "../../../components/data_tables/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { GrConfigure } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function NodesDataTable(props) {

  const navigate = useNavigate()

  const Header = ({ text }) => {
    return <h3 className="font-bold text-black">{text}</h3>;
  };

  const goToNode=(id)=>{
    console.log(id)
    navigate(`/dashboard/node/${id}`, { replace: true });
  }

  const columns = [
    {
      field: "id",
      width: 100,
      renderHeader: () => <Header text="Identificador" />,
    },
    {
      field: "deviceId",
      width: 250,
      // editable: true,
      renderHeader: () => <Header text="Id Sensor" />,
    },
    {
      field: "name",
      width: 200,
      // editable: true,
      renderHeader: () => <Header text="Nombre" />,
    },
    {
      field: "longitude",
      width: 240,
      // editable: true,
      renderHeader: () => <Header text="Longitud" />,
    },
    {
      field: "latitude",
      width: 240,
      // editable: true,
      renderHeader: () => <Header text="Latitud" />,
    },
    // {
    //   field: "estado",
    //   width: 150,
    //   renderHeader: () => <Header text="Estado" />,
    //   renderCell: (value) => {
    //     let myValue = value["value"];
    //     if (myValue == true) {
    //       return (
    //         <h3 className="flex flex-row items-center text-green-700">
    //           Activo <span className="text-3xl pl-2">•</span>{" "}
    //         </h3>
    //       );
    //     } else {
    //       return (
    //         <h3 className="flex flex-row items-center text-red-500">
    //           Inactivo <span className="text-3xl pl-2 ">•</span>{" "}
    //         </h3>
    //       );
    //     }
    //   },
    // },
    {
      field: "actions",
      type: "actions",
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GrConfigure size={15} />}
          label="View Node"
          onClick={() => goToNode(params.row.deviceId)}
        />,
      ],
    },
  ];

  return (
    <DataTable
      rows={props.data}
      columns={columns}
      loading={!props.data.length}
      onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const selectedRows = props.data.filter((row) => selectedIDs.has(row.id));
        console.log(selectedRows);
      }}
    />
  );
}
