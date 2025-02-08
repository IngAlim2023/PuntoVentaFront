import { instance } from "./conexion.api.js";

export const usuarioLogin = async (data) => {
  try {
    const response = await instance.post("/usuarios/Login", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error
      if (error.response.status === 401) {
        throw new Error("Credenciales incorrectas.");
      } else if (error.response.status === 500) {
        throw new Error("Error interno del servidor. Intenta más tarde.");
      }
    } else if (error.request) {
      // La solicitud fue enviada pero no hubo respuesta
      throw new Error(
        "No se pudo conectar con el servidor. Verifica tu conexión."
      );
    } else {
      // Error inesperado
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};

export const usuarioLogout = async () =>
  await instance.post("/usuarios/Logout");
export const verifyToken = async () =>
  await instance.get("/usuarios/verifyToken");
