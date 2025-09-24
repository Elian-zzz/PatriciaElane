// main
const main = document.getElementById("main");
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
        <button type="button" id="btnNC">Crear nuevo pedido</button>
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

  btnNP.addEventListener("click", () => {
    // Obtenemos los valores para el fetch

    // Tipo de pedido
    const tipoP = document.getElementById("selctTipoP");
    // Descripción de pedido
    const descripcionP = document.getElementById("txtdetailsNP");
    // Remuneración de pedido
    const remuneracionP = document.getElementById("remuneracionNP");
    // Fecha de inicio
    const inicioP = document.getElementById("inicioNP");
    // Fecha de final
    const finalP = document.getElementById("finalNP");
    // input id de pedidof
    const inputC = document.getElementById("inptID");
    // Botón crear pedido
    // id_cliente, tipo, descripcion,remuneracion, inicio,final
    const nuevoPedido = {
      id_cliente: inputC.value,
      tipo: tipoP.value,
      descripcion: descripcionP.value,
      remuneracion: remuneracionP.value,
      inicio: inicioP.value,
      final: finalP.value,
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
        if (data.success) {
          alert("Pedido agregado correctamente");
          btnNP.parentNode.reset();
        }
      });
  });
});

op_eliminar_pedido.addEventListener("click", () => {
  alert("btn eliminar pedido apretado");
});
