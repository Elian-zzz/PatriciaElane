// Declaramos las constantes de las exrenciónes de node que voy a usar
import express from "express";
import path from "path";
import open from "open";
import cors from "cors";
// import { fileURLToPath } from "url";
const app = express();
const PUERTO = 5000;
import db from "./bd.mjs";

app.use(express.json()); // Middleware para JSON
app.use(cors()); // Permite el uso de CORS para debugingg y testing
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Servidor OK" });
});

//  = = = = = = C L I E N T E S = = = = = =

// Ingresar un nuevo cliente
app.post("/api/clientes", async (req, res) => {
  const { nom, referencia, direccion, contacto } = req.body;

  try {
    await db.query(
      "insert into cliente(nombre,referencia,direccion,contacto) values(?,?,?,?);",
      [nom, referencia, direccion, contacto]
    );
    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      error: "error al ingresar Cliente",
      detalle: error.message,
    });
  }
});

// Consutar clientes
app.get("/api/clientes", async (req, res) => {
  try {
    const [rows] = await db.query(
      "select id_cliente,nombre,referencia,direccion,contacto from cliente limit 7;"
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en la consulta", detalle: error.message });
  }
});

// Consultar cliente por nombre
app.get("/api/clientes/busqueda", async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) {
    return res.json({ success: false, error: "datos incompletos" });
  }
  try {
    const [rows] = await db.query(
      "select id_cliente,nombre,referencia,direccion,contacto from cliente where nombre like ? limit 15 ;",
      [nombre + "%"]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: "error en la consulta por nombre",
      detalle: error.message,
    });
  }
});

// Consultar si el nombre que ingrese un nuevo usuario ya existe en la BD
app.get("/api/clientes/consulta", async (req, res) => {
  // select nombre from cliente where nombre like ?;
  const { nombre } = req.query; // desestructura el objeto obtenido en la petición
  if (!nombre) {
    return res.json({ success: false, error: "datos incompletos" });
  }
  try {
    const [rows] = await db.query(
      "SELECT nombre,referencia FROM cliente WHERE nombre LIKE ?",
      nombre
    );
    res.json(rows); // Envía la respuesta de la BD en formato json
  } catch (error) {
    res.status(500).json({
      error: "error en la consulta de nombre a la BD",
      detalle: error.message,
    });
  }
});

// = = = = = = = = = = = = = = = = = = = = = = 



// = = = = = = P E D I D O S = = = = = =

// Ingresar un pedido
app.post("/api/pedidos", async (req, res) => {
  // tipo, descripcion,remuneracion, inicio,final

  const { id_cliente, tipo, descripcion, remuneracion, inicio, final } =
    req.body;

  if (
    !id_cliente ||
    !tipo ||
    !descripcion ||
    !remuneracion ||
    !inicio ||
    !final
  ) {
    return res.json({ success: false, error: "Datos incompletos" });
  }

  if (inicio > final || inicio === final) {
    return res.json({
      success: false,
      error:
        "El comienzo y el final deben de ser distintos, el inicio debe de ser menor que el final",
    });
  }

  try {
    const [result] = await db.query(
      "insert into pedido(id_cliente,tipo, descripcion,remuneracion, inicio,final) values(?,?,?,?,?,?);",
      [id_cliente, tipo, descripcion, remuneracion, inicio, final]
    );
    const idPedido = result.insertId;
    res.json({
      success: true,
      idPedido: idPedido,
      message: "Pedido creado exitosamente",
    });
  } catch (error) {
    res.json({
      success: false,
      error: "error al ingresar Pedido",
      detalle: error.message,
    });
  }
});

// Consutar pedidos
app.get("/api/pedidos", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT pedido.id_pedido, pedido.id_cliente, cliente.nombre AS nombre_cliente, pedido.tipo, pedido.descripcion, pedido.remuneracion,
        DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
        DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final
       FROM pedido
       JOIN cliente ON pedido.id_cliente = cliente.id_cliente
       LIMIT 7;`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

// Consultar pedido por nombre
app.get("/api/pedidos/consulta", async (req, res) => {
  // /api/consultarPedidoPorNombre?nombre=ejemplo
  const { nombre } = req.query;
  if (!nombre) {
    return res.json({ success: false, error: "datos incompletos" });
  }
  try {
    const [rows] = await db.query(
      `SELECT pedido.id_pedido, pedido.id_cliente, cliente.nombre AS nombre_cliente, pedido.tipo, pedido.descripcion, pedido.remuneracion,
        DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
        DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final
       FROM pedido
       JOIN cliente ON pedido.id_cliente = cliente.id_cliente 
       WHERE cliente.nombre LIKE ?
       LIMIT 20;`,
      /**/
      [nombre + "%"]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: "error en la consulta por nombre",
      detalle: error.message,
    });
  }
});



//  ========== ESTADO PEDIDOS ==========

// Ingresar estado de un pedido
app.post("/api/Estado-pedidos", async (req, res) => {
  console.log("consulta estado pedido");
  const { id_pedido, estado } = req.body;
  if (!id_pedido) {
    return res.json({ success: "false", error: "datos incompletos" });
  }
  try {
    await db.query("INSERT INTO estadoPedido(id_pedido,estado) VALUE(?,?);", [
      id_pedido,
      estado,
    ]);
    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      error: "Error al ingresar estado del pedido",
      detalle: error.message,
    });
  }
});

//  Actualizar estado de pedidos
app.put("/api/Estado-pedidos", async (req, res) => {
  console.log("consulta estado pedido");
  const { id_pedido, estado } = req.body;
  if (!id_pedido) {
    return res.json({ success: "false", error: "datos incompletos" });
  }
  try {
    await db.query("update estadoPedido set estado = ? where id_pedido = ?;", [
      estado,
      id_pedido,
    ]);
    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      error: "Error al ingresar estado del pedido",
      detalle: error.message,
    });
  }
});

// consultar estado de pedidos pendientes..
app.get("/api/Estado-pedidos/pendientes", async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT
  pedido.id_cliente,
  cliente.nombre AS nombre_cliente,
  pedido.id_pedido,
  pedido.tipo,
  pedido.descripcion,
  pedido.remuneracion,
  DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
  DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final,
  estadoPedido.estado
  FROM pedido
  JOIN cliente ON pedido.id_cliente = cliente.id_cliente
  JOIN estadoPedido ON pedido.id_pedido = estadoPedido.id_pedido 
  WHERE estado = "pendiente" LIMIT 15;`);
    res.json(rows);
  } catch (error) {
    console.error("Error detallado:" + error);
    res.status(500).json({
      error: "error al traer pedidos pendientes de la BD",
      detalle: error.message,
    });
  }
});

// consultar estado de pedidos concretados ...
app.get("/api/Estado-pedidos/concretados", async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT
  pedido.id_cliente,
  cliente.nombre AS nombre_cliente,
  pedido.id_pedido,
  pedido.tipo,
  pedido.descripcion,
  pedido.remuneracion,
  DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
  DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final,
  estadoPedido.estado
  FROM pedido
  JOIN cliente ON pedido.id_cliente = cliente.id_cliente
  JOIN estadoPedido ON pedido.id_pedido = estadoPedido.id_pedido 
  WHERE estado = "concretado" LIMIT 15;`);
    res.json(rows);
  } catch (error) {
    console.error("Error detallado:" + error);
    res.status(500).json({
      error: "error al traer pedidos pendientes de la BD",
      detalle: error.message,
    });
  }
});
// consultar pedidos último plazo
app.get("/api/Estado-pedidos/Ultimo-plazo", async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT
  pedido.id_cliente,
  cliente.nombre AS nombre_cliente,
  pedido.id_pedido,
  pedido.tipo,
  pedido.descripcion,
  pedido.remuneracion,
  DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
  DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final,
  estadoPedido.estado
FROM pedido
JOIN cliente ON pedido.id_cliente = cliente.id_cliente
JOIN estadoPedido ON pedido.id_pedido = estadoPedido.id_pedido WHERE estado = "pendiente" && final = curdate();
`);
    res.json(rows);
  } catch (error) {
    console.error("Error detallado:" + error);
    res.status(500).json({
      error: "error al traer pedidos ultimo plazo de la BD",
      detalle: error.message,
    });
  }
});

// ====================================

// = = = = = = = = = = = = = = = = = = = = = = 

// Escucha del servidor
app.listen(PUERTO, () => {
  console.log("Servidor PatWa escuchando en http://localhost:" + PUERTO);
  // open("http://localhost:" + PUERTO);
});
