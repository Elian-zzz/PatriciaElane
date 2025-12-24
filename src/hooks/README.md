* Hooks (guía rápida para este proyecto)

> Rol: Profesor de Diseño Web Full Stack — explicación clara y práctica.

Este documento explica los hooks creados en `src/hooks`, cómo funcionan internamente y cómo usarlos en componentes React. Los hooks implementan llamadas a tu API centralizada en `src/services/api.js` usando `axios`.

## Archivos creados

- `useClientes.js` — obtiene la lista de clientes (`GET /api/clientes`). Expone `clientes`, `loading`, `error` y `refetch`.
- `usePedidos.js` — obtiene pedidos (`GET /api/pedidos`) y permite buscar por nombre de cliente (`GET /api/pedidos/consulta?nombre=...`). Expone `pedidos`, `loading`, `error`, `refetch` y `fetchByNombre`.

## Lógica general (qué hace cada hook)

- useState: almacena los datos (`clientes` o `pedidos`), el estado de carga (`loading`) y errores (`error`).
- useEffect: lanza la consulta inicial cuando el hook se monta. `usePedidos` acepta un parámetro opcional `initialQuery` para buscar por nombre al montarse.
- Funciones de fetch: encapsulan las llamadas a `clientesAPI` / `pedidosAPI`. Manejan `try/catch/finally` para actualizar `loading` y `error`.
- Reutilización: el hook devuelve un `refetch` para volver a cargar datos y (en `usePedidos`) `fetchByNombre` para búsquedas dirigidas desde el componente.

## Cómo usarlos en un componente (ejemplos)

1) Ejemplo con `useClientes` — listar clientes:

```jsx
import React from 'react';
import useClientes from '../hooks/useClientes';

export default function ClientesList() {
  const { clientes, loading, error, refetch } = useClientes();

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return (
    <div>
      Error: {error.message}
      <button onClick={refetch}>Reintentar</button>
    </div>
  );

  return (
    <ul>
      {clientes.map(c => (
        <li key={c.id_cliente}>{c.nombre} — {c.referencia}</li>
      ))}
    </ul>
  );
}
```

Notas: `clientes` proviene directamente de la respuesta del servidor; el hook setea `res.data || []` para asegurar un arreglo.

2) Ejemplo con `usePedidos` — listar y buscar por nombre:

```jsx
import React, { useState } from 'react';
import usePedidos from '../hooks/usePedidos';

export default function PedidosList() {
  const [q, setQ] = useState('');
  const { pedidos, loading, error, fetchByNombre, refetch } = usePedidos();

  const handleSearch = () => {
    if (!q) return refetch();
    fetchByNombre(q);
  };

  return (
    <div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Nombre cliente" />
      <button onClick={handleSearch}>Buscar</button>
      {loading && <div>Cargando pedidos...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {pedidos.map(p => (
          <li key={p.id_pedido}>{p.nombre_cliente} — {p.descripcion}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Buenas prácticas y consejos (como profesor)

- Normaliza los nombres de los campos que esperas del servidor (por ejemplo `id_cliente`, `nombre`, `id_pedido`). Asegúrate de que las propiedades que mapeas existen en la respuesta.
- Maneja estados `loading` y `error` en la UI para buena experiencia de usuario.
- Si vas a hacer mutaciones (crear/actualizar/eliminar), crea hooks separados (`useCrearCliente`, `useActualizarPedido`) o agrega funciones en los hooks existentes que usen `useCallback` para estabilidad.
- Considera usar React Query / TanStack Query si quieres caching automático, reintentos y sincronización sencilla.
- Centraliza el manejo de tokens/errores con `axios` interceptors dentro de `src/services/api.js`.

## Testing rápido

- Para tests unitarios, mockea las respuestas de `axios` (p. ej. con `jest.mock('axios')`) o mockea `src/services/api.js` para devolver promesas controladas.

## Ejercicio sugerido (práctica para ti)

1. Implementa `useEstadoPedidos` siguiendo los ejemplos: debe consultar `GET /api/Estado-pedidos/pendientes` y `/concretados` o `/Ultimo-plazo` según necesites.
2. Añade funciones para actualizar estado (`PUT /api/Estado-pedidos`) y para ingresar (`POST /api/Estado-pedidos`) si quieres realizar cambios desde UI.

Pista: copia la estructura de `usePedidos`, cambia el recurso importado a `estadoPedidosAPI` (si lo añades a `src/services/api.js`) y ajusta las propiedades que mapeas.

---

Si quieres, puedo crear `useEstadoPedidos.js` también o mostrarte cómo añadir interceptores en `src/services/api.js`. ¿Qué prefieres que haga ahora? 
