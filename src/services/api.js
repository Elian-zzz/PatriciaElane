import axios from "axios";

// En desarrollo: proxy redirige a localhost:5000
// En producción: mismo servidor
const api = axios.create({
  baseURL: "/api",
});

export const clientesAPI = {
  // Creación de un cliente
  nuevoCliente: (data) => api.post("/clientes", data),

  // Consulta general de los clientes (limite 7)
  consultarClientes: () => api.get("/clientes"),

  // Busqueda de cliente por nombre (busqueda más especifica)
  busquedaClientes: (name) =>
    api.get(`/clientes/busqueda?nombre=${encodeURIComponent(name)}`),

  // Consulta si el nombre del cliente ya existe en la BD
  consultarSiNombreExiste: (name) =>
    api.get(`/clientes/consulta?nombre=${encodeURIComponent(name)}`),

  // actualizar: (id, datos) => api.put(`/pedidos/${id}`, datos),
  // eliminar: (id) => api.delete(`/pedidos/${id}`),
};

export const pedidosAPI = {
  // Creación de pedido
  crear: (data) => api.post("/pedidos", data),

  // Consultar pedidos general ( limite 7)
  consultarPedidos: () => api.get("/pedidos"),

  // Consulta pedido por nombre de cliente
  consultarPedidoPorNombre: (name) =>
    api.get(`/pedidos/consulta?nombre=${encodeURIComponent(name)}`),
};

export const estadoPedidosAPI = {
  // Ingresar estado de un pedido
  ingresarEstadoPedido: (data) => api.post("/Estado-pedidos", data),

  // Actualizar estado de pedidos
  actualizarEstadoPedido: (data) => api.put("/Estado-pedidos", data),

  // Consultar estado de pedidos pendientes..
  pedidosPendientes: () => api.get("/Estado-pedidos/pendientes"),

  // Consultar estado de pedidos concretados ...
  pedidosConcreatados: () => api.get("/Estado-pedidos/concretados"),

  // Consultar pedidos último plazo
  pedidosUltimoPlazo: () => api.get("/Estado-pedidos/Ultimo-plazo"),
};

export default api;
