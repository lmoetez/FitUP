import React from "react";
import Image from "next/image";
import logo from "public/logo3.png";

export const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="bg-[#f1f1f1] py-[50px] ">
        <div className="w-full flex px-[16px] flex-col sm:flex-row">
          <div className="flex-1  items-center py-[16px]">
            <Image src={logo} alt="logo" height={125} width={125} />
          </div>

          <div className="flex-1 py-[16px]">
            <ul>
              <li>
                <p className="text-[16px] font-medium text-black text-left">Contact us</p>
              </li>

              <li className="mt-4">
                <p className="text-[14px] text-[#646464] text-left">
                  Numero de telephone: +21620911981
                </p>
              </li>
              <li>
                <p className="text-[14px] text-[#646464] text-left">Email: info@gmail.com</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 py-[16px]">
            <ul>
              <li>
                <p className="text-[16px] font-medium text-black text-left">Plus d'info</p>
              </li>
              <li className="mt-4 text-[14px] text-[#646464] text-left">À propos</li>
              <li className="text-[14px] text-[#646464] text-left">Communauté</li>
              <li className="text-[14px] text-[#646464] text-left">Nos offre</li>
              <li className="text-[14px] text-[#646464] text-left">S'inscrire</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
