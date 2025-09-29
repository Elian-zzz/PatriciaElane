// const { response } = require("express");

// main
const main = document.querySelector("main");
// opciones de cliente
const op_nuevo_cliente = document.getElementById("nuevoC");
// btn Crear nuevo cliente
const op_consultar_cliente = document.getElementById("consultarC");
const op_eliminar_cliente = document.getElementById("eliminarC");

//  botónes de pedido
const op_nuevo_pedido = document.getElementById("nuevoP");
const op_consultar_pedido = document.getElementById("consultarP");
const op_eliminar_pedido = document.getElementById("eliminarP");

function obtenerFechaActual(masDia = 0) {
  let fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + masDia);
  let año = fechaActual.getFullYear();
  let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  let dia = fechaActual.getDate().toString().padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

// AL apretar botones cliente
op_nuevo_cliente.addEventListener("click", () => {
  main.innerHTML = `<form id="fomrNuevoC">
        <h1>Crear nuevo cliente</h1>
        <div class="contenedor">
          <label>Nombre</label>
          <input type="text" id="nombreNC" required />
        </div>
        <div class="contenedor">
          <label>Apellido/Referencia</label
          ><input type="text" id="referenciaNC" required />
        </div>
        <div class="contenedor">
          <label>Dirección</label>
          <input type="text" id="direccionNC" required />
        </div>
        <div class="contenedor">
          <label>Contacto</label>
          <input type="text" id="contactoNC" required />
        </div>
        <button type="button" id="btnNC">Crear nuevo cliente</button>
        <!-- btnNuevoPedido-->
      </form>`;
  const btn_crear_cliente = document.getElementById("btnNC");
  btn_crear_cliente.addEventListener("click", () => {
    let nombreC = document.getElementById("nombreNC");
    let referenciaC = document.getElementById("referenciaNC");
    let direccionC = document.getElementById("direccionNC");
    let contactoC = document.getElementById("contactoNC");
    const nuevoCliente = {
      nom: nombreC.value,
      referencia: referenciaC.value,
      direccion: direccionC.value,
      contacto: contactoC.value,
    };
    fetch("/api/nuevoCliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCliente),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Cliente agregado correctamente");
          btn_crear_cliente.parentNode.reset();
        }
      });
  });
});

op_consultar_cliente.addEventListener("click", () => {
  // Terminar busqueda dinamica por nombre de cliente

  main.innerHTML =
    '<div class="contenedorV"><input type="text" id="inputABC" class="inputBC" /><button id="btnBC" >Buscar Cliente</button></div><div id="resulABC"></div>';
  const inputBC = document.getElementById("inputABC");

  let btnbuscar = document.getElementById("btnBC");
  //   principio de busqueda dinamica, falta backend

  const contResul = document.getElementById("resulABC");

  btnbuscar.addEventListener("click", () => {
    contResul.innerHTML = "";
    fetch("/api/consultarClientePorNombre?nombre=" + inputBC.value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
          contResul.innerHTML = "<p>No hay clientes disponibles</p>";
          return;
        }
        const lista = document.createElement("ul");
        lista.className = "clientes";
        data.forEach((cliente) => {
          const item = document.createElement("li");
          item.innerHTML = `
        <span class="respuesta nombre"> ${cliente.nombre} </span>
        <span class="respuesta">Referencia: ${cliente.referencia} </span>
        <span class="respuesta">Dirección: ${cliente.direccion} </span>
        <span class="respuesta">Contacto: ${cliente.contacto} </span>
        <span class="respuesta">ID: ${cliente.id_cliente} </span>
        `;
          lista.appendChild(item);
        });
        contResul.appendChild(lista);
      });
  });

  fetch("/api/consultarClientes")
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        contResul.innerHTML = "<p>No hay clientes disponibles</p>";
        return;
      }
      const lista = document.createElement("ul");
      lista.className = "clientes";
      data.forEach((cliente) => {
        const item = document.createElement("li");
        item.innerHTML = `
        <span class="respuesta nombre"> ${cliente.nombre} </span>
        <span class="respuesta">Referencia: ${cliente.referencia} </span>
        <span class="respuesta">Dirección: ${cliente.direccion} </span>
        <span class="respuesta">Contacto: ${cliente.contacto} </span>
        <span class="respuesta">ID: ${cliente.id_cliente} </span>
        `;
        lista.appendChild(item);
      });
      contResul.appendChild(lista);
    });
});

op_consultar_pedido.addEventListener("click", () => {
  main.innerHTML =
    '<div class="contenedorV"><input type="text" id="inputABP" class="inputBP" /><button id="btnBP" title="buscar pedido por nombre de cliente">Buscar Pedido</button></div> <div class="contenedorV"><input type="date" id="inptDateCP"></div><div id="resulABP"></div>';
  const inputBP = document.getElementById("inputABP");

  let btnbuscar = document.getElementById("btnBP");
  //   principio de busqueda dinamica, falta backend

  const contResul = document.getElementById("resulABP");

  btnbuscar.addEventListener("click", () => {
    contResul.innerHTML = "";
    fetch("/api/consultarPedidoPorNombre?nombre=" + inputBP.value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
          contResul.innerHTML = "<p>No hay clientes disponibles</p>";
          return;
        }
        const lista = document.createElement("ul");
        lista.className = "pedidos";
        data.forEach((pedido) => {
          const item = document.createElement("li");
          item.innerHTML = `
        <span class="respuesta nombre"> ${pedido.nombre_cliente} </span>
        <span class="respuesta">ID Cliente: ${pedido.id_cliente} </span>
        <span class="respuesta">ID Pedido: ${pedido.id_pedido} </span>
        <span class="respuesta">Tipo: ${pedido.tipo} </span>
        <span class="respuesta">Descripción: ${pedido.descripcion} </span>
        <span class="respuesta"><mark>Remuneración: ${pedido.remuneracion} </mark></span>
        <span class="respuesta">Fecha Inicio: ${pedido.inicio} </span>
        <span class="respuesta">Fecha Final: ${pedido.final} </span>
        <button class="btnEP" value="${pedido.id_pedido}">eliminar</button>
        `;
          lista.appendChild(item);
        });
        contResul.appendChild(lista);
        const btnEliminarPedido = document.getElementsByClassName("btnEP");
        for (let btn of btnEliminarPedido) {
          btn.addEventListener("click", () => {
            alert("btn eliminar apretado, id a eliminar: " + btn.value);
          });
        }
      });
  });

  fetch("/api/consultarPedidos")
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        contResul.innerHTML = "<p>No hay pedidos disponibles</p>";
        return;
      }
      const lista = document.createElement("ul");
      lista.className = "pedidos";
      data.forEach((pedido) => {
        const item = document.createElement("li");
        // id_pedido,id_cliente, tipo, descripcion,remuneracion, inicio,final
        item.innerHTML = `
  <span class="respuesta nombre"> ${pedido.nombre_cliente} </span>
  <span class="respuesta">ID Cliente: ${pedido.id_cliente} </span>
  <span class="respuesta">ID Pedido: ${pedido.id_pedido} </span>
  <span class="respuesta">Tipo: ${pedido.tipo} </span>
  <span class="respuesta">Descripción: ${pedido.descripcion} </span>
  <span class="respuesta"><mark>Remuneración: ${pedido.remuneracion} </mark></span>
  <span class="respuesta">Fecha Inicio: ${pedido.inicio} </span>
  <span class="respuesta">Fecha Final: ${pedido.final} </span>
`;
        lista.appendChild(item);
      });
      contResul.appendChild(lista);
    });
});

op_eliminar_cliente.addEventListener("click", () => {
  alert("btn eliminar cliente apretado");
});
//  Al apretar botones pedido
op_nuevo_pedido.addEventListener("click", () => {
  const fechaActual = obtenerFechaActual(0);

  // tipo, descripcion,remuneracion, inicio,final
  main.innerHTML = `<form id="fomrNuevoP">
        <h1>Crear nuevo pedido</h1>
        <div class="contenedor">
          <label>ID de Cliente</label>
          <input type="number" id="inptID" required>
        </div>
        <div class="contenedor">
          <label>Tipo</label>
          <select id="selctTipoP">
          <option value="arreglo" id="optANP" selected>Arreglo</option>
          <option value="hacer" id="optHNP">Hacer desde cero</option>
          </select>
        </div>
        <div class="contenedor">
          <label>Descripción</label>
          <textarea id="txtdetailsNP" cols="30" rows="10" required></textarea>
        </div>
        <div class="contenedor">
          <label>Remuneración</label>
          <input type="number" id="remuneracionNP" placeholder="200" required />
        </div>
        <div class="contenedor">
          <label>inicio</label>
          <input type="date" id="inicioNP" value="${fechaActual}" required />
        </div>
        <div class="contenedor">
          <label>final</label>
          <input type="date" id="finalNP" value="${obtenerFechaActual(
            1
          )}" required />
        </div>
        <button type="button" id="btnNP">Crear nuevo pedido</button>
        <!-- btnNuevoCliente-->
      </form>`;

  const btnNP = document.getElementById("btnNP");
  // Botón nuevo pedido
  btnNP.addEventListener("click", () => {
    // id_cliente, tipo, descripcion,remuneracion, inicio,final
    const nuevoPedido = {
      id_cliente: document.getElementById("inptID").value,
      tipo: document.getElementById("selctTipoP").value,
      descripcion: document.getElementById("txtdetailsNP").value,
      remuneracion: document.getElementById("remuneracionNP").value,
      inicio: document.getElementById("inicioNP").value,
      final: document.getElementById("finalNP").value,
    };
    fetch("/api/ingresarPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoPedido),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          throw new Error("Error al crear el pedido");
        }

        const idPedido = data.idPedido;
        alert("Pedido Agregado correctamente, id Pedido: " + idPedido);

        return fetch("/api/ingresarEstadoPedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_pedido: idPedido,
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          throw new Error("Error al ingresar estado del pedido");
        }

        console.log("Pedido agregado con estado y todo chaval");
        btnNP.parentNode.reset();
      })
      .catch((error) => {
        // 🔥 CORRECCIÓN: Catch GLOBAL que captura errores de AMBOS fetch
        console.error("Error completo:", error);
        alert("Detalles del error: " + error.message);
      });
  });
});

op_eliminar_pedido.addEventListener("click", () => {
  alert("btn eliminar pedido apretado");
});
// Consultar Estado de Pedidos
const btnCEP = document.getElementById("consultarEP");
btnCEP.addEventListener("click", async () => {
  main.innerHTML = `
  <div id="contenedor"> 
  <div id="contP" class="contenedor" contEstado><h2 tituloUwu Pendiente>Pendientes</h2>
</div>
  <div id="contC" class="contenedor" contEstado><h2 tituloUwu Concretado>Concretados</h2>
</div>
      </div>
  `.trim();

  function crearElementoPedido(pedido) {
    const nuevaData = document.createElement("div");
    nuevaData.className = "contenedor";
    nuevaData.innerHTML = `
          <div contAsistente class="contenedor">
            <span colin spanNombre>${pedido.nombre_cliente}</span>
            <span colpar>ID PEDIDO: <b resultado>${pedido.id_pedido}</b></span>
            <span colin>TIPO: <b resultado>${pedido.tipo}</b></span>
            <span colpar>INICIO: <b resultado>${pedido.inicio}</b></span>
            <span colin>FINAL: <b resultado>${pedido.final}</b></span>
            <span colpar>ESTADO:: <b resultado>${pedido.estado}</b></span>
            <span descripcion colin
              >DESCRIPCIÓN:
              <b resultado
                >${pedido.descripcion}</b
              >
            </span>
            <span colpar>REMUNERACIÓN: <b resultado>${pedido.remuneracion}</b></span>
          </div>
        `;

    return nuevaData;
  }

  const contenedorP = document.getElementById("contP");
  const contenedorC = document.getElementById("contC");

  try {
    const [responsePendientes, responseConcretados] = await Promise.all([
      fetch("/api/pedidosPendientes"),
      fetch("/api/pedidosConcretados"),
    ]);

    if (!responseConcretados || !responsePendientes) {
      throw new Error("Error en la respuesta HTTP");
    }

    const [dataPendientes, dataConcretados] = await Promise.all([
      responsePendientes.json(),
      responseConcretados.json(),
    ]);

    if (Array.isArray(dataPendientes)) {
      dataPendientes.forEach((pedido) => {
        contenedorP.appendChild(crearElementoPedido(pedido));
      });
    }

    if (Array.isArray(dataConcretados)) {
      dataConcretados.forEach((pedido) => {
        contenedorC.appendChild(crearElementoPedido(pedido));
      });
    }
  } catch (error) {
    console.error("Error Fetching pedidos " + error);
    main.innerHTML = `<div class="error">Error al cargar los pedidos: ${error.message}</div>`;
  }
});
