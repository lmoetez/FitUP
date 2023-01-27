import React, { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import Button from "../Button";
import iconBottom from "public/triangle.svg";
import Image from "next/image";

interface Props {
  message: string;
  onSubmit: () => void;
}

const Popconfirm = ({ children, message, onSubmit }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const div = useCallback(
    (node) => {
      if (node !== null) {
        setX(node.getBoundingClientRect().x);
        setY(node.getBoundingClientRect().y);
        setDivWidth(node.getBoundingClientRect().width);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, children]
  );
  const ref = useRef();

  useOutsideAlerter(ref, () => setVisible(false));

  useEffect(() => {
    if (ref.current !== null) {
      //@ts-ignore
      setHeight(ref.current.getBoundingClientRect().height);
      //@ts-ignore
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, [ref, visible, children]);

  const top = y - height;
  const left = Math.max(x + divWidth - width, 0);

  return (
    <div className="flex items-center">
      <div ref={div} onClick={() => setVisible(true)}>
        {children}
      </div>
      <div
        ref={ref}
        id="popover"
        style={{ left: left + "px", top: top + "px" }}
        className={cn(
          `transition duration-150 ease-in-out absolute whitespace-nowrap`,
          !visible && "hidden"
        )}
      >
        <div className="w-full bg-white rounded shadow">
          <div className="px-4 xl:px-8 pt-3 pb-5">
            <p className="text-gray-600 text-sm leading-3">{message}</p>
            <div className="flex justify-end mt-4">
              <Button
                type="Default"
                className="mr-2"
                size="Small"
                onClick={() => {
                  setVisible(false);
                }}
              >
                Non
              </Button>
              <Button
                type="Danger"
                size="Small"
                loading={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  await onSubmit();
                  setIsLoading(false);
                  setVisible(false);
                }}
              >
                Oui
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popconfirm;

function useOutsideAlerter(ref, action) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}
