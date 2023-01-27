import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  action: ReactNode;
}

const Dropdown: FC<Props> = ({ children, action }) => {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const ref = useRef();
  const ref1 = useRef();

  useOutsideAlerter(ref, ref1, () => setShow(false));

  useEffect(() => {
    setShow(false);
  }, [router.pathname]);

  return (
    <div className="h-min relative">
      <button
        ref={ref1}
        type="button"
        className="bg-transparent border-0 !p-0"
        onClick={() => setShow((prev) => !prev)}
      >
        {children}
      </button>

      <div
        ref={ref}
        id="dropdown"
        className={classNames(
          "absolute z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 right-0 mt-1",
          show ? "" : "hidden"
        )}
      >
        {action}
      </div>
    </div>
  );
};

export default Dropdown;

function useOutsideAlerter(ref, ref1, action) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref1.current &&
        !ref1.current.contains(event.target)
      ) {
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
