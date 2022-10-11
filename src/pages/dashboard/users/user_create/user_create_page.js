import React, { useState, useEffect } from 'react'
import NavBar from '../../../../components/navbar/navbar'
import SideBar from '../../../../components/sidebar/sidebar'
import { users_URL, groups_URL } from '../../../../services/urls';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from "../../../../assets/logos/oac_logo.png"

export default function UserCreate() {

  const url = users_URL;
  const urlGroup = groups_URL;
  const token = window.sessionStorage.getItem("token");

  const [name, setName] = useState("");
  let navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  const credentials = { name, last_name, username, password, groups };


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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
      }).then(async function (response) {
        if (response.status === 201) {
          Swal.fire({
            title: "REGISTRO CORRECTO",
            text: "Se registro el usuario con exito",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
          });
          navigate("../dashboard", { replace: true });
        } else {
          window.sessionStorage.removeItem("credentials");
          Swal.fire({
            title: "ERROR!",
            text: "No se logro registrar el usuario!",
            icon: "error",
            confirmButtonText: "Reintentar",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Hubo un error!",
        icon: "error",
        confirmButtonText: "Intentar",
      });
      console.error(error);
    }
  };

  return (
    <div className='h-screen'>
      <div>
        <NavBar />
        <SideBar />
      </div>
      <div className='flex flex-col mt-20 pl-12 pr-2 w-full h-full space-y-4 items-center justify-center'>
        <div className='mb-6'>
          <img src={Logo} alt="..." width={200} height={70} />
        </div>
        <div className='w-1/2 space-y-6'>
          <div className="col-6 space-x-2">
            <label className="text-start">
              Nombre:
            </label>
            <input
              type="text"
              className="px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm"
              id="name"
              placeholder="Ingresa tu nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-6 space-x-2">
            <label className="text-start">
              Apellido:
            </label>
            <input
              type="text"
              className="px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm"
              id="last_name"
              placeholder="Ingresa tu apellido"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="col-12 space-x-2">
            <label className="text-start">
              Correo:
            </label>
            <input
              type="email"
              className="px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm"
              id="username"
              placeholder="Ingresa tu correo electronico"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12 space-x-2">
            <label className="text-start">
              Contraseña:
            </label>
            <input
              type="password"
              className="px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm"
              id="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 space-x-2">
            <label className="text-start">
              Roles:
            </label>
            <select
              className="rounded-lg border px-20 py-3 border-slate-300"
              id="groups"
              name="groups"
              value={groups}
              onChange={(e) => setGroups(e.target.value)}
            >
              <option disabled>seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center py-6">
            <button className="px-10 hover:px-12 py-2 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-md" href="dashboard/users/list" onClick={handleSubmit}>Enviar</button>
          </div>

        </div>
      </div>

    </div>
  )
}
