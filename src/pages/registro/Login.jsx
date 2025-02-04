import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { register, handleSubmit } = useForm();
  const { singup } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    await singup(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h1>
        <form className="space-y-5" onSubmit={onSubmit}>
          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              {...register("email", { required: true })}
              placeholder="Ejemplo: usuario@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              {...register("password", { required: true })}
              placeholder="••••••••"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition transform focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ingresar
          </button>
        </form>

        {/* Enlace de registro */}
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-indigo-600 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
