import { dayOption } from "models/group.model";
import React from "react";
import useSWR from "swr";
import { Group } from "types/api";
import { fetcher } from "utils/fetcher";
import WeekItem from "./WeekItem";

const Week = () => {
  const { data: groups } = useSWR<Group[]>("/api/group", fetcher);

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="w-full flex flex-nowrap overflow-x-auto">
        {dayOption.map((e, index) => (
          <WeekItem day={e} groups={groups} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Week;
