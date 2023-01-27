import React, { FC, ReactNode, useCallback, useState } from "react";
import Spinner from "components/Tailwind/Spinner";
import cn from "classnames";

export interface ColDefs {
  field?: string;
  headerName: string;
  value?: (data: any) => ReactNode;
  rowClick?: (data: any) => void;
  valueFormateur?: (data: any) => string;
}

interface Props {
  colDef: ColDefs[];
  rows: any[];
  noDataMessage: string;
}

const Table: FC<Props> = ({ colDef, rows, noDataMessage }) => {
  const [tableHeight, setTableHeight] = useState(0);
  const [theadHeight, setTHeadHeight] = useState(0);

  const table = useCallback((node) => {
    const handleResize = () => {
      if (node !== null) {
        setTableHeight(node.getBoundingClientRect().height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("resize", handleResize);
    };
  }, []);
  const thead = useCallback((node) => {
    const handleResize = () => {
      if (node !== null) {
        setTHeadHeight(node.getBoundingClientRect().height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[150px] overflow-x-auto">
      <table ref={table} className="w-full h-full min-h-[150px] flex flex-col min-w-max">
        <thead ref={thead} className="min-w-max w-full">
          <tr className="flex bg-[#f1f5f9] text-[#64748b] py-2">
            {colDef.map((e, index) => (
              <th key={index} className="flex-1 min-w-[150px] text-left px-3">
                {e.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="overflow-y-auto overflow-x-hidden min-w-max w-full"
          style={{ height: tableHeight - theadHeight }}
        >
          {rows ? (
            rows.length ? (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className={cn("flex py-2", index > 0 && "border-t border-gray-100 border-solid")}
                >
                  {colDef.map((e, index) => (
                    <td
                      key={index}
                      className={cn(
                        "flex-1 min-w-[150px] px-3 text-ellipsis overflow-hidden",
                        e.rowClick ? "cursor-pointer" : ""
                      )}
                      onClick={() => {
                        if (e.rowClick) e.rowClick(row);
                      }}
                    >
                      {e.value
                        ? e.value(row)
                        : e.valueFormateur
                        ? e.valueFormateur(deep_value(row, e.field))
                        : deep_value(row, e.field)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <p className="mt-5 text-center">{noDataMessage}</p>
            )
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    </div>
  );
};

const deep_value = function (obj, path) {
  for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
    obj = obj[path[i]];
  }
  return obj;
};

export default Table;
