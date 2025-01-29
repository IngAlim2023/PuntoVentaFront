import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getVentasId, getVentaId } from "../../api/venta.api.js";
import toast from "react-hot-toast";
import logo from "../../assets/img/logo.png";

import { FaUserTie } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";

export function VentaFactura() {
  const param = useParams();
  const [factura, setFactura] = useState([]);
  const [venta, setVenta] = useState([]);
  const [descarga, setDescarga] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    async function loadDetalles() {
      const res = await getVentasId(param.id);
      setFactura(res.data.data);
    }
    loadDetalles();
    async function loadVenta() {
      const res = await getVentaId(param.id);
      setVenta(res.data.data);
    }
    loadVenta();
  }, [param.id]);

  const factpdf = () => {
    const content = contentRef.current;

    if (descarga) {
      return toast.success("La factura ya ha sido descargada.");
    }

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Factura_${param.id}.pdf`);
      setDescarga(true);
      toast.success("La factura se ha generado correctamente.");
    });
  };

  const fecha = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div ref={contentRef} className="p-6 bg-white rounded-lg">
          {/* Cabecera de la factura */}
          <div className="mb-8 text-center">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto mb-4"
              style={{ width: "100px" }}
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Factura de Venta
            </h1>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Código de la Venta:</span>{" "}
              {param.id}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Fecha de Emisión:</span> {fecha}
            </p>
          </div>

          {/* Cuerpo de la factura */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Id Producto
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Cantidad
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Precio Unitario
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {factura.map((det) => (
                  <tr
                    key={det.idDetalleVenta}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {det.Productos_idPrd}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {det.cantidad}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ${(det.subtotal / det.cantidad).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      ${det.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie de la factura */}
          <div className="mt-6 text-right">
            {venta.map((ven) => (
              <div key={ven.idVenta}>
                <h2 className="text-xl font-bold text-gray-800">
                  Total de la Venta:
                  <span className="text-green-600 ml-2">${ven.total}</span>
                </h2>

                {/* Tarjetas de Vendedor y Cliente */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* Tarjeta del Vendedor */}
                  <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center gap-3 hover:shadow-lg transition">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                      <RiCustomerService2Line />
                    </div>
                    <div>
                      <h3 className="text-blue-800 font-semibold">Vendedor</h3>
                      <p className="text-gray-700 text-lg font-medium">
                        {ven.Empleados_idEmpleado}
                      </p>
                    </div>
                  </div>

                  {/* Tarjeta del Cliente */}
                  <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center gap-3 hover:shadow-lg transition">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                      <FaUserTie />
                    </div>
                    <div>
                      <h3 className="text-green-800 font-semibold">Cliente</h3>
                      <p className="text-gray-700 text-lg font-medium">
                        {ven.cliente_idcliente}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mt-4">
                  Fecha de la venta:{" "}
                  <span className="text-gray-800">
                    {new Date(ven.created).toLocaleDateString("es-ES")}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-blue-700 transition-all transform hover:scale-105"
          onClick={factpdf}
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
}
