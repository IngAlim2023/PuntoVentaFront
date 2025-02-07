import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";

export const NavBar = () => {
  const [navMobile, setNavMobile] = useState(false);
  const [active, setActive] = useState(false);
  const { singout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const param = useLocation();

  const handleSignOut = async () => {
    try {
      await singout();
      toast.success("Cierre de sesión exitoso, ¡Hasta luego!");
      setNavMobile(false);
      setActive(false);
      navigate("/Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión. Por favor, inténtalo nuevamente.");
    }
  };

  const navLinks = isAuthenticated
    ? [
        { to: "/", label: "Inicio" },
        { to: "/venta", label: "Venta" },
        { to: "/verVenta", label: "Ver Ventas" },
        { to: "/crearProducto", label: "Crear Producto" },
        { to: "/verProductos", label: "Ver Productos" },
      ]
    : [
        { to: "/", label: "Inicio" },
        { to: "/Productos", label: "Productos" },
      ];

  const toggleMobileMenu = () => setNavMobile((prev) => !prev);
  const toggleUserMenu = () => setActive((prev) => !prev);

  return (
    <nav className="fixed top-0 backdrop-blur-sm w-full z-10">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Menu mobile button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Abrir Menú</span>
              <IoMdMenu className="text-2xl" />
            </button>
          </div>

          {/* Logo and desktop menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link
                to="/"
                className={param.pathname === "/" ? "text-2xl text-sky-800 font-bold tracking-wide hover:text-cyan-400 transition": "text-2xl font-bold tracking-wide hover:text-cyan-400 transition"}
              >
                TechNova
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      param.pathname === link.to
                        ? "bg-sky-500 text-w"
                        : "text-sky-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Icons and profile dropdown */}
          <div className="sm:flex absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 m-2"
            >
              <IoNotifications className="text-2xl" />
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                type="button"
                className="relative flex rounded-full bg-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={toggleUserMenu}
              >
                <FaUserAlt className="text-2xl" />
              </button>

              <div
                className={`${
                  active
                    ? "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    : "hidden"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={toggleUserMenu}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={toggleUserMenu}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/crearEmpleado"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={toggleUserMenu}
                    >
                      Other
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={handleSignOut}
                    >
                      Cerrar sesión
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={navMobile ? "hidden" : "sm:hidden"}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block rounded-md px-3 py-2 text-base font-medium text-sky-800 hover:bg-gray-700 hover:text-white"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ?
        (
          <Link
            to="/login"
            className="block rounded-md px-3 py-2 text-base font-medium text-sky-800 hover:bg-gray-700 hover:text-white"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Link>
        ):(
          <Link
            to="/login"
            className="block rounded-md px-3 py-2 text-base font-medium text-sky-800 hover:bg-gray-700 hover:text-white"
          >
            Ingresar
          </Link>
        )  
        }
        </div>
      </div>
    </nav>
  );
};
