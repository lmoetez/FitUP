import React from "react";
import Link from "next/link";

const HeaderMenu = () => {
  return (
    <div className="hidden flex-1 md:flex items-center">
      <div className="text-[#4c4c4c] font-semibold px-3">
        <Link href={"/admin"}>Accueil</Link>
      </div>
      <div className="text-[#4c4c4c] font-semibold px-3">
        <Link href={"/admin/classes"}>Classe</Link>
      </div>
      <div className="text-[#4c4c4c] font-semibold px-3">
        <Link href={"/admin/groups"}>Group</Link>
      </div>
      <div className="text-[#4c4c4c] font-semibold px-3">
        <Link href={"/admin/users"}>Utilisateur</Link>
      </div>
    </div>
  );
};

export default HeaderMenu;
