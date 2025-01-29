import Select from "react-select";
import { Controller } from "react-hook-form";
export function SelectCargos(props) {
  const options = props.cargos.map((cg) => ({
    value: cg.idcargo,
    label: cg.tipo_cargo,
  }));
  return (
    <Controller
      name="cargo_idcargo"
      control={props.control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          onChange={(selectedOption) =>
            field.onChange(selectedOption ? selectedOption.value : null)
          }
          value={options.find((option) => option.value === field.value) || null}
        />
      )}
    />
  );
}
