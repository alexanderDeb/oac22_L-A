import React, { useEffect } from "react";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import Image from "../../assets/images/Home_image.jpg";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - OAC22";
  }, []);

  return (
    <div className="mb-5 ">
      <div>
        <NavBar />
        {window.sessionStorage.getItem("token") ? <SideBar /> : <p>&nbsp;</p>}
      </div>
      <div className="pt-20 pl-12 pr-4 w-full h-full px-10 lg:px-40 xl:20 2xl:px-60 space-y-4">
        <p className="text-2xl text-start font-bold text-green-500">
          Sensores de ambiente
        </p>
        <div className="">
          <hr />
        </div>
        <div className="flex flex-col xl:flex-row py-5 text-center justify-center space-y-5 xl:space-y-0 xl:space-x-10">
          <img className="w-full xl:w-1/2 h-auto" src={Image} alt="..." />
          <p className="text-justify w-full xl:w-1/2">
            El Departamento Administrativo de Gestión del Medio Ambiente “DAGMA”, es la máxima autoridad ambiental en el Municipio de Cali y, como tal,
            será el organismo técnico director de la gestión del medio ambiente y de los recursos naturales, responsable de la política y de la acción
            ambiental encargada de aplicar las normas de la Constitución Política, del Decreto 2811 de 1974, de la Ley 99 de 1993, la Ley 388 de 1997 y
            de los decretos que reglamenten, adicionen o modifiquen la materia; y, de mantener y de preservar los parques y las zonas verdes, así como de
            la arborización y ornato del Municipio de Cali.(Acuerdo 01/96, Artículo 94 y 190).{" "}
          </p>
        </div>

        <div className="">
          <hr />
        </div>

        <div className="flex flex-col xl:flex-row py-5 text-center justify-center space-y-5 xl:space-y-0 xl:space-x-10">
          <p className="text-justify">
            El Departamento Administrativo de Gestión del Medio Ambiente – DAGMA, es una entidad del municipio de Santiago de Cali, creada mediante el Acuerdo
            Municipal No. 18 de diciembre 30 de 1994 y con la misión y funciones atribuidas a partir del Decreto 0203 de 2001.  Este en su Libro Cinco (Del Sistema de Gestión Ambiental),
            define lo siguiente:
            Título I - Los principios y fundamentos de la política de gestión ambiental municipal: Principios generales de la política y Fundamentos del sistema de gestión ambiental Municipal.
            Título II - Del sistema de Gestión Ambiental Municipal: Definición del sistema; Visión y Misión del sistema; Componentes del sistema; Subsistemas del sistema de gestión; Funciones 
            genéricas de los subsistemas; Comités técnicos de los subsistemas; Entorno del sistema.{" "}
          </p>
          <img className="w-full xl:w-1/2 h-auto" src={Image} alt="..." />
        </div>

        <div className="">
          <hr />
        </div>
      </div>

      {/* <h3>HOLA SOY EL HOMEPAGE</h3> */}
    </div>
  );
}
