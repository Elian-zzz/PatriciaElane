// Declaramos las constantes de las exrenciónes de node que voy a usar
const express = require("express");
const path = require("path");
const app = express();
const PUERTO = 3000;
const db = require("./bd");

app.use(express.json()); // Middleware para JSON

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "raiz.html"));
});
// Ingresar un nuevo cliente
app.post("/api/nuevoCliente", async (req, res) => {
  const { nom, referencia, direccion, contacto } = req.body;
  if (!nom || !referencia || !direccion || !contacto) {
    return res.json({ success: false, error: "datos incompletos" });
  }
  try {
    await db.query(
      "insert into cliente(nombre,referencia,direccion,contacto) values(?,?,?,?);",
      [nom, referencia, direccion, contacto]
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: "error al ingresar Cliente" });
  }
});

app.get("/api/consultarClientes", async (req, res) => {
  try {
    const [rows] = await db.query(
      "select id_cliente,nombre,referencia,direccion,contacto from cliente limit 4;"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/api/consultarPedidos", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT pedido.id_pedido, pedido.id_cliente, cliente.nombre AS nombre_cliente, pedido.tipo, pedido.descripcion, pedido.remuneracion,
        DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
        DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final
       FROM pedido
       JOIN cliente ON pedido.id_cliente = cliente.id_cliente
       LIMIT 4;`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/api/consultarClientePorNombre", async (req, res) => {
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
    res.status(500).json({ error: "error en la consulta por nombre" });
  }
});

app.get("/api/consultarPedidoPorNombre", async (req, res) => {
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
       LIMIT 10;`,
      /**/
      [nombre + "%"]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "error en la consulta por nombre" });
  }
});

app.post("/api/ingresarPedido", async (req, res) => {
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
    return res.json({ success: false, error: "datos incompletos" });
  }
  try {
    await db.query(
      "insert into pedido(id_cliente,tipo, descripcion,remuneracion, inicio,final) values(?,?,?,?,?,?);",
      [id_cliente, tipo, descripcion, remuneracion, inicio, final]
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: "error al ingresar Pedido" });
  }
});

app.listen(PUERTO, () => {
  console.log("Servidor PatWa escuchando en http://localhost:" + PUERTO);
});
