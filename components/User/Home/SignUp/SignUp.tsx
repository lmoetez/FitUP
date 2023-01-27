import React from "react";
import Image from "next/image";
import { Button } from "components/Tailwind";
import { useRouter } from "next/router";

const prod = "/prod-im02.png";

export const SignUp = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-sky-300 to-sky-700">
      <div className="flex">
        <div className="hidden md:flex md:items-center">
          <Image src={prod} alt="prod" width={500} height={475} />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-[30px] font-semibold text-white text-center">
            Vous voulez en savoir plus sur les offres de Intellegence canape math ?
          </p>

          <div className=" lg:pt-10 py-6 ">
            <Button
              type="Default"
              className="!bg-white !border-0"
              onClick={() => router.push("/signup")}
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
