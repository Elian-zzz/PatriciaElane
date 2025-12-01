// ⚠️ ❌ ✅

class ManipulacionDOM {
  constructor(main) {
    this.main = main;
  }
  // crea un formulario de registro de nuevos clientes
  crearFormularioNuevoCLiente() {
    this.main.innerHTML = `<form id="fomrNuevoC">
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
  }
  // crea un formulario para la busqueda de clientes existentes
  crearFormularioBuscarCliente() {
    this.main.innerHTML =
      '<h1>Buscar Clientes</h1><div class="contenedorV"><input type="text" id="inputABC" class="inputBC" /><button id="btnBC" >Buscar Cliente</button></div><div id="resulABC"></div>';
  }
  /**
   *
   * @param {class} manAPI - clase para manipular la fecha actual
   * @param {Array} data - arreglo retornado desde la base de datos
   * @returns - DOM interface
   */

  crearCartaConsultaUltimosPlazos(manAPI, dato) {
    // id_cliente,nombre_cliente,id_pedido,tipo,descripcion,remuneracion,inicio,final,estado
    this.main.innerHTML = "";

    let arreglo = [
      "nombre_cliente",
      "id_pedido",
      "tipo",
      "descripcion",
      "remuneracion",
      "inicio",
      "final",
    ];
    if (manAPI.tieneParametrosRequeridos(dato, arreglo)) {
      // si no tiene los parametros requeridos, significa que está vacío
      return (this.main.innerHTML =
        "<div class='alerta'>No hay pedidos pendientes para el día de hoy</div>");
    }

    const lista = document.createElement("ul");
    const recipiente = document.createElement("div");
    recipiente.classList.add("contenedor", "PedidoUltimoDia");
    recipiente.innerHTML = `<h4>ULTIMO PLAZO de pedidos de hoy ${manAPI.obtenerFechaActual(
      0
    )}</h4>`;
    dato.forEach((pedido) => {
      const elemento = document.createElement("li");
      elemento.innerHTML = `
        <span nombre> ${pedido.nombre_cliente}</span>
        <span colin>Tipo: ${pedido.tipo}</span>
        <span colpar>Inicio: ${pedido.inicio}</span>
        <span colin>Final: ${pedido.final}</span>
        <span colpar>Estado: ${pedido.estado}</span>
        <span colin>Descripción: ${pedido.descripcion}</span>
        <span class="respuesta"><mark>Remuneración: ${pedido.remuneracion} </mark></span>
`;
      lista.appendChild(elemento);
    });

    recipiente.appendChild(lista);
    this.main.appendChild(recipiente);
  }

  crearElementoLista(pedido) {
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
        <!-- <button class="btnEP" value="${pedido.id_pedido}">eliminar</button> -->
        `;
    return item;
  }

  buscarPedidoPorNombre() {
    this.main.innerHTML =
      '<h1>Buscar Pedidos</h1><div class="contenedorV"><input type="text" id="inputABP" class="inputBP" /><button id="btnBP" title="buscar pedido por nombre de cliente">Buscar Pedido</button></div> <div class="contenedorV"><input type="date" id="inptDateCP"></div><div id="resulABP"></div>';
  }

  nuevoPedido(manAPI) {
    this.main.innerHTML = `<form id="fomrNuevoP">
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
          <input type="date" id="inicioNP" value="${manAPI.obtenerFechaActual(
            0
          )}" required />
        </div>
        <div class="contenedor">
          <label>final</label>
          <input type="date" id="finalNP" value="${manAPI.obtenerFechaActual(
            1
          )}" required />
        </div>
        <button type="button" id="btnNP">Crear nuevo pedido</button>
        <!-- btnNuevoCliente-->
      </form>`;
  }
}
class ManipulacionAPI {
  constructor() {
    this.apartadoCliente = false; // Cuando se construya el apartado de clientes cambiará de estado a true (es lo que hay hasta la implementación de react).
  }

  /**
   *
   * @param {array} arreglo
   * @param {array} parametrosRequeridos
   */

  tieneParametrosRequeridos(arreglo, parametrosRequeridos) {
    return arreglo.every((objeto) => {
      return parametrosRequeridos.every((parametro) => {
        objeto.hasOwnProperty(parametro);
      }); //true o false
    });
  }

  //  método privado para crear un nuevo cliente en la base de datos
  async #crearCliente() {
    return await fetch("/api/nuevoCliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.nuevoCliente),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(
            "✅ Cliente (" + this.nuevoCliente.nom + ") agregado correctamente"
          );
          document.getElementById("fomrNuevoC").reset();
        }
      });
  }

  /**
   *
   * @param {object} nuevoCliente - Objeto que recibe los valores del cliente
   * @returns Crea un nuevo cliente
   */
  // metodo que verifica que el nombre del nuevo cliente no exista en la base de datos
  async consultarClientesExistentes(nuevoCliente) {
    // Verificaciónes exaustivas sobre el objeto que contiene la información del cliente
    if (
      !nuevoCliente &&
      // Evalúa por cada elemento del objeto las condiciónes establecidas
      Object.values(nuevoCliente).every(
        (dato) => dato !== undefined && dato !== null && dato !== ""
      )
    ) {
      return alert(
        "❌ Debes de completar todos los datos del formulario de clientes"
      );
    }
    this.nuevoCliente = nuevoCliente;
    await fetch("/api/consultarNombreClientes?nombre=" + this.nuevoCliente.nom)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data)) {
          console.error("Información invalida retornada de la BD");
        }
        if (data.length !== 0) {
          data.forEach((elemento) => {
            const SiNo = confirm(
              `⚠️ El siguiente cliente (${elemento.nombre}) con la referencia (${elemento.referencia}) ya existe en la Base de Datos, ¿deseas crearlo de todas formas?`
            );
            if (SiNo) {
              return this.#crearCliente();
            } else {
              alert(
                `❌ Creación del cliente ${this.nuevoCliente.nom} cancelada`
              );

              document.getElementById("fomrNuevoC").reset();
            }
          });
        } else {
          console.log("Sin omologo en la BD");
          return this.#crearCliente();
        }
      })
      .catch((error) => {
        alert("❌ error: " + error);
        console.error("error: ( " + error + " ) ");
      });
  }

  /**
   *
   * @param {Number} masDia - Numero de dias a agregar a la fecha actual
   * @returns {string} Fecha parseada en formato YYYY-mm-dd
   */
  // Metodo que obtiene la fecha actual
  obtenerFechaActual(masDia = 0) {
    let fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + masDia);
    let año = fechaActual.getFullYear();
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    let dia = fechaActual.getDate().toString().padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }

  // Metodo que busca a clientes por su nombre
  buscarClientePorNombre(inputBC) {
    this.contResul.innerHTML = "";

    fetch("/api/consultarClientePorNombre?nombre=" + inputBC.value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
          this.contResul.innerHTML =
            "<p class='alerta'>⚠️ No hay clientes disponibles</p>";
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
        <button class="botonCliente">COPIAR CLIENTE</button>
        `;
          lista.appendChild(item);
        });
        this.contResul.appendChild(lista);
      });
    window.addEventListener("DOMContentLoaded", this.#obtenerDatosDeClientes());
  }

/* 

============================ 
= MÉTODO EN IMPLEMENTACIÓN =
============================
- Al clickear las cartas de 
 clientes se obtenga el nombre
 y el id del cliente y se impriman 
 en el recuadro de usuario 
 almacenado

#obtenerDatosDeClientes(){...}
Por ahora los estilos están bien,
actualmente ocurren problemas al 
obtener al manipular la Información
del nodo padre.
*/
  #obtenerDatosDeClientes() {
    console.log("Ejecutando función de reconocimiento de clientes");
    const btnCopiarClientes = document.querySelectorAll(".botonCliente");
    console.log("=> debugging variable: " + btnCopiarClientes);

    btnCopiarClientes.forEach((btn) => console.log(btn.parentNode));
  }

  // metodo que consulta todos los clientes con un limite de 15 para imprimir en la pre busqueda
  consultarCLientes(contResul) {
    this.contResul = contResul;
    fetch("/api/consultarClientes")
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          this.contResul.innerHTML = "<p>No hay clientes disponibles</p>";
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
        <button class="botonCliente">COPIAR CLIENTE</button>
        `;
          lista.appendChild(item);
        });
        this.contResul.appendChild(lista);
      });
    window.addEventListener("DOMContentLoaded", this.#obtenerDatosDeClientes());
  }

  consultarPedidos(contResul) {
    this.apartadoCliente = false;
    this.contResul = contResul;
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
  }

  consultarPedidosPorNombreCLiente(inputBP) {
    this.contResul.innerHTML = "";

    fetch("/api/consultarPedidoPorNombre?nombre=" + inputBP.value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
          this.contResul.innerHTML =
            "<p class='alerta'>No hay pedidos disponibles</p>";
          return;
        }
        const lista = document.createElement("ul");
        lista.className = "pedidos";
        data.forEach((pedido) => {
          lista.appendChild(manDOM.crearElementoLista(pedido));
        });
        this.contResul.appendChild(lista);
        // const btnEliminarPedido = document.getElementsByClassName("btnEP");
        // for (let btn of btnEliminarPedido) {
        //   btn.addEventListener("click", () => {
        //     alert("btn eliminar apretado, id a eliminar: " + btn.value);
        //   });
        // }
      });
  }

  /**
   *
   * @param {object} nuevoPedido
   */

  crearNuevoPedido(nuevoPedido) {
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

        alert("✅ Pedido Agregado correctamente");

        return fetch("/api/ingresarEstadoPedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_pedido: idPedido,
            estado: "pendiente",
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          throw new Error("Error al ingresar estado del pedido");
        }

        console.log("Pedido agregado con estado y todo chaval");
        document.getElementById("fomrNuevoP").reset();
      })
      .catch((error) => {
        console.error("Error completo:", error);

        alert("❌ error: " + error);
      });
  }

  async consultarPedidosUltimoPlazo() {
    fetch("/api/pedidosUltimoPlazo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud http");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          return console.error("tipo de datos erroneos retornados de la BD");
        }

        // id_cliente,nombre_cliente,id_pedido,tipo,descripcion,remuneracion,inicio,final,estado
        console.log("debbuging desde la clase: " + data);
        manDOM.crearCartaConsultaUltimosPlazos(this, data);
      })
      .catch((error) => {
        console.error(
          "ERROR EN EL FETCH (consultarPedidosUltimoPlazo): " + error
        );
      });
  }

  cambiarEstadoPedido(idpedido) {
    fetch("/api/actualizarEstadoPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pedido: idpedido,
        estado: "concretado",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición http de cambiar estado pedido");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("✅ Pedido agregado correctamente, id:" + idpedido);
          btnCEP.click();
        }
      })
      .catch((error) => {
        console.error("Error: " + error);

        alert("❌ error: " + error);
      });
  }
}

//  ==================================== COMIENZO DE CODÍGO FUERA DE CLASES ==================================

// main
const main = document.querySelector("main");

// btn Crear nuevo cliente
const op_nuevo_cliente = document.getElementById("nuevoC");
const op_consultar_cliente = document.getElementById("consultarC");
const op_eliminar_cliente = document.getElementById("eliminarC");

//  botónes de pedido
const op_nuevo_pedido = document.getElementById("nuevoP");
const op_consultar_pedido = document.getElementById("consultarP");
const op_eliminar_pedido = document.getElementById("eliminarP");

// botónes aparte
const btnCEP = document.getElementById("consultarEP");
const btnCUP = document.getElementById("consultarUP");

const manDOM = new ManipulacionDOM(main);
const manAPI = new ManipulacionAPI();

// Función para obtener fecha actual con parametro para agregar días desde la fecha actual

// Botón crear nuevo cliente
op_nuevo_cliente.addEventListener("click", () => {
  // Función de manejo del DOM para la creación del formulario crear nuevo cliente

  manDOM.crearFormularioNuevoCLiente();
  // Obtenemos los elementos DOM del formulario
  const btn_crear_cliente = document.getElementById("btnNC");

  btn_crear_cliente.addEventListener("click", async () => {
    const nuevoCliente = {
      nom: document.getElementById("nombreNC").value,
      referencia: document.getElementById("referenciaNC").value,
      direccion: document.getElementById("direccionNC").value,
      contacto: document.getElementById("contactoNC").value,
    };

    manAPI.consultarClientesExistentes(nuevoCliente);
  });
});
// Consultar clientes
op_consultar_cliente.addEventListener("click", () => {
  manDOM.crearFormularioBuscarCliente();

  const inputBC = document.getElementById("inputABC");

  let btnbuscar = document.getElementById("btnBC");
  //   principio de busqueda dinamica, falta backend

  const contResul = document.getElementById("resulABC");

  btnbuscar.addEventListener("click", () => {
    // buscar cliente
    if (!inputBC || inputBC.value === "") {
      contResul.innerHTML = "";
      return (contResul.innerHTML =
        "<p class='alerta'>⚠️ Debes de ingresar un cliente para consultar </p>");
    } else {
      manAPI.buscarClientePorNombre(inputBC);
    }
  });

  // Consultar clientes
  manAPI.consultarCLientes(contResul);
});

// Consultar pedido
op_consultar_pedido.addEventListener("click", () => {
  //consultar pedido
  manDOM.buscarPedidoPorNombre();

  const inputBP = document.getElementById("inputABP");

  let btnbuscar = document.getElementById("btnBP");
  //   principio de busqueda dinamica, falta backend

  const contResul = document.getElementById("resulABP");
  // Buscar pedidos por nombre
  btnbuscar.addEventListener("click", () => {
    // buscar pedidos por nombre CLiente

    if (!inputBP || inputBP.value === "") {
      contResul.innerHTML = "";
      return (contResul.innerHTML =
        "<p class='alerta'>⚠️ Debes de ingresar el nombre de un cliente para consultar sus pedidos</p>");
    } else {
      manAPI.consultarPedidosPorNombreCLiente(inputBP);
    }
  });
  manAPI.consultarPedidos(contResul);
});

op_nuevo_pedido.addEventListener("click", () => {
  // nuevo edido
  manDOM.nuevoPedido(manAPI);

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

    manAPI.crearNuevoPedido(nuevoPedido);
  });
});

// Consultar Estado de Pedidos
btnCEP.addEventListener("click", async () => {
  main.innerHTML = `
  <h1>Estado Pedidos</h1>
  <div id="contenedor"> 
  <div id="contP" class="contenedor" contEstado><h2 tituloUwu Pendiente>Pendientes</h2>
  </div>
  <div id="contC" class="contenedor" contEstado><h2 tituloUwu Concretado>Concretados</h2>
  </div>
  </div>
  `.trim();

  /**
   * @param {HTMLElement} obj - El objeto DOM que se va a procesar
   */

  // botonActualizarEstadoPedido

  function crearElementoPedido(pedido) {
    const nuevaData = document.createElement("div");
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
    // class="btnActualizarEP" = clase de los botónes para actualizar el estado de los pedido de pendientes a concreatdos

    return nuevaData;
  }
  function crearElementoPedidoCB(pedido) {
    const nuevaData = document.createElement("div");
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
            <span colin><button class="btnActualizarEP" value="${pedido.id_pedido}">Actualizar estado pedido</button></span>
            </div>
        `;
    // class="btnActualizarEP" = clase de los botónes para actualizar el estado de los pedido de pendientes a concreatdos

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
        // variable auxiliar
        contenedorP.appendChild(crearElementoPedidoCB(pedido));
      });
      //  BotontesActualizarEstadoPedido
      const botonesAEP = document.querySelectorAll(".btnActualizarEP");
      botonesAEP.forEach((boton) => {
        boton.addEventListener("click", () => {
          manAPI.cambiarEstadoPedido(boton.value);
        });
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
btnCUP.addEventListener("click", async () => {
  await manAPI.consultarPedidosUltimoPlazo();
});
