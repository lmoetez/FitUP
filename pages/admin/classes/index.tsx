import React from "react";
import LayoutAdmin from "components/Layout/LayoutAdmin/LayoutAdmin";
import { CustomNextPage } from "types";
import useSWR, { mutate } from "swr";
import { fetcher } from "utils/fetcher";
import { ClassType } from "types/api";
import { format } from "date-fns";
import ClassModal from "components/Admin/Classes/ClassModal";
import useClassStore from "store/admin/useClassStore";
import Button from "components/Tailwind/Button";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import Popconfirm from "components/Tailwind/Popconfirm/Popconfirm";
import Table, { ColDefs } from "components/Tailwind/Table";
import { useRouter } from "next/dist/client/router";

const Classes: CustomNextPage = () => {
  const router = useRouter();

  const { data: classes } = useSWR<ClassType[]>("/api/class", fetcher);

  const newClassModal = useClassStore((state) => state.newClassModal);
  const editClassModal = useClassStore((state) => state.editClassModal);

  const colDefs: ColDefs[] = [
    {
      headerName: "Niveau",
      field: "classLevel",
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Matière",
      field: "subject",
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Année scolaire",
      field: "schoolYear",
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Prix annuel",
      field: "annualPrice",
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Prix mensuel",
      field: "monthlyPrice",
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Créer le",
      field: "createdAt",
      valueFormateur: (value: any) => format(new Date(value), "dd-MM-yyyy"),
      rowClick: (data) => router.push("/admin/classes/" + data._id),
    },
    {
      headerName: "Action",
      value: (data) => (
        <div className="flex">
          <PencilAltIcon
            className="w-4 text-gray-500 cursor-pointer mr-2"
            onClick={() => {
              editClassModal(data);
            }}
          />
          <Popconfirm
            message="Êtes-vous sûr de supprimer cette classe?"
            onSubmit={async () => {
              await axios.delete("/api/class/" + data._id);
              await mutate("/api/class");
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
        <div className="font-bold text-2xl text-[#4c4c4c]">Classes</div>
        <div>
          <Button type="Primary" onClick={newClassModal}>
            Ajouter
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <Table colDef={colDefs} rows={classes} noDataMessage="Pas de classe" />
      </div>
      <ClassModal />
    </div>
  );
};

Classes.getLayout = (Page) => <LayoutAdmin>{Page}</LayoutAdmin>;
Classes.auth = true;
Classes.isAdmin = true;

export default Classes;
