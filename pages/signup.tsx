import LayoutPublic from "components/Layout/LayoutPublic";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormText from "components/Tailwind/Form/FormText";
import Button from "components/Tailwind/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { CustomNextPage } from "types";

const schema = yup
  .object({
    firstName: yup.string().required("Le prenom est obligatoire"),
    lastName: yup.string().required("Le nom est obligatoire"),
    phone: yup.string().required("Le num est obligatoire").length(8),
    email: yup.string().email().required("Email obligatoire"),
    password: yup.string().required("Mot de passe obligatoire"),
  })
  .required();

const Signup: CustomNextPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      const role = session.user.role;
      router.replace(role === "Admin" ? "/admin" : "/");
    }
  }, [session, status]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.post("/api/auth/signup", data);
      router.replace("/signin");

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
    <div className="h-full p-5 flex items-center justify-center">
      <div className="w-[600px] max-w-[90%] bg-white p-6 rounded-lg">
        <p className="text-[36px] font-bold text-center mb-6 text-[#646464]">Créer votre compte</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormText name="lastName" label="Nom" errors={errors} register={register} />
          <FormText name="firstName" label="Prenom" errors={errors} register={register} />
          <FormText name="phone" label="Numero de telephone" errors={errors} register={register} />
          <FormText name="email" label="Email" errors={errors} register={register} />
          <FormText
            name="password"
            label="Mot de passe"
            type="password"
            errors={errors}
            register={register}
          />
          <div className="flex justify-center">
            <Button type="Primary" loading={loading} htmlType="submit">
              Créer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Signup.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;

export default Signup;
