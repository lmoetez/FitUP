import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { Group } from "types/api";

interface Props {
  day: string;
  groups: Group[];
  index: number;
}

interface Item {
  className: string;
  groupName: string;
  startHourTime: string;
  startMinuteTime: string;
  endHourTime: string;
  endMinuteTime: string;
}

const WeekItem: FC<Props> = ({ day, groups, index }) => {
  const [sessions, setSessions] = useState<Item[]>([]);

  useEffect(() => {
    const data = [];

    groups.map((group) => {
      group.sessionDates
        .filter((e) => e.day === day)
        .map((sessionDate) => {
          data.push({
            className: group.class?.classLevel,
            groupName: group.name,
            startHourTime: sessionDate.from.hour?.toString(),
            startMinuteTime: sessionDate.from.minute?.toString(),
            endHourTime: sessionDate.to.hour?.toString(),
            endMinuteTime: sessionDate.to.minute?.toString(),
          });
          data.push({
            className: group.class?.classLevel,
            groupName: group.name,
            startHourTime: sessionDate.from.hour?.toString(),
            startMinuteTime: sessionDate.from.minute?.toString(),
            endHourTime: sessionDate.to.hour?.toString(),
            endMinuteTime: sessionDate.to.minute?.toString(),
          });
        });
    });

    setSessions(data);
  }, [day, groups]);

  return (
    <div
      className={classNames(
        "flex-1 min-w-[200px] border border-[#4c4c4c] p-2",
        index > 0 ? "border-l-0" : ""
      )}
    >
      <p className="text-[20px] font-bold text-[#1db0e0]">
        {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
        {sessions
          .sort((a, b) => {
            if (a.startHourTime < b.startHourTime) {
              return -1;
            }
            if (a.startHourTime > b.startHourTime) {
              return 1;
            }
            if (a.startMinuteTime < b.startMinuteTime) {
              return -1;
            }
            if (a.startMinuteTime > b.startMinuteTime) {
              return 1;
            }
            return 0;
          })
          .map((session, sessionIndex) => (
            <div className={"border-t border-[#4c4c4c] mt-2"}>
              <p>
                <span className="text-black text-[14px] font-medium">{session.groupName}</span>
                <span className="text-[#4c4c4c] text-[12px] font-medium">
                  {" "}
                  ({session.className})
                </span>
              </p>
              <p className="text-[#4c4c4c] text-[14px] font-medium">
                {session.startHourTime +
                  ":" +
                  session.startMinuteTime +
                  "=>" +
                  session.endHourTime +
                  ":" +
                  session.endMinuteTime}
              </p>
            </div>
          ))}
      </p>
    </div>
  );
};

export default WeekItem;
