import { crearProducto } from "../../api/producto.api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

export function FormProducto() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append("codBarras", data.codBarras);
    formData.append("descripcion", data.descripcion);
    formData.append("precio_venta", data.precio_venta);
    formData.append("stock", data.stock);
    formData.append("foto", data.foto[0]);
    formData.append("ubicacion", data.ubicacion);
    
    try {
      await crearProducto(formData);
      setMessage({ type: "success", text: "Producto creado con éxito." });
      reset(); // Reinicia el formulario
      toast.success("Producto Creado")
    } catch (e) {
      setMessage({
        type: "error",
        text: e.response?.data?.message || "Error al crear el producto.",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Crear Producto
        </h1>
        {message && (
          <div
            className={`text-sm text-center py-2 mb-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Código de Barras */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Código de Barras
            </label>
            <input
              type="text"
              {...register("codBarras", {
                required: "Este campo es obligatorio",
              })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.codBarras && (
              <span className="text-red-500 text-sm">
                {errors.codBarras.message}
              </span>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Descripción
            </label>
            <input
              type="text"
              {...register("descripcion", {
                required: "Este campo es obligatorio",
              })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.descripcion && (
              <span className="text-red-500 text-sm">
                {errors.descripcion.message}
              </span>
            )}
          </div>

          {/* Precio de Venta */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Precio de Venta
            </label>
            <input
              type="number"
              step="0.01"
              {...register("precio_venta", {
                required: "Este campo es obligatorio",
              })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.precio_venta && (
              <span className="text-red-500 text-sm">
                {errors.precio_venta.message}
              </span>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Stock
            </label>
            <input
              type="number"
              {...register("stock", { required: "Este campo es obligatorio" })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>

          {/* Ubicacion */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Ubicacion
            </label>
            <input
              type="text"
              {...register("ubicacion", {min:{value:4, message:"la ubicación minimo tiene cuatro caracteres"}, max: {value: 10, message:"caracteres maximos 10"}})}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.ubicacion && (
              <span className="text-red-500 text-sm">
                {errors.ubicacion.message}
              </span>
            )}
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Foto
            </label>
            <input
              type="file"
              {...register("foto", { required: "Este campo es obligatorio" })}
              accept="image/*"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.foto && (
              <span className="text-red-500 text-sm">
                {errors.foto.message}
              </span>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
