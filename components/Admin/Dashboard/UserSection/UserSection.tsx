import React from "react";
import useSWR from "swr";
import { Group, User } from "types/api";
import { fetcher } from "utils/fetcher";

const GroupSection = () => {
  const { data: users } = useSWR<User[]>("/api/user", fetcher);
  return (
    <div className="bg-white p-6 w-full mt-2 sm:mt-0 sm:flex-1 rounded-lg">
      <p className="text-[20px] font-bold text-[#1db0e0]">Nombre des etudiants: </p>
      <p className="text-black text-[16px] font-medium mt-2">
        {users.filter((e) => e.role === "Etudiant").length + 1} Etudiants
      </p>
    </div>
  );
};

export default GroupSection;
