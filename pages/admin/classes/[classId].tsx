import ClassContent from "components/Admin/Classes/ClassContent";
import ClassHeader from "components/Admin/Classes/ClassHeader";
import ClassModal from "components/Admin/Classes/ClassModal";
import LayoutAdmin from "components/Layout/LayoutAdmin";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { ClassType } from "types/api";
import { fetcher } from "utils/fetcher";

const ClassDetail: CustomNextPage = () => {
  const router = useRouter();
  const classId = router.query.classId as string;

  const { data: _class, error } = useSWR<ClassType>("/api/class/" + classId, fetcher);

  if (!_class && !error) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-4 w-full">
      <ClassHeader />
      <ClassContent />

      <ClassModal />
    </div>
  );
};

export default ClassDetail;

ClassDetail.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
ClassDetail.auth = true;
ClassDetail.isAdmin = true;
