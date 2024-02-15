"use client";
import React, { useEffect, useState } from "react";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import { memo } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faLanguage } from "@fortawesome/free-solid-svg-icons";

function Lan({ lng }) {
  const { t } = useTranslation(lng);
  const pathname = usePathname();
  function name() {
    let pathname2 = pathname.slice("1");
    // ar/asdas
    let pathname3 =
      pathname.slice("1").indexOf("/") >= 0
        ? pathname2.slice(pathname2.indexOf("/"))
        : "";
    return pathname3;
  }
  // setPath(pathname3);
  // show languages Lists
  const showLanguage = () => {
    let languages = document.querySelector(".languages");
    // setBool(!bool);
    languages.classList.toggle("active");
  };
  // set to local storage
  const set = (e) => {
    localStorage.setItem("i18nextLng", e);
    showLanguage();
  };
  return (
    <>
      <div className="lan z-10 flex items-center justify-center cursor-pointer text-white relative">
        <FontAwesomeIcon
          icon={faEarthAmericas}
          className="lanIcon md:h-5 h-3 text-[#5d5656] dark:text-white"
          onClick={showLanguage}
        />
        <ul className="languages absolute mb-0 ">
          {languages.map((l, index) => {
            return (
              <li key={l} className={`text-center px-1 py-1 font-bold`}>
                <Link
                  href={`/${l}${name()}`}
                  onClick={() => set(l)}
                  className=" text-white  py-2 px-3 pointer liLan text-center d-block"
                >
                  {/* ????????? */}
                  {t(l)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default memo(Lan);
