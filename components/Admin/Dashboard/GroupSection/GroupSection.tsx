import React from "react";
import useSWR from "swr";
import { Group } from "types/api";
import { fetcher } from "utils/fetcher";

const GroupSection = () => {
  const { data: groups } = useSWR<Group[]>("/api/group", fetcher);
  return (
    <div className="bg-white p-6 w-full sm:flex-1 rounded-lg">
      <p className="text-[20px] font-bold text-[#1db0e0]">Nombre des groups: </p>
      <p className="text-black text-[16px] font-medium mt-2">{groups.length + 1} Groups</p>
    </div>
  );
};

export default GroupSection;
