import Button from "components/Tailwind/Button";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import axios from "axios";
import useUserStore from "store/admin/useUserStore";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import { User } from "types/api";

const UserHeader = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data: user } = useSWR<User>("/api/user/" + userId, fetcher);

  const editUserModal = useUserStore((state) => state.editUserModal);

  return (
    <div className="flex w-full justify-between mb-4">
      <div className="font-bold text-2xl text-[#4c4c4c]">
        {user?.firstName[0]?.toUpperCase() +
          user?.firstName?.slice(1) +
          " " +
          user?.lastName.toUpperCase()}
      </div>
      <div className="flex">
        <Button className="mr-2" type="Primary" onClick={() => editUserModal(user)}>
          Modifier
        </Button>
        <Popconfirm
          message="Êtes-vous sûr de supprimer cette utilisateur?"
          onSubmit={async () => {
            await axios.delete("/api/user/" + userId);
            router.replace("/admin/users");
          }}
        >
          <Button type="Danger">Supprimer</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default UserHeader;
