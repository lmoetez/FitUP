import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import Display from "components/Tailwind/Display/Display";
import { Group } from "types/api";
import { format } from "date-fns";

const GroupContent = () => {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const { data: group } = useSWR<Group>("/api/group/" + groupId, fetcher);

  return (
    <div className="w-full bg-white p-3 flex flex-wrap">
      <div className={DisplayItemStyle}>
        <Display label="Nom" value={group.name} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Niveau" value={group.class.classLevel} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Professeur" value={group.prof.firstName + " " + group.prof.lastName} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Nombre de seance par semaine" value={group.sessionPerWeek.toString()} />
      </div>
      <div className={DisplayItemStyle}>
        <Display
          label="Jours"
          value={group.sessionDates
            .map(
              (e) =>
                e.day +
                " de " +
                e.from?.hour +
                ":" +
                e.from?.minute +
                " a " +
                e.to?.hour +
                ":" +
                e.to?.minute
            )
            .join(", ")}
        />
      </div>
      <div className={DisplayItemStyle}>
        <Display
          label="Date debut"
          value={!!group.start && format(new Date(group.start), "dd/MM/yyyy")}
        />
      </div>
      <div className={DisplayItemStyle}>
        <Display
          label="Date fin"
          value={!!group.end && format(new Date(group.end), "dd/MM/yyyy")}
        />
      </div>
    </div>
  );
};

const DisplayItemStyle = "w-full sm:w-1/2 lg:w-1/3 p-2";

export default GroupContent;
