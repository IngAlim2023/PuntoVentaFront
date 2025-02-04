import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { obtenerProductos } from "../api/producto.api.js";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    async function loadProductos() {
      const res = await obtenerProductos();
      setProductos(res.data.data[0]);
    }
    loadProductos();
  }, []);

  const url = import.meta.env.VITE_API_UPLOADS;

  
  return (
    <div className="font-sans bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center p-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-4">
            Explora la Tecnología del Futuro
          </h1>
          <p className="text-lg mb-6">
            Los mejores gadgets y accesorios al mejor precio.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
            Ver Productos
          </button>
        </motion.div>
      </section>

      {/* Productos Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Nuestros Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
          {productos.map((product) => (
            <motion.div
              key={product.idPrd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: product.idPrd * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div
                className="h-48 bg-gray-300 flex items-center justify-center rounded-md mb-4 overflow-hidden group"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={`${url}/${product.foto}`}
                  alt={product.descripcion}
                />
              </div>
              <h3 className="text-xl font-semibold">{product.descripcion}</h3>
              <p className="text-gray-600">{product.precio_venta}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Información
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-3xl w-full p-4 bg-white rounded-lg"
          >
            <button
              onClick={() => setModalVisible(false)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Modal"
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Información Section */}
      <section className="bg-gray-200 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Nos dedicamos a ofrecer tecnología de última generación con la mejor
          calidad y servicio.
        </p>
      </section>

      {/* Contacto Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Contáctanos</h2>
        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full mb-4 p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full mb-4 p-3 border rounded-md"
          />
          <textarea
            placeholder="Mensaje"
            className="w-full mb-4 p-3 border rounded-md"
          ></textarea>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
