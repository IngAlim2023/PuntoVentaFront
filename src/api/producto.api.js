import { instance } from "./conexion.api.js";

export const crearProducto = async (data) => await instance.post('/productos/crearProducto', data);
export const obtenerProductos = async () => await instance.get('/productos/productos');