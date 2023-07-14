import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  autoComplete,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required
          className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormInput;
