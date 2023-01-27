import cn from "classnames";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import useSWR from "swr";
import { ClassType } from "types/api";
import { fetcher } from "utils/fetcher";

interface Props {
  name: string;
  label: string;
  control: any;
  errors: any;
  icon?: any;
  onChange?: (data: any) => void;
}

const FormSelect: FC<Props> = ({ label, name, errors, control, icon: Icon, onChange }) => {
  const customStyles = {
    container: () => ({ width: "100%", position: "relative" }),
    control: () => ({
      width: "100%",
      fontSize: "14px",
      border: "unset",
      padding: "4px 3px",
      display: "flex",
    }),
  };

  const { data: classes, error: errorClass } = useSWR<ClassType[]>("/api/class", fetcher);

  const selectOptions = classes?.map((v) => ({
    label: v.classLevel + "(" + v.schoolYear + ")",
    value: v,
  }));

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
          errors?.[name] ? " border-red-400" : "border-gray-300"
        )}
      >
        {!!Icon && (
          <div
            className={cn(
              "px-4 py-3 dark:text-gray-100 flex items-center border-r",
              errors?.[name] ? " border-red-400" : "border-gray-300"
            )}
          >
            <Icon />
          </div>
        )}
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              //@ts-ignore
              styles={customStyles}
              placeholder="Select..."
              options={selectOptions}
              name={name}
              value={selectOptions?.find((option) => value?._id === option?.value?._id) || null}
              onChange={(option) => onChange(option?.value)}
              filterOption={filterOptions}
              oOptionsMessage={() => "Pas de classe"}
              isLoading={!classes && !errorClass}
            />
          )}
        />
      </div>

      {errors?.[name] && (
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

export default FormSelect;

const filterOptions = (candidate: { label: string; value: string; data: any }, input: string) => {
  if (input) {
    return candidate.label.includes(input);
  }
  return true;
};
