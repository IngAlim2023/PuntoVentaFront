import { instance } from "./conexion.api.js";

export const usuarioLogin = async (data) => await instance.post('/usuarios/Login', data);
export const usuarioLogout = async () => await instance.post('/usuarios/Logout');
export const verifyToken = async () => await instance.get('/usuarios/verifyToken');