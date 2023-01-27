import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface Props {
  type: "Danger" | "Warning" | "Success";
  icon?: ReactNode;
  message: string;
}

const Alert: FC<Props> = ({ message, icon, type }) => {
  return (
    <div
      className={classNames(
        `py-2 px-3 border border-solid flex items-center rounded-md`,
        type === "Danger"
          ? "border-red-400 bg-red-100"
          : type === "Warning"
          ? "border-amber-500 bg-amber-100"
          : "border-green-400 bg-green-100"
      )}
    >
      {!!icon && (
        <div
          className={classNames(
            `w-6 h-6 pr-2 pt-1`,
            type === "Danger"
              ? "text-red-400 "
              : type === "Warning"
              ? "text-amber-500"
              : "text-green-600"
          )}
        >
          {icon}
        </div>
      )}
      <div
        className={classNames(
          `flex-1`,
          type === "Danger"
            ? "text-red-400 "
            : type === "Warning"
            ? "text-amber-500"
            : "text-green-600"
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default Alert;
