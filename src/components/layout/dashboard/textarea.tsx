import React, { ChangeEventHandler } from "react";

interface FormTextareaProps {
  id: string;
  label: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  autoComplete,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <textarea
        cols={30}
        rows={5}
        id={id}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='resize-none col w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      >
      </textarea>
    </div>
  )
}

export default FormTextarea;