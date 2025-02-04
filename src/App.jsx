import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormProducto } from "./pages/productos/FormProducto";
import { StockProducto } from "./pages/productos/StockProducto";
import { NavBar } from "./components/NavBar";
import VentaProductos from "./pages/ventas/VentaProductos";
import Inicio from "./pages/Inicio";
import { Toaster } from "react-hot-toast";
import { VentaDetalle } from "./pages/ventas/VentaDetalle";
import { NotFound } from "./pages/NotFound";
import { VentaFactura } from "./pages/ventas/VentaFactura";
import { UsuarioForm } from "./pages/UsuarioForm";
import { Login } from "./pages/registro/Login";
import { CustomerForm } from "./pages/registro/CustomerForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="p-2">
          <Routes>
            <Route path="/" element={<Inicio />} />

            {/* Si el usuario está autenticado, redirigir a "/" en vez de Login o Registro */}
            <Route
              path="/Login"
              element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              }
            />
            <Route
              path="/registro"
              element={
                <AuthRedirect>
                  <CustomerForm />
                </AuthRedirect>
              }
            />
            <Route path="/crearEmpleado" element={<UsuarioForm />} />

            {/* Rutas protegidas, solo accesibles si está autenticado */}
            <Route element={<ProtectedRoute />}>
              <Route path="/crearProducto" element={<FormProducto />} />
              <Route path="/editarProducto/:id" element={<FormProducto />} />
              <Route path="/verProductos" element={<StockProducto />} />
              <Route path="/venta" element={<VentaProductos />} />
              <Route path="/verVenta" element={<VentaDetalle />} />
              <Route path="/facturaVenta/:id" element={<VentaFactura />} />
            </Route>

            {/* Manejo de páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

// Componente para redirigir si el usuario ya está autenticado
const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default App;
