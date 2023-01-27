import React from "react";
import { signOut, useSession } from "next-auth/react";
import DropDown from "components/Tailwind/DropDown";
import { useRouter } from "next/dist/client/router";

const UserComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex items-center">
      <DropDown
        action={
          <div className="py-1">
            <div className="p-2 cursor-pointer" onClick={() => router.push("/profile")}>
              Profile
            </div>
            <hr />
            <div
              className="p-2 cursor-pointer"
              onClick={() => {
                signOut({ redirect: false });
              }}
            >
              Se deconnecter
            </div>
          </div>
        }
      >
        <div className="flex items-center">
          <div className="w-6 h-6 mr-2 bg-gray-400 text-white rounded-[50%] p-1 flex justify-center items-center">
            {session?.user?.name?.[0]?.toUpperCase()}
          </div>

          <div className="whitespace-nowrap">
            {session?.user?.name?.[0]?.toUpperCase() + session?.user?.name?.slice(1)}
          </div>
        </div>
      </DropDown>
    </div>
  );
};

export default UserComponent;
