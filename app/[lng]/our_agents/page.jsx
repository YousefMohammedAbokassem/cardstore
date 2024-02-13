import React, { Suspense } from "react";
import axios from "axios";
import { OURAGENTS } from "../components/lib/apis";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { useTranslation } from "@/app/i18n";
import { capitalize } from "../components/lib/capitalize";
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("agent")),
  };
}
export default async function page({ params: { lng } }) {
  const { t } = await useTranslation(lng);

  const session = await getServerSession(authOption);
  const token = await session.user.token;
  console.log(session);
  const req = await axios.get(OURAGENTS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = req.data.data;
  return (
    <div className="home">
      <div className="mx-2">
        <h1 className="p-2 text-[#27282a] dark:text-[#c7c7c7] text-center font-bold text-sm sm:text-lg md:text-2xl">
          {t("agent")}
        </h1>
        <div className="flex items-center justify-between mt-3 px-2 py-4 rounded-md bg-[#f7f8fc] dark:bg-[#1d1e1e]">
          <div className="flex-1 text-[#27282a] dark:text-[#c7c7c7] text-center font-bold sm:text-xs md:text-base text-[8px] ">
            {t("theName")}
          </div>
          <div className="flex-1 text-[#27282a] dark:text-[#c7c7c7] text-center font-bold sm:text-xs md:text-base text-[8px] ">
            {t("thePhone")}
          </div>
          <div className="flex-1 text-[#27282a] dark:text-[#c7c7c7] text-center font-bold sm:text-xs md:text-base text-[8px] ">
            {t("theLocation")}
          </div>
        </div>
        {res.map((item) => {
          return (
            <div className="flex text-[#27282a] dark:text-[#c7c7c7] items-center justify-between mb-3 px-2 py-4 rounded-md shadow border border-[rgba(0, 0, 0, 0.125)] border-solid bg-[#fff] dark:bg-[#33373b] ">
              <div className="flex-1 text-center sm:text-xs md:text-base text-[8px]">
                {item.name}
              </div>
              <a
                className="flex-1 text-center sm:text-xs md:text-base text-[8px]"
                href="#"
              >
                {item.phone}
              </a>
              <div className="flex-1 text-center sm:text-xs md:text-base text-[8px]">
                {item.location}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
