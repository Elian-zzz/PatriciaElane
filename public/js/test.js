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
