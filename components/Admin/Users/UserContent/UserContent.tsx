import React from "react";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { fetcher } from "utils/fetcher";
import Display from "components/Tailwind/Display/Display";
import { User } from "types/api";

const UserContent = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data: user } = useSWR<User>("/api/user/" + userId, fetcher);

  return (
    <div className="w-full bg-white p-3 flex flex-wrap">
      <div className={DisplayItemStyle}>
        <Display label="Nom" value={user.lastName} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Prenom" value={user.firstName} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Numero de telephone" value={user.phone} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Role" value={user.role} />
      </div>
      <div className={DisplayItemStyle}>
        <Display label="Email" value={user.email} />
      </div>
    </div>
  );
};

const DisplayItemStyle = "w-full sm:w-1/2 lg:w-1/3 p-2";

export default UserContent;
