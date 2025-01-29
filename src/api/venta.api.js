import { instance } from "./conexion.api.js";

export const createVentas = async (data) =>  await instance.post('/ventas/crearVenta', data);
export const getVentas = async () =>  await instance.get('/ventas/verVentas');
export const getVentasId = async (id) =>  await instance.get(`/ventas/verVentaId/${id}`);
export const getVentaId = async (id) =>  await instance.get(`/ventas/verVenta/${id}`);
export const dropVenta = async (id) =>  await instance.delete(`/ventas/eliminarVenta/${id}`);