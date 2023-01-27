import axios from "axios";
import Button from "components/Tailwind/Button";
import FormText from "components/Tailwind/Form/FormText";
import Modal from "components/Tailwind/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useClassStore from "store/admin/useClassStore";
import { mutate } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSelect from "components/Tailwind/Form/FormSelect";
import { classLevel, subjectOption } from "models/class.model";

const schema = yup
  .object({
    classLevel: yup.string().required("Le niveau est obligatoire"),
    subject: yup.string().required("La matière est obligatoire"),
    schoolYear: yup.string().required("L'année scolaire est obligatoire"),
    annualPrice: yup.number().required("Le prix annuel est obligatoire"),
    monthlyPrice: yup.number().required("Le prix mensuel est obligatoire"),
  })
  .required();

const ClassModal = () => {
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

  const visible = useClassStore((state) => state.visible);
  const _class = useClassStore((state) => state._class);
  const onClose = useClassStore((state) => state.hideClassModal);

  useEffect(() => {
    if (visible)
      if (_class) {
        setValue("classLevel", _class.classLevel);
        setValue("subject", _class.subject);
        setValue("schoolYear", _class.schoolYear);
        setValue("annualPrice", _class.annualPrice);
        setValue("monthlyPrice", _class.monthlyPrice);
      } else {
        resetField("classLevel");
        resetField("subject");
        resetField("schoolYear");
        resetField("annualPrice");
        resetField("monthlyPrice");
      }
  }, [visible, _class]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (_class) await axios.put("/api/class/" + _class._id, data);
      else await axios.post("/api/class", data);

      await mutate("/api/class");
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
        title={_class ? "Modifier la class" : "Ajouter une class"}
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
              <FormSelect
                name="classLevel"
                label="Niveau"
                options={[...classLevel]}
                errors={errors}
                control={control}
              />
              <FormSelect
                name="subject"
                label="Matière"
                options={[...subjectOption]}
                errors={errors}
                control={control}
              />
              <FormText
                name="schoolYear"
                label="Année scolaire"
                errors={errors}
                register={register}
              />
              <FormText
                name="annualPrice"
                label="Prix annuel"
                type="number"
                errors={errors}
                register={register}
              />
              <FormText
                name="monthlyPrice"
                label="Prix mensuel"
                type="number"
                errors={errors}
                register={register}
              />
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default ClassModal;
