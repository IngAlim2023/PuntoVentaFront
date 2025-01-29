import { useEffect, useState } from "react";
import { DeleteModal } from "../../components/DeleteModal.jsx";
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
  const [idC, setidC] = useState(null);
  const [validConfirmacion, setValidConfirmacion] = useState(null);

  const handleDropConfirVenta = (id) => () => {
    const min = Math.ceil(2);
    const max = Math.floor(100);
    setConfirmacion(Math.floor(Math.random() * (max - min) + min));
    setIsOpen(true);
    setidC(id);
  };
  const handleDrop = async () => {
    if (confirmacion === parseInt(validConfirmacion)) {
      setIsOpen(false);
      await dropVenta(idC);
      setRefresh(!refresh);
      toast.success("Eliminado correctamente");
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
        <DeleteModal
          confirmacion={confirmacion}
          setValidConfirmacion={setValidConfirmacion}
          handleDrop={handleDrop}
          setIsOpen={setIsOpen}
        />
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
