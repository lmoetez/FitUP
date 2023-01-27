import { Button } from "components/Tailwind";
import { useRouter } from "next/router";
import React from "react";

export const New = () => {
  const router = useRouter();

  return (
    <div className="bg-[#f5f5f5] py-8">
      <div className="">
        <div className="px-[10%]">
          <div className="text-[#102d4e] text-[1.86em] font-semibold "> Qui sommes nous ?</div>
          <div className=" text-[#646464] text-[1.06em]">
            Intellgence Canap math est une plate-forme d'apprentissage axée sur les étudiants.
            Enseigner à travers des vidéos ... encadrées par un groupe de professeurs et éducateurs{" "}
            expérimentés. Il y a plus de 1000 vidéos gratuites à voir par vous-même
          </div>
          {/* <div className="pt-16 grid grid-rows-4 gap-6 ">
            <div className="grid grid-cols-12 ">
              <div className="w-[80px] h-[80px] bg-[#ff5670] rounded-lg  col-span-1 shadow-lg shadow-[#ff567066]"></div>
              <div className=" col-span-11 pl-6">
                <h1 className="text-[#292929] text-[1.36em] font-medium">Créée en 2022</h1>
                <h4>
                  La 1ère plateforme d'enseignement <br />
                  en ligne en Tunisie.
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="w-[80px] h-[80px] bg-[#fcb600] rounded-lg  col-span-1 shadow-lg shadow-[#fcb60066]"></div>
              <div className=" col-span-11 pl-6">
                <h1 className="text-[#292929] text-[1.36em] font-medium">Appelez-nous</h1>
                <h4>20911981</h4>
              </div>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="w-[80px] h-[80px] bg-[#2ba7df] rounded-lg  col-span-1 shadow-lg shadow-[#2ba7df66]"></div>
              <div className=" col-span-11 pl-6">
                <h1 className="text-[#292929] text-[1.36em] font-medium">Créée en 2013</h1>
                <h4>
                  La 1ère plateforme d'enseignement <br />
                  en ligne en Tunisie.
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="w-[80px] h-[80px] bg-[#3cd1a2] rounded-lg  col-span-1 shadow-lg shadow-[#3cd0a166]"></div>
              <div className=" col-span-11 pl-6">
                <h1 className="text-[#292929] text-[1.36em] font-medium">Créée en 2013</h1>
                <h4>
                  La 1ère plateforme d'enseignement <br />
                  en ligne en Tunisie.
                </h4>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="py-6 text-center text-white">
        <Button type="Primary" onClick={() => router.push("/offres")}>
          Commencer maintenant
        </Button>
      </div>
    </div>
  );
};
export default New;
