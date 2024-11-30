import { useState } from "react";
import { IconType } from "react-icons";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function FormControl({
  Icon,
  type = "text",
  name='',
  id='',
  value='',
  placeholder='',
  handleChange,
  required,
}: {
  Icon: IconType;
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
}) {
  const [ty, setTy] = useState<string>(type);
  return (
    <div className="flex justify-center items-center border px-2 py-3 gap-2 rounded-lg transition-all ease-in-out duration-700 hover:shadow-lg focus-within:shadow-lg focus-within:border-red-500 focus-within:text-red-500">
      {type !== "password" ? (
        <Icon className="text-2xl cursor-pointer" />
      ) : (
        <button
          className="text-2xl outline-none"
          onClick={(e) => {
            e.preventDefault();
            setTy((prev) => (prev === "text" ? "password" : "text"));
          }}
        >
          {ty !== "text" ? <BsEye /> : <BsEyeSlash />}
        </button>
      )}
      <input
        className="flex-1 outline-none bg-transparent text-base-content"
        type={ty}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}

export default FormControl;
