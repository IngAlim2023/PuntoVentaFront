import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { singout, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleSingOut = async () => {
    try {
      await singout();
      // Redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
      toast.success("Cierre de sesión exitoso, ¡Hasta luego!");
      // Por ejemplo, redirigir al usuario
      navigate("/Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Mostrar un mensaje de error al usuario
      alert("Hubo un error al cerrar sesión. Por favor, inténtalo nuevamente.");
    }
  };
  return (
    <nav className="bg-neutral-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:scale-105 transition-transform"
        >
          Calcomanías Maya
        </Link>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/venta"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Crear Venta
            </Link>
          </li>
          <li>
            <Link
              to="/verVenta"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Ver Ventas
            </Link>
          </li>
          <li>
            <Link
              to="/crearProducto"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Crear Producto
            </Link>
          </li>
          <li>
            <Link
              to="/verProductos"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Ver Productos
            </Link>
          </li>
        </ul>
        <div className="relative">
          <button
            onMouseOver={handleToggleDropdown}
            className="flex items-center justify-between w-full py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          >
            Usuarios
          </button>
          <div
            onMouseLeave={handleToggleDropdown}
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 ${
              dropdown ? "block" : "hidden"
            } transition ease-out duration-100 transform opacity-0 scale-95 ${
              dropdown ? "opacity-100 scale-100" : ""
            }`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <div className="py-1">
                <a
                  onClick={handleSingOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Salir
                </a>
              </div>
            ) : (
              <div className="py-1">
                <Link
                  to="/Login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Ingresar
                </Link>
              </div>
            )}
          </div>
        </div>
        <button className="block md:hidden text-2xl focus:outline-none">
          ☰
        </button>
      </div>
    </nav>
  );
};
