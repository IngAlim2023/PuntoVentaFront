import { dropProducto, obtenerProductos } from "../../api/producto.api.js";
import { useEffect, useState } from "react";
import { CodigoBarras } from "../../components/CodigoBarras.jsx";
import toast from "react-hot-toast";
import { DeleteModal } from "../../components/DeleteModal.jsx";
import { useNavigate } from "react-router-dom";


export function StockProducto() {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const url = import.meta.env.VITE_API_UPLOADS;

  const [ refresh, setRefresh ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getProductos() {
      const res = await obtenerProductos();
      setData(res.data.data[0]); // Aquí asignamos todo el array
      setLoad(false);
    }
    getProductos();
  }, [refresh]);

  //Eliminar un Producto:
  const [isOpen, setIsOpen] = useState(false);
  const [confirmacion, setConfirmacion] = useState(null);
  // Para poder user el modal como componente voy a cambiar el nombre del id a idC
  const [idC, setidC] = useState(null);
  const [validConfirmacion, setValidConfirmacion] = useState(null);

  const handleDropDelete = (id) => () => {
    const min = Math.ceil(2);
    const max = Math.floor(100);
    setConfirmacion(Math.floor(Math.random() * (max - min) + min));
    setIsOpen(true);
    setidC(id);
  }
  const handleDrop = async () =>{
    if (confirmacion === parseInt(validConfirmacion)) {
      setIsOpen(false);
      await dropProducto(idC);
      setRefresh(!refresh);
      toast.success("Eliminado correctamente");
    } else {
      setIsOpen(false);
      toast.error("Código incorrecto");
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        Stock de Productos
      </h1>
      {isOpen && (
        <DeleteModal
          confirmacion={confirmacion}
          setValidConfirmacion={setValidConfirmacion}
          handleDrop={handleDrop}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {load ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {data.map((producto) => (
              <div
                key={producto.idPrd}
                className={`${
                  producto.stock < 3 ? "bg-red-200" : "bg-white"
                } shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={`${url}${producto.foto}`}
                    alt={producto.descripcion}
                    className="w-auto max-h-40 rounded-md"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {producto.descripcion}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Precio de Venta:</span> $
                  {producto.precio_venta}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Stock:</span> {producto.stock}
                </p>
                <CodigoBarras value={producto.codBarras} />

                {/* Botón de eliminar */}
                <button
                  onClick={()=> navigate(`/editarProducto/${producto.idPrd}`)
                  }
                  className="mt-4 w-full bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Editar
                </button>
                {/* Botón de eliminar */}
                <button
                  onClick={handleDropDelete(producto.idPrd)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
