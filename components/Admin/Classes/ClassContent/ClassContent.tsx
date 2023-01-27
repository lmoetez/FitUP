import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import Display from "components/Tailwind/Display/Display";
import { ClassType } from "types/api";

const ClassContent = () => {
  const router = useRouter();
  const classId = router.query.classId as string;

  const { data: _class } = useSWR<ClassType>("/api/class/" + classId, fetcher);

  return (
    <div className="w-full bg-white p-3 flex flex-wrap">
      <div className={DisplayItemStyle}>
        <Display label="Niveau" value={_class.classLevel} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Matière" value={_class.subject} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Année scolaire" value={_class.schoolYear} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Prix annuel" value={_class.annualPrice.toString()} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Prix mensuel" value={_class.monthlyPrice.toString()} />
      </div>
    </div>
  );
};

const DisplayItemStyle = "w-full sm:w-1/2 lg:w-1/3 p-2";

export default ClassContent;
