import SelectProductos from "../../components/productos/SelectProductos.jsx";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { createVentas } from "../../api/venta.api.js";
import { getEmpleadoById } from "../../api/usuario.api.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { SelectClientes } from "../../components/clientes/SelectClientes.jsx";

export default function VentaProductos() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState({});
  const { user } = useAuth();

  const [idCustomer, setIdCustomer] = useState("");
  const [employer, setEmployer] = useState("");

  // Función para incrementar la cantidad de un producto
  const incrementarCantidad = (idPrd) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.Productos_idPrd === idPrd
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
              subtotal: (producto.cantidad + 1) * producto.precio_venta,
            }
          : producto
      )
    );
  };

  // Función para decrementar la cantidad de un producto
  const decrementarCantidad = (idPrd) => {
    setProductos(
      (prevProductos) =>
        prevProductos
          .map((producto) =>
            producto.Productos_idPrd === idPrd
              ? {
                  ...producto,
                  cantidad: producto.cantidad - 1,
                  subtotal: (producto.cantidad - 1) * producto.precio_venta,
                }
              : producto
          )
          .filter((producto) => producto.cantidad > 0) // Filtrar productos con cantidad mayor a 0
    );
  };

  useEffect(() => {
    if (!user?.userid) return;
    async function getEmployer() {
      try {
        const res = await getEmpleadoById(user.userid);
        setEmployer(res.data.data);
      } catch (error) {
        console.error("Error cargando empleado:", error);
      }
    }
    getEmployer();
  }, [productos]);

  useEffect(() => {
    // Calcular el total directamente
    const precio_total = productos.reduce(
      (acumulado, producto) =>
        acumulado + parseFloat(producto.precio_venta) * producto.cantidad,
      0
    );

    setTotal(precio_total);
    setData({
      total: precio_total,
      productos: productos,
      Empleados_idEmpleado: employer.idEmpleado,
      cliente_idcliente: idCustomer,
    });
  }, [productos, idCustomer]);

  async function generateVenta() {
    if (productos.length === 0) {
      return toast.error("No has seleccionado ningún producto.");
    }

    if (!idCustomer) {
      return toast.error("Debes seleccionar un cliente.");
    }

    try {
      await createVentas(data);
      toast.success("Venta registrada exitosamente.");
      setProductos([]);
    } catch (e) {
      console.error("Error al registrar la venta:", e);
      toast.error("Error al registrar la venta.");
    }
  }
  return (
    <div className="min-h-screen p-8 w-full">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-xl text-gray-800">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-cyan-600">
          Registro de Venta
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sección de productos seleccionados */}
          <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md overflow-y-auto max-h-[450px]">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Productos Seleccionados
            </h2>
            <div className="mb-4 w-64">
              <SelectClientes setIdCustomer={setIdCustomer} />
            </div>
            {productos.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-cyan-100 text-gray-700">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Descripción
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Stock
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Precio Unidad
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Cantidad
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Subtotal
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto.Productos_idPrd}
                      className="hover:bg-gray-50"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {producto.descripcion ||
                          `Producto ${producto.Productos_idPrd}`}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {producto.stock}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {producto.precio_venta}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {producto.cantidad}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {producto.subtotal}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <FaPlusCircle
                            className="text-green-500 cursor-pointer hover:text-green-700 transition duration-200 ease-in-out"
                            onClick={() =>
                              incrementarCantidad(producto.Productos_idPrd)
                            }
                          />
                          <FaMinusCircle
                            className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200 ease-in-out"
                            onClick={() =>
                              decrementarCantidad(producto.Productos_idPrd)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-cyan-100 text-gray-700 font-semibold">
                    <td
                      colSpan="2"
                      className="border border-gray-300 px-4 py-2 text-right"
                    >
                      Total:
                    </td>
                    <td
                      colSpan="2"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="text-gray-500 text-center">
                No hay productos seleccionados.
              </p>
            )}
            <div>
              <button
                onClick={generateVenta}
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg mt-6 w-full hover:bg-cyan-700 transition duration-200 ease-in-out"
              >
                Registrar Venta
              </button>
            </div>
          </div>

          {/* Sección de selección de productos */}
          <div className="flex-none w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
              Selecciona Productos
            </h2>
            <SelectProductos
              productos={productos}
              setProductos={setProductos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
