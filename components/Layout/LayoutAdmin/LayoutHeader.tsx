import React from "react";
import Image from "next/image";
import HeaderMenu from "./HeaderMenu";
import logo from "public/logo3.png";
import UserComponent from "./UserComponent";

const LayoutHeader = () => {
  return (
    <div className="bg-white flex px-8">
      <div className="mr-4">
        <Image src={logo} alt="logo" height={60} width={60} />
      </div>

      <HeaderMenu />

      <UserComponent />
    </div>
  );
};

export default LayoutHeader;
