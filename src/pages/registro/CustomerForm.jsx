import { useForm } from "react-hook-form";
import { SelectDoc } from "../../components/documentos/SelectDoc";
import toast from "react-hot-toast";
import { createCliente } from "../../api/usuario.api.js";
import { useNavigate } from "react-router-dom";

export function CustomerForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const pw1 = data.password;
    const pw2 = data.validPassword;
    if (pw1 !== pw2) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      await createCliente(data);
      toast.success("Cliente creado con éxito");
      navigate("/login");
    } catch (error) {
      toast.error(`Hubo un error al crear el cliente. Intenta nuevamente. o el ${error.response.data.message}`);
    }
    console.log(data);
  });

  const inputClass = `w-full mt-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500`;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Crear cuenta
        </h1>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              className={inputClass}
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <span className="text-red-500 text-sm">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Apellido
            </label>
            <input
              type="text"
              className={inputClass}
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
            />
            {errors.apellido && (
              <span className="text-red-500 text-sm">
                {errors.apellido.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Correo
            </label>
            <input
              type="email"
              className={inputClass}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "El formato del correo no es válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Teléfono
            </label>
            <input
              type="tel"
              className={inputClass}
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El teléfono solo puede contener números",
                },
                minLength: {
                  value: 10,
                  message: "El teléfono debe tener al menos 10 dígitos",
                },
              })}
            />
            {errors.telefono && (
              <span className="text-red-500 text-sm">
                {errors.telefono.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tipo de documento
            </label>
            <SelectDoc control={control} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Número de documento
            </label>
            <input
              type="text"
              className={inputClass}
              {...register("numero_documento", {
                required: "Este campo es obligatorio",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Dirección
            </label>
            <input
              type="text"
              className={inputClass}
              {...register("direccion", {
                required: "La dirección es obligatoria",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              className={inputClass}
              {...register("fecha_nacimiento", {
                required: "La fecha de nacimiento es obligatoria",
                validate: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const monthDifference =
                    today.getMonth() - birthDate.getMonth();
                  const dayDifference = today.getDate() - birthDate.getDate();

                  if (
                    age > 18 ||
                    (age === 18 &&
                      (monthDifference > 0 ||
                        (monthDifference === 0 && dayDifference >= 0)))
                  ) {
                    return true;
                  } else {
                    return "Debes ser mayor de 18 años";
                  }
                },
              })}
            />
            {errors.fecha_nacimiento && (
              <span className="text-red-500 text-sm">
                {errors.fecha_nacimiento.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              className={inputClass}
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirmación contraseña
            </label>
            <input
              type="password"
              className={inputClass}
              {...register("validPassword", {
                required: "Confirmar la contraseña",
              })}
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-3 px-4 w-full md:w-1/2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
