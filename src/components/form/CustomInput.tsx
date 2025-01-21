import { Input } from "antd";
import { Controller } from "react-hook-form";

type TCustomInputProps = {
  type: string;
  name: string;
  label?: string;
};

const CustomInput = ({ type, name, label }: TCustomInputProps) => {
  return (
    <div style={{ marginBottom: "20px", display: "flex" }}>
      {/* {label ? label : null} */}
      {label && <label htmlFor={name}>{label}</label>}
      {/* <Controller name={name} render={({ field, fieldState: {error} }) => <Input {...field} type={type} id={name} />} /> */}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input {...field} type={type} id={name} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
