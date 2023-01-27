import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "public/logo3.png";

const HeaderMenu = () => {
  return (
    <div className="flex-1 flex items-center">
      <div className="font-semibold px-3">
        <Link href={"/"}>
          <a>
            <Image src={logo} alt="logo" height={60} width={60} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMenu;
