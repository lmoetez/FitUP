import React, { FC } from "react";

interface Props {
  label: string;
  value: string;
}

const Display: FC<Props> = ({ label, value }) => {
  return (
    <div>
      <div className="text-sm font-bold text-gray-800 dark:text-gray-100 ">{label}</div>
      <div className="py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400  text-ellipsis overflow-hidden whitespace-nowrap">
        {value}
      </div>
    </div>
  );
};

export default Display;
