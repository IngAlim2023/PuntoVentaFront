import { useState, useEffect } from "react";
import { getEmpleado } from "../../api/usuario.api.js";
import Select from "react-select";

export function SelectEmpleados({ setIdEmpleado }) {
  const [empleados, setEmpleados] = useState([]);
  useEffect(() => {
    async function loadEmpleados() {
      const res = await getEmpleado();
      setEmpleados(res.data.data);
    }
    loadEmpleados();
  }, []);

  const options = empleados.map((empleado) => ({
    value: empleado.idEmpleado,
    label: empleado.numero_documento,
  }));
  
  return (
    <Select
      options={options}
      onChange={(selectedOption) => setIdEmpleado(selectedOption.value)}
    />
  );
}
