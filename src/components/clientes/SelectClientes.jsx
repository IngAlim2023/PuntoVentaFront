import Select from "react-select";
import { useState, useEffect } from "react";
import { getClientes } from "../../api/usuario.api.js";

export function SelectClientes({ setIdCustomer }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function loadClientes() {
      const res = await getClientes();
      setClientes(res.data.data);
    }
    loadClientes();
  }, []);

  const options = clientes.map((cliente) => ({
    value: cliente.idcliente,
    label: cliente.numero_documento,
  }));

  return (
    <Select
      options={options}
      onChange={(selectedOption) => setIdCustomer(selectedOption.value)}
    />
  );
}
