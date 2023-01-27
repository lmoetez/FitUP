import UserContent from "components/Admin/Profile/ProfileContent";
import UserHeader from "components/Admin/Profile/ProfileHeader";
import UserModal from "components/Admin/Profile/ProfileModal";
import LayoutPublic from "components/Layout/LayoutPublic";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import { CustomNextPage } from "types";
import { fetcher } from "utils/fetcher";

const Profile: CustomNextPage = () => {
  const { data: session } = useSession();

  const { data: user, error } = useSWR("/api/user/" + session.user.id, fetcher);

  if (!user && !error) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-4">
      <UserHeader />
      <UserContent />

      <UserModal />
    </div>
  );
};

export default Profile;

Profile.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;
Profile.auth = true;
