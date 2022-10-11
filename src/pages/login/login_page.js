import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import '../componentes/styles/login.css';
// import image from "../assets/dagmalogo.png";
import oac_logo from "../../assets/logos/oac_logo.png"
import Swal from 'sweetalert2';
import { login_URL, users_URL } from '../../services/urls';


export default function LoginPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPasswords] = useState("");
  const url_GET = `${users_URL}${sessionStorage.getItem(
    "id"
  )}/`;
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    document.title = "Login - OAC22"
  }, [])
  
  useEffect(() => {
    if (token) {
      try {
        fetch(url_GET, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(async function (response) {
          if (response.status == 200) {
            const token = await response.json();
            Swal.fire({
              title: "Ya estas logueado",
              icon: "success",
              confirmButtonText: "ok",
            });
            navigate("/dashboard/", { replace: true });
          } else {
            window.sessionStorage.removeItem("credentials");
            console.log("Credenciales erroneas");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [sessionStorage.getItem("token")]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      fetch(login_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then(async function (response) {
        if (response.status === 200) {
          const data_usuario = await response.json();
          console.log(data_usuario);
          window.sessionStorage.setItem("name", data_usuario.user["name"]);
          window.sessionStorage.setItem("last_name", data_usuario.user["last_name"]);
          window.sessionStorage.setItem("groups", data_usuario.user["groups"]);
          window.sessionStorage.setItem("id", data_usuario.user["id"]);
          window.sessionStorage.setItem("token", data_usuario.token);
          window.sessionStorage.setItem(
            "username",
            data_usuario.user["username"]
          );
          
          Toast.fire({
            icon: 'success',
            title: 'Has ingresado con exito'
          })
          navigate("/dashboard/home", { replace: true });
        } else if (response.status === 400) {
          console.log("else de los if")
          window.sessionStorage.removeItem("credentials");
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            text: ' el usuario o la contraseña son incorrectas, despued de 3 intentos su usuario sera bloqueado',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (response.status === 409) {
          console.log("el ignorado del else")
          Swal.fire({
            position: 'top-center',
            icon: 'warning',
            title: 'Usuario bloqueado!',
            text: 'su usuario ha sido bloqueado debido a muchos intentos fallidos',
            showConfirmButton: false,
            timer: 2100
          })
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
    <div className='h-screen w-full bg-gray-100'>
      <div className='flex items-center justify-center h-full'>
        <form onSubmit={handleSubmit} className='flex flex-col bg-white w-full h-full md:w-1/2 md:h-1/2 justify-center rounded-md  text-center items-center space-y-10 shadow-md p-10'>
          <div className='w-1/2 lg:w-1/4'>
            <img src={oac_logo} alt="..." />
          </div>
          <div className='flex flex-col text-center justify-center items-center space-y-10 w-full'>
            <input type='email' className='px-4 py-2 w-full lg:w-1/2 border-b-2 text-sm text-gray-800 italic border-b-green-500  focus:outline-none placeholder:italic placeholder:text-sm' placeholder='example@gmail.com' value={username} required onChange={(e) => setUsername(e.target.value)} />
            <input type='password' className='px-4 py-2 w-full lg:w-1/2 border-b-2 italic border-b-green-500 focus:outline-none placeholder:italic placeholder:text-sm' placeholder='password' value={password} required onChange={(e) => setPasswords(e.target.value)} />
            <div className='flex flex-col justify-center items-center space-y-2 w-full'>
              <button type="submit" className='px-10 hover:px-12 py-2 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-md'>INGRESAR</button>
              <a className='italic text-green-600 text-sm hover:font-bold border-b border-b-green-500 transition-all' href="../Correorecovery">Recuperar password</a>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
}