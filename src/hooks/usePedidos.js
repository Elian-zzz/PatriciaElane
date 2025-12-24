import { useState, useEffect } from "react";
import { pedidosAPI } from "../services/api";

export default function usePedidos(initialQuery = null) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await pedidosAPI.consultarPedidos();
      setPedidos(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchByNombre = async (nombre) => {
    setLoading(true);
    setError(null);
    try {
      const res = await pedidosAPI.consultarPedidoPorNombre(nombre);
      setPedidos(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) fetchByNombre(initialQuery);
    else fetchPedidos();
  }, [initialQuery]);

  return { pedidos, loading, error, refetch: fetchPedidos, fetchByNombre };
}
