import LayoutPublic from "components/Layout/LayoutPublic";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormText from "components/Tailwind/Form/FormText";
import Button from "components/Tailwind/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Alert from "components/Tailwind/Alert";
import { CustomNextPage } from "types";

const schema = yup
  .object({
    email: yup.string().email().required("Email obligatoire"),
    password: yup.string().required("Mot de passe obligatoire"),
  })
  .required();

const Signin: CustomNextPage = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  const { data: session, status } = useSession();

  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      const role = session.user.role;
      router.replace(callbackUrl || (role === "Admin" ? "/admin" : "/"));
    }
  }, [session, status]);

  const onSubmit = async (credentials) => {
    setLoading(true);

    const { error } = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (!!error) {
      setErrorAlert(true);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="h-full p-5 flex items-center justify-center">
      <div className="w-[600px] max-w-[90%] bg-white p-6 rounded-lg">
        <p className="text-[36px] font-bold text-center mb-6 text-[#646464]">Se connecter</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormText name="email" label="Email" errors={errors} register={register} />
          <FormText
            name="password"
            label="Mot de passe"
            type="password"
            errors={errors}
            register={register}
          />
          {errorAlert && (
            <div className="mb-5">
              <Alert type="Danger" message="Email ou mot de passe incorrect" />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <Button type="Primary" loading={loading} htmlType="submit">
              Se connecter
            </Button>
            <Button
              type="Text"
              htmlType="button"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Créer votre compte
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Signin.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;

export default Signin;
