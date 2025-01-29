// Este componente se repite en la VentaDetalle y StockProducto, controla la elminacion y recive 4 parametros

export function DeleteModal({
  confirmacion,
  setValidConfirmacion,
  setIsOpen,
  handleDrop,
}) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
        {/* Título del Modal */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ¿Deseas Eliminar este articulo?
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
            onClick={handleDrop}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
