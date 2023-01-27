import React from "react";
import Image from "next/image";
import { Button } from "components/Tailwind";
import { useRouter } from "next/router";

export const HomePage = () => {
  const router = useRouter();

  return (
    <div className="grid-rows-2 justify-center">
      <div className="grid grid-rows-1 h-full w-full">
        <div className="flex">
          <div className="text-center flex-1">
            <h1 className="text-black font-bold text-[50px] lg:text-[65px] leading-relaxed">
              IT´S TIME TO MAKE YOUR SUCCESS
            </h1>
            <hr className="w-[50%] inline-block justify-center  border-t-4" />
            <h1 className="text-center text-[16px] lg:text-[20px] text-[#646464] px-6 ">
              Intellgence Canap math est une plate-forme d'apprentissage axée sur les étudiants.
              Enseigner à travers des vidéos ... encadrées par un groupe de professeurs et
              éducateurs expérimentés. Il y a plus de 1000 vidéos gratuites à voir par vous-même
            </h1>
            <div className="py-4  text-white">
              <Button type="Primary" onClick={() => router.push("/offres")}>
                Commencer maintenant
              </Button>
            </div>
          </div>
          <div className="hidden flex-1 md:flex md:items-center">
            <Image src="/home-img.png" alt="img" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
