import { instance } from "./conexion.api";
export const getCargos = async () => await instance.get('/usuarios/verCargos');
export const createEmpleado = async (data) => await instance.post("/usuarios/crearEmpleado", data);
export const getDocs = async () => await instance.get('/usuarios/verDocumentos');
export const createCliente = async (data) => await instance.post("/usuarios/crearCliente", data);
export const getClientes = async () => await instance.get('/usuarios/verClientes');
export const getEmpleadoById = async (id) => await instance.get(`/usuarios/empleadoId/${id}`);