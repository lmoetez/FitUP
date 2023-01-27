import Button from "components/Tailwind/Button";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import axios from "axios";
import useGroupStore from "store/admin/useGroupStore";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import { Group } from "types/api";

const GroupHeader = () => {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const { data: group } = useSWR<Group>("/api/group/" + groupId, fetcher);

  const editGroupModal = useGroupStore((state) => state.editGroupModal);

  return (
    <div className="flex w-full justify-between mb-4">
      <div className="font-bold text-2xl text-[#4c4c4c]">
        {group?.name[0]?.toUpperCase() + group?.name?.slice(1)}
      </div>
      <div className="flex">
        <Button className="mr-2" type="Primary" onClick={() => editGroupModal(group)}>
          Modifier
        </Button>
        <Popconfirm
          message="Êtes-vous sûr de supprimer ce group?"
          onSubmit={async () => {
            await axios.delete("/api/group/" + groupId);
            router.replace("/admin/groups");
          }}
        >
          <Button type="Danger">Supprimer</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default GroupHeader;
