import axios from 'axios';

// Gracias al proxy, no necesitas la URL completa
const api = axios.create({
  baseURL: '/api'  // Se redirige automáticamente a localhost:5000/api
});

export const obtenerPedidos = () => api.get('/pedidos');
export const crearPedido = (data) => api.post('/pedidos', data);

export default api;