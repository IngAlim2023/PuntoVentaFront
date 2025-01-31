import { instance } from "./conexion.api.js";

export const crearProducto = async (data) => await instance.post('/productos/crearProducto', data);
export const obtenerProductos = async () => await instance.get('/productos/productos');
export const dropProducto = async (id) => await instance.delete(`/productos/eliminarProducto/${id}`);
export const obtenerProducto = async (id) => await instance.get(`/productos/verProducto/${id}`);
export const actualizarProducto = async (id, data) => await instance.put(`/productos/editarProducto/${id}`, data);