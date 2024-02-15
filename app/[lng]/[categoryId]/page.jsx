"use client";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import EffectFade from "../components/games/EffectFade";
import axios from "axios";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import Skeleton from "../components/Skeleton/Skeleton";
import { LOCALAPI, PRODUCTAPI } from "../components/lib/apis";
import { defaultOptions } from "../components/games/Games";
import { Tilt } from "react-tilt";

export default function page({ params: { categoryId, lng } }) {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(lng);
  const path = usePathname();
  const [info, setInfo] = useState([]);
  const router = useRouter();
  const fetchApi = async () => {
    try {
      const fetchApi = await axios.get(`${PRODUCTAPI}/${categoryId}`);
      setInfo(fetchApi.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      router.push("/not-found");
      return undefined;
    }
  };
  async function fetchUser(categoryId) {
    const res = await fetch(`${PRODUCTSAPI}/${categoryId}`);
    if (!res.ok) return undefined;
    return res.json();
  }
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <main className={`${lng === "ar" ? "ar" : ""} home py-5`}>
      <EffectFade />
      <div className="px-4 py-10 images flex flex-wrap justify-center">
        {loading ? (
          <>
            <Skeleton />
          </>
        ) : (
          info.map((item, i) => {
            return (
              <Tilt options={defaultOptions}>
                <div key={item.id}>
                  <Link
                    href={`${path}/${item.id}`}
                    role="status"
                    className={`w-full sm:w-48 p-2 block border dark:border-[#33373b]  childProduct rounded`}
                    // beforeWow
                  >
                    <img
                      className="flex items-center justify-center h-48 mb-2 rounded w-full"
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
              </Tilt>
            );
          })
        )}
      </div>
    </main>
  );
}
