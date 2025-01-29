import { useEffect, useState } from "react";
import { dropVenta, getVentas } from "../../api/venta.api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function VentaDetalle() {
  const [ventas, setVentas] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const goTo = (id) => {
    navigate(`/facturaVenta/${id}`);
  };

  useEffect(() => {
    async function loadSales() {
      const res = await getVentas();
      setVentas(res.data.data);
    }
    loadSales();
  }, [refresh]);

  // Agrupar ventas por idVenta
  const ventasAgrupadas = ventas.reduce((acc, venta) => {
    const { idVenta } = venta;
    if (!acc[idVenta]) {
      acc[idVenta] = { ...venta, detalles: [] };
    }
    acc[idVenta].detalles.push({
      idDetalleVenta: venta.idDetalleVenta,
      Productos_idPrd: venta.Productos_idPrd,
      cantidad: venta.cantidad,
      subtotal: venta.subtotal,
      detalleCreated: venta.detalleCreated,
      detalleUpdated: venta.detalleUpdated,
    });
    return acc;
  }, {});

  const ventasArray = Object.values(ventasAgrupadas);

  const [isOpen, setIsOpen] = useState(false);
  const [confirmacion, setConfirmacion] = useState(null);
  const [idVenta, setIdVenta] = useState(null);
  const [validConfirmacion, setValidConfirmacion] = useState(null);

  const handleDropConfirVenta = (idVenta) => () => {
    const min = Math.ceil(2);
    const max = Math.floor(100);
    setConfirmacion(Math.floor(Math.random() * (max - min) + min));
    setIsOpen(true);
    setIdVenta(idVenta);
  };
  const handleDropVenta = async () => {
    if (confirmacion === parseInt(validConfirmacion)) {
      setIsOpen(false);
      await dropVenta(idVenta);
      setRefresh(!refresh);
      toast.success("Venta eliminada correctamente");
    } else {
      setIsOpen(false);
      toast.error("Código incorrecto");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Ventas
      </h1>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
            {/* Título del Modal */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              ¿Quieres eliminar la venta?
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Ingresa el siguiente código:{" "}
              <span className="font-bold text-gray-800 ">
                {confirmacion}
              </span>
            </p>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 mb-4"
              placeholder="Ingresa el código"
              onChange={(e) => setValidConfirmacion(e.target.value)}
            />

            {/* Botones */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDropVenta}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="m-2 flex flex-wrap gap-6">
        {ventasArray.map((venta) => (
          <div
            key={venta.idVenta}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full flex flex-col lg:flex-row"
          >
            {/* Información general de la venta */}
            <div className="mb-4 basis-1/4 p-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Código Venta: {venta.idVenta}
              </h2>
              <p>
                <span className="font-semibold">Total:</span> ${venta.total}
              </p>
              <p>
                <span className="font-semibold">Fecha de venta:</span>{" "}
                {new Date(venta.created).toLocaleDateString()}
              </p>
              <button
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg mt-4 w-full hover:bg-cyan-700"
                onClick={() => goTo(venta.idVenta)}
              >
                Generar factura
              </button>
            </div>

            {/* Detalles de los productos de la venta */}
            <div className="basis-3/4 p-2 overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Detalles de Productos
              </h3>
              <table className="table-fixed min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      ID Producto
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Cantidad
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Subtotal
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Fecha del Detalle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {venta.detalles.map((detalle) => (
                    <tr
                      key={detalle.idDetalleVenta}
                      className="even:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {detalle.Productos_idPrd}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {detalle.cantidad}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${detalle.subtotal}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(detalle.detalleCreated).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Acciones */}
            <div className="mt-4 w-full lg:w-auto">
              <h1 className="text-lg font-semibold text-gray-700 text-center">
                Acciones
              </h1>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg mt-2 w-full hover:bg-red-700"
                onClick={handleDropConfirVenta(venta.idVenta)}
              >
                Eliminar Venta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
