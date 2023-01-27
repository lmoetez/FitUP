import axios from "axios";
import Button from "components/Tailwind/Button";
import FormText from "components/Tailwind/Form/FormText";
import Modal from "components/Tailwind/Modal/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "store/admin/useUserStore";
import { mutate } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required("Le prenom est obligatoire"),
    lastName: yup.string().required("Le nom est obligatoire"),
    phone: yup.string().required("Le num est obligatoire").length(8),
    email: yup.string().email().required("L'email est obligatoire"),
    password: yup.string(),
  })
  .required();

const UserModal = () => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const visible = useUserStore((state) => state.visible);
  const user = useUserStore((state) => state.user);
  const onClose = useUserStore((state) => state.hideUserModal);

  useEffect(() => {
    if (visible && user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("phone", user.phone);
      setValue("role", user.role);
      setValue("email", user.email);
      resetField("password");
    }
  }, [visible, user]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.put("/api/user/" + user._id, data);
      await mutate("/api/user");
      onClose();

      setLoading(false);
    } catch (error) {
      if (error.response.data.message === "Email exist")
        setError("email", {
          type: "manual",
          message: "Email exist",
        });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title={"Modifier vos informations"}
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
              <FormText name="lastName" label="Nom" errors={errors} register={register} />
              <FormText name="firstName" label="Prenom" errors={errors} register={register} />
              <FormText
                name="phone"
                label="Numero de telephone"
                errors={errors}
                register={register}
              />
              <FormText name="email" label="Email" errors={errors} register={register} />
              <FormText
                name="password"
                label="Mot de passe"
                type="password"
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

export default UserModal;
