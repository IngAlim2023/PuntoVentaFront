import { useEffect, useState } from "react";
import { obtenerProductos } from "../../api/producto.api.js";
import toast from "react-hot-toast";

export default function SelectProductos({ productos, setProductos }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(data);
  const url = import.meta.env.VITE_API_UPLOADS;

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await obtenerProductos();
        setData(res.data.data[0]);
        setDataFilter(res.data.data[0]);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }
    loadProducts();
  }, []);

  const filtro = (e) => {
    const text = e.target.value;
    let dataFiltro = data.filter((dat) =>
      dat.descripcion.toLowerCase().includes(text.toLowerCase()) || dat.codBarras.toLowerCase().includes(text)
    );
    setDataFilter(dataFiltro);
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar producto"
        onChange={filtro}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div className="max-h-80 overflow-y-auto space-y-2 border border-gray-300 rounded-lg p-2 bg-white">
        {dataFilter.map((pro) => (
          <div
            key={pro.idPrd}
            className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg cursor-pointer transition duration-300 flex items-center justify-between"
            onClick={() => {
              const prdSelec = productos.find((prd) => prd.Productos_idPrd === pro.idPrd);
              if (prdSelec) {
                toast.success("El producto ya está seleccionado");
              } else {
                setProductos([
                  ...productos,
                  {
                    Productos_idPrd: pro.idPrd,
                    descripcion: pro.descripcion,
                    precio_venta: pro.precio_venta,
                    cantidad: 1,
                    stock: pro.stock,
                    subtotal: pro.precio_venta,
                  },
                ]);
              }
            }}
          >
            <div>
              <h2 className="text-base font-bold text-gray-700">
                {pro.descripcion}
              </h2>
              <p className="text-sm text-gray-600">${pro.precio_venta}</p>
            </div>
            <img
              src={`${url}/${pro.foto}`}
              alt={pro.descripcion}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
