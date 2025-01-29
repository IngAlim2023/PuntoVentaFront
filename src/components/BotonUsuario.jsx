import toast from "react-hot-toast";
import { usuarioLogout } from "../api/login.api.js"

export function BotonUsuario(props) {
    const onClick = async () => {
        try{
            await usuarioLogout();
            props.setUsuario(false);
        } catch (error) {
            console.log(error);
            toast.error("No se pudo cerrar sesión");
        }
    }
  return (
    <button
      className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
        onClick={onClick}
    >
      Cerrar Sesión
    </button>
  )
}
