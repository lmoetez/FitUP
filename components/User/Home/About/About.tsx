import { Button } from "components/Tailwind";
import { useRouter } from "next/router";
import React from "react";

export const About = () => {
  const router = useRouter();

  return (
    <div className="w-full py-14 flex justify-center">
      <div className="max-w-[900px] px-4">
        <h1 className="text-center text-[37px] text-[#646464] ">
          Révisé tous le programme de mathématique en ligne de 7ème année primaire jusqu'au bac +
          préparatoire
        </h1>
        <div className="py-4 text-white text-center">
          <Button type="Default" onClick={() => router.push("/signup")}>
            S'inscrire
          </Button>
        </div>
      </div>
    </div>
  );
};
export default About;
