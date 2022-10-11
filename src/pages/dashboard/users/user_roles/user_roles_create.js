import React, { useState, useEffect } from 'react'
import { permissions_URL, groups_URL } from '../../../../services/urls';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import SideBar from '../../../../components/sidebar/sidebar';
import NavBar from '../../../../components/navbar/navbar';
import Logo from "../../../../assets/logos/oac_logo.png"


export default function UserRolesCreate() {

  const urlGroup = permissions_URL;
  let navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");
  const [list_roles, SetListRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = window.sessionStorage.getItem("token");


  const getRoles = async () => {
    const response = await fetch(urlGroup, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setRoles(data);
    if (response.status === 401) {
      window.sessionStorage.clear();
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Tiempo inactivo',
        text: ' Se han vencido las credenciales porfavor vuelve a iniciar seccion ',
        showConfirmButton: false,
        timer: 3000
      });
      navigate("../login", { replace: true });
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (roles) {
      listingRoles()
    }
  }, [roles])

  const listingRoles = () => {
    let options = [...roles.map((role) => {
      return {
        "label": role.name,
        "value": role.id
      }
    })];
    SetListRoles(options)
  }

  const handlechange = (e) => {
    let permissions_request = [...e.map((e_value) => {
      return e_value.value
    })]
    setPermissions(permissions_request)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { name, permissions }
    if (permissions.length !== 0) {
      try {
        fetch(groups_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credentials),
        }).then(async function (response) {
          console.log("hola como estas pe");
          if (response.status === 201) {
            console.log("Si funciono papá");
            Swal.fire({
              title: "SE CREO EL GRUPO CON EXITO",
              text: "se logro crear el grupo exitosamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            console.log("no funciono pa");
            Swal.fire({
              title: "Credenciales Erroneas",
              text: "No se logro enviar el correo electronico",
              icon: "error",
              showConfirmButton: false,
              timer: 1200
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: "Faltan permisos",
        text: "No se añadieron permisos al nuevo Rol a crear",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className='h-screen'>
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className='h-full'>
        <div className='flex flex-col mt-20 pl-8 space-y-5 items-center justify-center text-center'>
          <div className='mb-6'>
            <img src={Logo} alt="..." width={200} height={70} />
          </div>
          <label className="block">Nombre del rol de usuario</label>
          <input
            type="text"
            className="px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block">selecciona los permisos que se desean añadir al rol</label>
          <div className='px-4 py-2 w-full lg:w-1/2 text-sm text-gray-800 italic focus:outline-none placeholder:italic placeholder:text-sm'>
            {roles ? <Select
              isMulti
              options={list_roles}
              onChange={handlechange}
            /> : <h5>No han llegado los roles mi papa</h5>}
          </div>

          <div className="mt-5 text-center">
            <button onClick={handleSubmit} type="submit" className="px-10 hover:px-12 py-2 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-md mt-7">ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  )
}
