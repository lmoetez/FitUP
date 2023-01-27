import cn from "classnames";
import React, { FC } from "react";

interface Props {
  name: string;
  label: string;
  type?: string;
  register: any;
  errors: any;
  icon?: any;
  onChange?: (value) => void;
}

const FormText: FC<Props> = ({ label, name, type, errors, register, icon: Icon, onChange }) => {
  const field = register(name);

  return (
    <div className="w-full flex flex-col mb-6">
      <div className="flex items-center pb-2">
        <label htmlFor={name} className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {label}
        </label>
      </div>
      <div
        className={cn(
          "border shadow-sm rounded flex",
          errors[name] ? " border-red-400" : "border-gray-300"
        )}
      >
        {!!Icon && (
          <div
            className={cn(
              "px-4 py-3 dark:text-gray-100 flex items-center border-r",
              errors[name] ? " border-red-400" : "border-gray-300"
            )}
          >
            <Icon />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          className="p-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
          placeholder={label}
          {...field}
          onChange={(e) => {
            !!onChange && onChange(e.target.value);
            field.onChange(e);
          }}
        />
      </div>

      {errors[name] && (
        <div className="flex justify-between items-center pt-1 text-red-400">
          <p className="text-xs">{errors[name].message}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx={12} cy={12} r={10} />
            <line x1={15} y1={9} x2={9} y2={15} />
            <line x1={9} y1={9} x2={15} y2={15} />
          </svg>
        </div>
      )}
    </div>
  );
};

export default FormText;
