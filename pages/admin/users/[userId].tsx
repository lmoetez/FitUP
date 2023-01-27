import UserContent from "components/Admin/Users/UserContent";
import UserHeader from "components/Admin/Users/UserHeader";
import UserModal from "components/Admin/Users/UserModal";
import LayoutAdmin from "components/Layout/LayoutAdmin";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { fetcher } from "utils/fetcher";

const UserDetail: CustomNextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data: user, error } = useSWR("/api/user/" + userId, fetcher);

  if (!user && !error) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-4 w-full">
      <UserHeader />
      <UserContent />

      <UserModal />
    </div>
  );
};

export default UserDetail;

UserDetail.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
UserDetail.auth = true;
UserDetail.isAdmin = true;
