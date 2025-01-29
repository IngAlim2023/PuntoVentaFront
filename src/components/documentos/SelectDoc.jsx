import { useState, useEffect } from "react";
import Select from "react-select";
import { getDocs } from "../../api/usuario.api";
import { Controller } from "react-hook-form";

export function SelectDoc(props) {
  const [doc, setDoc] = useState([]);
  useEffect(() => {
    async function loadDocs() {
      const res = await getDocs();
      setDoc(res.data.data[0]);
    }
    loadDocs();
  }, []);
  const options = doc.map((option) => ({
    value: option.idtipoDocumento,
    label: option.tipo_documento,
  }));

  return (
    <Controller
      name="tipoDocumento_idtipoDocumento"
      rules={{ required: true }}
      control={props.control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          onChange={(option) => field.onChange(option ? option.value : null)}
          value={options.find((option)=> option.value === field.value)}
        />
      )}
    />
  );
}
