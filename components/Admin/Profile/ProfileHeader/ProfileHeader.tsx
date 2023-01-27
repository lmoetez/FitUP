import Button from "components/Tailwind/Button";
import React from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import useUserStore from "store/admin/useUserStore";
import { useSession } from "next-auth/react";
import { User } from "types/api";

const UserHeader = () => {
  const { data: session } = useSession();

  const { data: user } = useSWR<User>("/api/user/" + session.user.id, fetcher);

  const editUserModal = useUserStore((state) => state.editUserModal);

  return (
    <div className="flex w-full justify-between mb-4">
      <div className="font-bold text-2xl text-[#1db0e0]">Profile</div>
      <div>
        <Button className="mr-2" type="Primary" onClick={() => editUserModal(user)}>
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
