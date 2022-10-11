import React, { useEffect, useReducer, useState } from "react";
import DataTable from "../../../components/data_tables/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { BsPencilSquare } from "react-icons/bs";
import { IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { groups_URL, users_URL } from "../../../services/urls";
import Swal from "sweetalert2";

export default function UserDataTable(props) {
  const [users, setUsers] = useState([]);
  const [rowToChange, setRowToChange] = useState("");
  const [roles, setRoles] = useState([]);
  const [changed, setChanged] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const [edited, setEdited] = useState(false);
  const not_edited = () => setEdited(false);
  const yes_edited = () => setEdited(true);

  const Header = ({ text }) => {
    return <h3 className="font-bold text-black">{text}</h3>;
  };

  // get user list
  const getUsersData = async () => {
    const response = await fetch(users_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  const getRoles = async () => {
    const response = await fetch(groups_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      setRoles(data);
      console.log(data);
    } else {
      window.sessionStorage.clear();
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Tiempo inactivo",
        text: " Se han vencido las credenciales porfavor vuelve a iniciar seccion ",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("../login", { replace: true });
    }
  };

  const edit_user = (params, roles) => {
    Swal.fire({
      title: "Editar usuario",
      html: `
      <form class="text-left space-y-4">
        <div class="flex flex-col">
          <label class="font-semibold">Nombre</label>
          <input id="name_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.name
          }"/>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Apellido</label>
          <input id="last_name_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.last_name
          }"/>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Username</label>
          <input id="username_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.username
          }"/>
        </div>
        <div class="flex flex-col space-y-2">
          <label class="font-semibold">Roles</label>
          <select id="group_id" class="select-modal" value="${groups}" onChange=${(
        e
      ) => setGroups(e.target.value)}>
              <option>seleccionar rol</option>
                ${roles.map(
                  (role) =>
                    `<option key=${role.id} value=${role.id}>${role.name}</option>`
                )}
          </select>
        </div>
        <div class="flex flex-row justify-between">
          <div>
            <label class="font-semibold">Desbloquear Usuario</label>
            <div class="flex flex-row items-center space-x-3">
              <input class="" id="unlock_user_id" value="0" type="checkbox">
              <p>Borrar Intentos</p>
            </div>
          </div>
          <div class="">
            <label class="font-semibold">Estado del Usuario</label>
            <div class="flex flex-row items-center space-x-3">
              <input class="" type="checkbox">
              <p>Activo</p>
            </div>
            <div class="flex flex-row items-center space-x-3">
              <input class="" type="checkbox">
              <p>Inactivo</p>
            </div>
          </div>
        </div>
      </form>
      `,
      focusConfirm: false,
      allowOutsideClick: true,
      backdrop: true,
      preConfirm: () => {
        const name = document.getElementById("name_id").value;
        const last_name = document.getElementById("last_name_id").value;
        const username = document.getElementById("username_id").value;
        const groups = document.getElementById("group_id").value;
        const state = document.getElementById("unlock_user_id").value;
        const credentials = { username, name, state, last_name, groups };
        try {
          fetch(users_URL + params.id + "/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(credentials),
          }).then(async function (response) {
            console.log(credentials);
            if (response.status === 200) {
              console.log("pai si funciono");
              Swal.fire({
                title: "success!",
                text: "Se edito correctamente el usuario!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
              {edited ? not_edited() : yes_edited()}
            } else {
              Swal.fire({
                title: "ERROR!",
                text: "No tiene permisos para editar usuarios!",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            }
          });
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro que deseas desactivar a este Usuario?",
      text: "No será posible retornar los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${users_URL}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }).then((response) => {
          if (response.status == 200) {
            console.log(response.status);
            setChanged(response.status);
            Swal.fire(
              "Borrado!",
              "El Usuario fue desactivado con exito.",
              "success"
            );
          } else {
            Swal.fire(
              "Hubo un problema!",
              "La petición fallo, no se pudo desactivar al Usuario",
              "error"
            );
          }
        });
      }
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getUsersData();
  }, [edited]);

  const columns = [
    {
      field: "id",
      width: 100,
      renderHeader: () => <Header text="Id" />,
    },
    {
      field: "username",
      width: 250,
      // editable: true,
      renderHeader: () => <Header text="E-mail" />,
    },
    {
      field: "name",
      width: 200,
      // editable: true,
      renderHeader: () => <Header text="Nombre(s)" />,
    },
    {
      field: "last_name",
      width: 240,
      // editable: true,
      renderHeader: () => <Header text="Apellido(s)" />,
    },
    {
      field: "groups",
      width: 200,
      // editable: true,
      renderHeader: () => <Header text="Roles" />,
    },
    {
      field: "try",
      width: 100,
      renderHeader: () => <Header text="Intentos" />,
    },
    {
      field: "estado",
      width: 150,
      renderHeader: () => <Header text="Estado" />,
      renderCell: (value) => {
        let myValue = value["value"];
        if (myValue == true) {
          return (
            <h3 className="flex flex-row items-center text-green-700">
              Activo <span className="text-3xl pl-2">•</span>{" "}
            </h3>
          );
        } else {
          return (
            <h3 className="flex flex-row items-center text-red-500">
              Inactivo <span className="text-3xl pl-2 ">•</span>{" "}
            </h3>
          );
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<BsPencilSquare size={15} />}
          label="Editar inversor"
          onClick={() => {
            setRowToChange(params.row);
            edit_user(params.row, roles);
          }}
        />,
        <GridActionsCellItem
          icon={<IoTrash size={15} />}
          label="Borrar usuario"
          onClick={() => deleteUser(params.id)}
        />,
      ],
    },
  ];

  return (
    <DataTable
      rows={users}
      columns={columns}
      loading={!users.length}
      onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const selectedRows = users.filter((row) => selectedIDs.has(row.id));
        console.log(selectedRows);
      }}
    />
  );
}
