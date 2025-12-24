import { useState, useEffect } from "react";
import { clientesAPI } from "../services/api";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await clientesAPI.consultarClientes();
      setClientes(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, error, refetch: fetchClientes };
}
