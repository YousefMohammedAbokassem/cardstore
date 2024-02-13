"use client";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import EffectFade from "./EffectFade";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "../Skeleton/Skeleton";
import { useSession } from "next-auth/react";
import { LOCALAPI, PRODUCTSAPI } from "../lib/apis";
import Categories from "../lib/Categories";

export default function Games({ lng }) {
  const { t } = useTranslation(lng);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const path = usePathname();
  const FetchCategories = async () => {
    try {
      const categories = await Categories();
      setProduct(categories.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // throw new Error(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const wowas = document.querySelectorAll(".beforeWow");
      wowas.forEach((element) => {
        if (
          scrollY >
          element.offsetTop -
            (document.documentElement.clientHeight - element.offsetHeight)
        ) {
          element.classList.add("wowas");
        }
      });
    });
    FetchCategories();
  }, []);
  return (
    <>
      {/* swiper */}
      <EffectFade />
      {/* swiper */}
      <div
        className={
          "search container mx-auto my-5 flex gap-5 justify-center px-4 "
        }
      >
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-[#c7c7c7] font-bold rounded-md"
        >
          {t("search")}
        </button>
        <div className="relative flex-1 ">
          <input
            type="text"
            name="search"
            id="search"
            className="w-full px-3 py-1 dark:text-[#c7c7c7] bg-[#efefefeb] dark:bg-[#33373b] border border-solid border-[#ced4da] dark:border-[#615b5b] outline-none rounded-md"
            placeholder={t("search")}
            title="search"
            onChange={(e) =>
              setSearch(
                e.target.value
                  .toLowerCase()
                  .trim()
                  .split("")
                  .filter((item) => {
                    return item !== " ";
                  })
                  .join("")
              )
            }
          />
          <span
            className={`${
              lng === "ar" && "ar"
            } absolute font-bold right-[10px] dark:text-[#c7c7c7]`}
            onClick={() => setSearch("")}
          >
            X
          </span>
        </div>
      </div>
      <div className="px-4 pb-10 images gap-x-8 gap-y-12 flex flex-wrap justify-center">
        {loading ? (
          <Skeleton />
        ) : product.filter((item) => {
            return search === ""
              ? item
              : item.name
                  .toLowerCase()
                  .trim()
                  .split("")
                  .filter((item) => {
                    return item !== " ";
                  })
                  .join("")
                  .includes(search);
          }).length ? (
          product
            .filter((item) => {
              return search === ""
                ? item
                : item.name
                    .toLowerCase()
                    .trim()
                    .split("")
                    .filter((item) => {
                      return item !== " ";
                    })
                    .join("")
                    .includes(search);
            })
            .map((item, i) => {
              return (
                <div
                  key={item.id}
                  className={`${item.is_available === 0 ? "disabled" : ""} `}
                >
                  <Link
                    href={`${path}/${item.id}`}
                    role="status"
                    className={`${
                      item.is_available === 0 ? "disabled" : ""
                    } w-48 p-2 block border dark:border-[#33373b]  childProduct rounded`}
                    // beforeWow
                  >
                    <img
                      className="flex items-center justify-center h-48 mb-2 rounded"
                      src={`${LOCALAPI}${item.image}`}
                      // src={`/cat-0${i + 1}.jpg`}
                      // width={400}
                      // height={400}
                      alt="no image"
                    />
                    <div className="h-10 p-2 dark:text-[#c7c7c7]  sm:text-lg text-base font-bold flex items-center justify-center rounded-sm capitalize">
                      {t(item.name)}
                    </div>
                  </Link>
                </div>
              );
            })
        ) : (
          <div className="text-[#27282a] dark:text-[#c7c7c7] text-2xl capitalize font-bold">
            {t("sorry")}
            <span className=" text-red-600 dark:text-red-700">
              {search}
            </span>{" "}
          </div>
        )}
        {}
      </div>
    </>
  );
}
