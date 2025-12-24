import React from "react";
import "../styles/index.css";
import Button from "../UI/button/button";
import Paragraph from "../UI/paragraph/paragraph";
export default function SideBar(){
    return(
        <aside>
  {/* Contenedor donde el usuario será alcamenado al hacer click */}

  <Button children={"ESTADO PEDIDOS"} id={"consultarEP"} />
  
  <Button children={"ULTIMOS PLAZOS"} id={"consultarUP"}/>
  <details>
    <summary>Clientes</summary>
    <Paragraph cls={"sumP"} id={"nuevoC"} children={"Nuevo"}/>
    <Paragraph cls={"sumP"} id={"consultarC"} children={"Consultar"}/>
    <Paragraph cls={"sumP"} id={"eliminarC"} children={"Eliminar"}/>
  </details>
  <details>
    <summary>Pedidos</summary>
    <Paragraph cls={"sumP"} id={"nuevoP"} children={"Nuevo"}/>
    <Paragraph cls={"sumP"} id={"consultarP"} children={"Consultar"}/>
    <Paragraph cls={"sumP"} id={"eliminarP"} children={"Eliminar"}/>
  </details>
</aside>

    );
}