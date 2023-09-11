import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  width?: string;
  margin?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  value,
  width,
  margin,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className={margin || "mt-2"}>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required
          className={`block ${width || "w-96"} rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
