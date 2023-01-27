import React from "react";
import LayoutHeader from "./LayoutHeader";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#fafafa]">
      <LayoutHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
