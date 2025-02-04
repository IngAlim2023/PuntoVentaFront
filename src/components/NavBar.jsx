import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { singout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleToggleDropdown = () => setDropdown(!dropdown);
  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignOut = async () => {
    try {
      await singout();
      toast.success("Cierre de sesión exitoso, ¡Hasta luego!");
      navigate("/Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <nav className="bg-[#0a0a0a] text-gray-200 shadow-lg shadow-cyan-500/20 fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-cyan-400 transition"
        >
          TechNova
        </Link>

        {/* Botón de menú en móviles */}
        <button
          className="md:hidden text-2xl hover:text-cyan-400 transition"
          onClick={handleToggleMenu}
        >
          ☰
        </button>

        {/* Menú de navegación (Desktop y Mobile) */}
        <ul
          className={`md:flex space-x-6 absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-[#0a0a0a] md:bg-transparent p-6 md:p-0 border-t md:border-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block md:inline hover:text-cyan-400 transition text-lg"
            >
              Inicio
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/venta"
                  className="block md:inline hover:text-cyan-400 transition text-lg"
                >
                  Venta
                </Link>
              </li>
              <li>
                <Link
                  to="/verVenta"
                  className="block md:inline hover:text-cyan-400 transition text-lg"
                >
                  Ver Ventas
                </Link>
              </li>
              <li>
                <Link
                  to="/crearProducto"
                  className="block md:inline hover:text-cyan-400 transition text-lg"
                >
                  Crear Producto
                </Link>
              </li>
              <li>
                <Link
                  to="/verProductos"
                  className="block md:inline hover:text-cyan-400 transition text-lg"
                >
                  Ver Productos
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/Productos"
                className="block md:inline hover:text-cyan-400 transition text-lg"
              >
                Productos
              </Link>
            </li>
          )}
        </ul>

        {/* Menú desplegable de usuario */}

        <div className="relative hidden md:block">
          <button
            onMouseOver={handleToggleDropdown}
            className="px-4 py-2 rounded hover:text-cyan-400 transition"
          >
            Usuarios ⏷
          </button>

          <div
            onMouseLeave={handleToggleDropdown}
            className={`absolute right-0 mt-2 w-48 bg-[#121212] border border-cyan-500 rounded-md shadow-lg py-2 ring-1 ring-cyan-500 ring-opacity-30 transition-transform ${
              dropdown
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <ul className="py-2 text-sm text-gray-300">
              {["Dashboard", "Settings", "Earnings"].map((option, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                  >
                    {option}
                  </Link>
                </li>
              ))}
            </ul>
            {isAuthenticated ? (
              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="py-1">
                <Link
                  to="/Login"
                  className="block px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/20 transition"
                >
                  Ingresar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
