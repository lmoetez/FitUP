import React from "react";
import HeaderMenu from "./HeaderMenu";
import { useSession } from "next-auth/react";
import UserComponent from "./UserComponent";
import Link from "next/link";

const LayoutHeader = () => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-white flex px-8">
      <HeaderMenu />
      <div className="flex items-center h-full">
        {status !== "loading" &&
          (session?.user?.id ? (
            <UserComponent />
          ) : (
            <div className="text-[#1db0e0] font-semibold">
              <Link href={"/signin"}>Se connecter</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LayoutHeader;
