import React from "react";
import LayoutHeader from "./LayoutHeader";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-[#fafafa]">
      <LayoutHeader />
      <div className="flex-1 flex">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
