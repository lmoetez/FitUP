import GroupSection from "components/Admin/Dashboard/GroupSection";
import UserSection from "components/Admin/Dashboard/UserSection";
import Week from "components/Admin/Dashboard/Week";
import LayoutAdmin from "components/Layout/LayoutAdmin";
import React from "react";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { Group, User } from "types/api";
import { fetcher } from "utils/fetcher";

const Home: CustomNextPage = () => {
  const { data: groups, error: errorGroup } = useSWR<Group[]>("/api/group", fetcher);
  const { data: users, error: errorUser } = useSWR<User[]>("/api/user", fetcher);

  if ((!groups && !errorGroup) || (!users && !errorUser)) return <p>Loading ...</p>;

  return (
    <div className="w-full p-4">
      <Week />
      <div className="flex mt-2 flex-wrap">
        <GroupSection />
        <div className="w-4" />
        <UserSection />
      </div>
    </div>
  );
};
Home.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
Home.auth = true;
Home.isAdmin = true;

export default Home;
