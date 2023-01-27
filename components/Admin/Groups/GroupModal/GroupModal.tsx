import axios from "axios";
import Button from "components/Tailwind/Button";
import { FormText, FormProf, FormClass, FormSelect } from "components/Tailwind/Form";
import Modal from "components/Tailwind/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGroupStore from "store/admin/useGroupStore";
import { mutate } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { dayOption } from "models/group.model";
import { format } from "date-fns";

const schema = yup
  .object({
    name: yup.string().required("Nom est obligatoire"),
    class: yup.mixed().required("Classe est obligatoire"),
    prof: yup.mixed().required("Prof est obligatoire"),
    sessionPerWeek: yup
      .number()
      .required("Nombre de seance par semaine est obligatoire")
      .min(1, "Nombre de seance doit être supérieur à 0")
      .max(7, "Nombre de seance doit être inférieur à 0"),
    sessionDates: yup.mixed(),
    start: yup.date().required("Date debut est obligatoire"),
    end: yup.date().required("Date fin est obligatoire"),
  })
  .required();

const GroupModal = () => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
    setError,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [sessionPerWeek, setSessionPerWeek] = useState<number>(0);

  const visible = useGroupStore((state) => state.visible);
  const group = useGroupStore((state) => state.group);
  const onClose = useGroupStore((state) => state.hideGroupModal);

  useEffect(() => {
    if (visible)
      if (group) {
        setValue("name", group.name);
        setValue("class", group.class);
        setValue("prof", group.prof);
        setValue("sessionPerWeek", group.sessionPerWeek);
        setValue(
          "sessionDates",
          group.sessionDates.map((e) => ({
            ...e,
            from: e.from.hour + ":" + e.from.minute,
            to: e.to.hour + ":" + e.to.minute,
          }))
        );
        setValue("start", !!group.start && format(new Date(group.start), "yyyy-MM-dd"));
        setValue("end", !!group.end && format(new Date(group.end), "yyyy-MM-dd"));
        setSessionPerWeek(group.sessionPerWeek);
      } else {
        resetField("name");
        resetField("class");
        resetField("prof");
        resetField("sessionPerWeek");
        resetField("sessionDates");
        resetField("start");
        resetField("end");
        setSessionPerWeek(0);
      }
  }, [visible, group]);

  const onSubmit = async (data) => {
    setLoading(true);

    const sessionDates = data.sessionDates.map((e, index) => ({
      day: e.day,
      from: { hour: e.from.slice(0, 2), minute: e.from.slice(-2) },
      to: { hour: e.to.slice(0, 2), minute: e.to.slice(-2) },
    }));

    try {
      if (group) await axios.put("/api/group/" + group._id, { ...data, sessionDates });
      else await axios.post("/api/group", { ...data, sessionDates });

      await mutate("/api/group");
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title={group ? "Modifier le group" : "Ajouter un group"}
        visible={visible}
        onClose={onClose}
        footer={
          <div className="w-full flex justify-end">
            <Button type="Default" className="mr-2" onClick={onClose} htmlType="button">
              Annuler
            </Button>
            <Button type="Primary" loading={loading} htmlType="submit">
              Sauvegarder
            </Button>
          </div>
        }
      >
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto bg-white dark:bg-gray-800 rounded px-4">
            <div className="container mx-auto">
              <FormText name="name" label="Nom" errors={errors} register={register} />
              <FormClass name="class" label="Classe" errors={errors} control={control} />
              <FormProf name="prof" label="Prof" errors={errors} control={control} />
              <FormText
                name="start"
                label="Date debut"
                type="date"
                errors={errors}
                register={register}
              />
              <FormText
                name="end"
                label="Date end"
                type="date"
                errors={errors}
                register={register}
              />
              <FormText
                name="sessionPerWeek"
                label="Nombre de seance par semaine"
                type="number"
                errors={errors}
                register={register}
                onChange={(value) => {
                  setSessionPerWeek(value);
                }}
              />
              {sessionPerWeek > 0 &&
                Array.from({ length: sessionPerWeek }, (v, i) => i + 1).map((e, i) => (
                  <div key={i}>
                    <p className="font-bold">Seance {e}</p>
                    <div className="grid gap-3 grid-cols-3">
                      <FormSelect
                        name={`sessionDates.${i}.day`}
                        label="Jour"
                        options={[...dayOption]}
                        errors={errors}
                        control={control}
                      />
                      <FormText
                        name={`sessionDates.${i}.from`}
                        label="De"
                        type="time"
                        errors={errors}
                        register={register}
                      />
                      <FormText
                        name={`sessionDates.${i}.to`}
                        label="Jusqu'a"
                        type="time"
                        errors={errors}
                        register={register}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default GroupModal;
