import Button from "components/Tailwind/Button";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import axios from "axios";
import useClassStore from "store/admin/useClassStore";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import { ClassType } from "types/api";

const ClassHeader = () => {
  const router = useRouter();
  const classId = router.query.classId as string;

  const { data: _class } = useSWR<ClassType>("/api/class/" + classId, fetcher);

  const editClassModal = useClassStore((state) => state.editClassModal);

  return (
    <div className="flex w-full justify-between mb-4">
      <div className="font-bold text-2xl text-[#4c4c4c]">
        {_class?.classLevel[0]?.toUpperCase() + _class?.classLevel?.slice(1)}
      </div>
      <div className="flex">
        <Button className="mr-2" type="Primary" onClick={() => editClassModal(_class)}>
          Modifier
        </Button>
        <Popconfirm
          message="Êtes-vous sûr de supprimer cette classe?"
          onSubmit={async () => {
            await axios.delete("/api/class/" + classId);
            router.replace("/admin/classes");
          }}
        >
          <Button type="Danger">Supprimer</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default ClassHeader;
