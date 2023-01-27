import React from "react";
import LayoutAdmin from "components/Layout/LayoutAdmin/LayoutAdmin";
import { CustomNextPage } from "types";
import useSWR, { mutate } from "swr";
import { fetcher } from "utils/fetcher";
import { User } from "types/api";
import { format } from "date-fns";
import UserModal from "components/Admin/Users/UserModal";
import useUserStore from "store/admin/useUserStore";
import Button from "components/Tailwind/Button";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import Table, { ColDefs } from "components/Tailwind/Table";
import { useRouter } from "next/dist/client/router";

const Users: CustomNextPage = () => {
  const router = useRouter();

  const { data: users } = useSWR<User[]>("/api/user", fetcher);

  const newUserModal = useUserStore((state) => state.newUserModal);
  const editUserModal = useUserStore((state) => state.editUserModal);

  const colDefs: ColDefs[] = [
    {
      headerName: "Nom",
      field: "lastName",
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Prenom",
      field: "firstName",
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Numero de telephone",
      field: "phone",
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Email",
      field: "email",
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Role",
      field: "role",
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Créer le",
      field: "createdAt",
      valueFormateur: (value: any) => format(new Date(value), "dd-MM-yyyy"),
      rowClick: (data) => router.push("/admin/users/" + data._id),
    },
    {
      headerName: "Action",
      value: (data) => (
        <div className="flex">
          <PencilAltIcon
            className="w-4 text-gray-500 cursor-pointer mr-2"
            onClick={() => {
              editUserModal(data);
            }}
          />
          <Popconfirm
            message="Êtes-vous sûr de supprimer cet utilisateur?"
            onSubmit={async () => {
              await axios.delete("/api/user/" + data._id);
              await mutate("/api/user");
            }}
          >
            <TrashIcon className="w-4 text-red-500 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col w-full">
      <div className="flex w-full justify-between mb-4">
        <div className="font-bold text-2xl text-[#4c4c4c]">Utilisateurs</div>
        <div>
          <Button type="Primary" onClick={newUserModal}>
            Ajouter
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <Table colDef={colDefs} rows={users} noDataMessage="Pas d'utilisateurs" />
      </div>
      <UserModal />
    </div>
  );
};

Users.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
Users.auth = true;
Users.isAdmin = true;

export default Users;
