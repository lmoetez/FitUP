import { Button, Modal } from "components/Tailwind";
import React, { useEffect, useState } from "react";
import useInscriptionStore from "store/user/useInscriptionStore";
import useSWR from "swr";
import { Group } from "types/api";
import { fetcher } from "utils/fetcher";

const GroupModal = () => {
  const [groupOptions, setGroupOptions] = useState<Group[]>([]);

  const { data: groups } = useSWR<Group[]>("/api/group", fetcher);

  const { visible, _class, hideModal } = useInscriptionStore();

  useEffect(() => {
    if (!groups || !_class) return;

    const data = [];

    groups.map((group) => {
      if (group.class._id === _class._id) data.push(group);
    });

    setGroupOptions(data);
  }, [groups, _class]);

  return (
    <Modal
      title="Choisir un group"
      visible={visible}
      onClose={hideModal}
      footer={
        <div className="flex justify-end w-full">
          <Button type="Default" onClick={hideModal}>
            Close
          </Button>
        </div>
      }
    >
      {groupOptions?.map((e) => (
        <div>{e.name}</div>
      ))}
    </Modal>
  );
};

export default GroupModal;
