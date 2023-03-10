import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  title: string;
  visible: boolean;
  onClose: () => void;
  footer: ReactNode;
}

const Modal: FC<Props> = ({ title, visible, onClose, children, footer }) => {
  return (
    <div className={cn(modalClassName, !visible ? "hidden" : "")}>
      <div className="relative px-4 w-full max-w-2xl h-max">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">{children}</div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

const modalClassName =
  "bg-[#0000004f] overflow-y-auto overflow-x-hidden fixed flex right-0 left-0 top-0 z-50 justify-center py-20 h-full";
