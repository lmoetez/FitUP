import React from "react";
import LayoutAdmin from "components/Layout/LayoutAdmin/LayoutAdmin";
import { CustomNextPage } from "types";
import useSWR, { mutate } from "swr";
import { fetcher } from "utils/fetcher";
import { Group } from "types/api";
import { format } from "date-fns";
import GroupModal from "components/Admin/Groups/GroupModal";
import useGroupStore from "store/admin/useGroupStore";
import Button from "components/Tailwind/Button";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import Table, { ColDefs } from "components/Tailwind/Table";
import { useRouter } from "next/dist/client/router";

const Groups: CustomNextPage = () => {
  const router = useRouter();

  const newGroupModal = useGroupStore((state) => state.newGroupModal);
  const editGroupModal = useGroupStore((state) => state.editGroupModal);

  const { data: group } = useSWR<Group[]>("/api/group", fetcher);

  const colDefs: ColDefs[] = [
    {
      headerName: "Nom",
      field: "name",
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Class",
      field: "class.classLevel",
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Année scolaire",
      field: "class.schoolYear",
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Professeur",
      value: (data) => data.prof.firstName + " " + data.prof.lastName,
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Nombre de seance par semaine",
      field: "sessionPerWeek",
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Jour des seance",
      value: (data) => (
        <>
          {data.sessionDates.map((e, index) => (
            <p key={index}>
              {index + 1}
              {") " +
                e.day +
                " de " +
                e.from?.hour +
                ":" +
                e.from?.minute +
                " a " +
                e.to?.hour +
                ":" +
                e.to?.minute}
            </p>
          ))}
        </>
      ),
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Date debut",
      field: "start",
      valueFormateur: (value) => !!value && format(new Date(value), "dd-MM-yyyy"),
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Date fin",
      field: "end",
      valueFormateur: (value) => !!value && format(new Date(value), "dd-MM-yyyy"),
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Créer le",
      field: "createdAt",
      valueFormateur: (value: any) => !!value && format(new Date(value), "dd-MM-yyyy"),
      rowClick: (data) => router.push("/admin/groups/" + data._id),
    },
    {
      headerName: "Action",
      value: (data) => (
        <div className="flex">
          <PencilAltIcon
            className="w-4 text-gray-500 cursor-pointer mr-2"
            onClick={() => {
              editGroupModal(data);
            }}
          />
          <Popconfirm
            message="Êtes-vous sûr de supprimer ce group?"
            onSubmit={async () => {
              await axios.delete("/api/group/" + data._id);
              await mutate("/api/group");
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
        <div className="font-bold text-2xl text-[#4c4c4c]">Groups</div>
        <div>
          <Button type="Primary" onClick={newGroupModal}>
            Ajouter
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <Table colDef={colDefs} rows={group} noDataMessage="Pas de group" />
      </div>
      <GroupModal />
    </div>
  );
};

Groups.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
Groups.auth = true;
Groups.isAdmin = true;

export default Groups;
