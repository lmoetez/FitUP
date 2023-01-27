import GroupContent from "components/Admin/Groups/GroupContent";
import GroupHeader from "components/Admin/Groups/GroupHeader";
import GroupModal from "components/Admin/Groups/GroupModal";
import LayoutAdmin from "components/Layout/LayoutAdmin";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { Group } from "types/api";
import { fetcher } from "utils/fetcher";

const GroupDetail: CustomNextPage = () => {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const { data: group, error } = useSWR<Group>("/api/group/" + groupId, fetcher);

  if (!group && !error) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-4 w-full">
      <GroupHeader />
      <GroupContent />

      <GroupModal />
    </div>
  );
};

export default GroupDetail;

GroupDetail.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
GroupDetail.auth = true;
GroupDetail.isAdmin = true;
