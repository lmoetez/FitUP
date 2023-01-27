import classNames from "classnames";
import LayoutPublic from "components/Layout/LayoutPublic";
import GroupModal from "components/User/Inscription/GroupModal";
import { useEffect, useState } from "react";
import useInscriptionStore from "store/user/useInscriptionStore";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { ClassType, Group } from "types/api";
import { fetcher } from "utils/fetcher";

const colors = [
  { bg: "#0a2544", color: "white" },
  { bg: "#144e8a", color: "white" },
  { bg: "#2280cc", color: "white" },
  { bg: "#33afef", color: "white" },
];

const Offres: CustomNextPage = () => {
  const [classes, setClasses] = useState<ClassType[]>();

  const { data: groups, error } = useSWR<Group[]>("/api/group", fetcher);

  const { showGroupsModal } = useInscriptionStore();

  useEffect(() => {
    if (!groups) return;

    const data = [];

    groups.map((group) => {
      if (!data.find((e) => e._id === group.class._id)) data.push(group.class);
    });

    setClasses(data);
  }, [groups]);

  if (!groups && !error) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-[#1db0e0] font-bold text-[30px] leading-relaxed">Consulter nos offres</h1>
      {classes?.map((e: ClassType, index) => (
        <div
          key={index}
          style={{
            backgroundColor: colors[index % colors.length].bg,
            color: colors[index % colors.length].color,
          }}
          className="mt-2 rounded p-2 cursor-pointer"
          onClick={() => {
            showGroupsModal(e);
          }}
        >
          {e.classLevel}
        </div>
      ))}
      <GroupModal />
    </div>
  );
};

export default Offres;

Offres.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;
Offres.auth = true;
