"use client";
import React, { useContext, useEffect, useState } from "react";
import { Values } from "../components/Context/Context";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { signIn, useSession } from "next-auth/react";
import { CREATEORDER } from "../components/lib/apis";
import { useTranslation } from "@/app/i18n/client";

export default function page({ params: { lng } }) {
  const { t } = useTranslation(lng);
  const { currency, shopping, setShopping } = useContext(Values);

  const [loading, setLoading] = useState(true);
  const [loadingAfterBuy, setLoadingAfterBuy] = useState(false);

  useEffect(() => {
    showCart();
  }, [currency]);

  const delItem = (id) => {
    let newCart = shopping.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setShopping(newCart);
  };
  const session = useSession();
  const buyFunction = async () => {
    if (session.status !== "authenticated") {
      signIn();
    } else {
      setLoadingAfterBuy(false);
      const token = await session?.data?.user?.token;
      try {
        const shoppingToSend = shopping.map((item) => ({
          card_id: item.id,
          amount: item.quantity,
        }));
        console.log(shoppingToSend);
        const response = await axios.post(
          CREATEORDER,
          {
            items: shoppingToSend,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("cart", JSON.stringify([]));
        const cart = localStorage.getItem("cart");
        setShopping(JSON.parse(cart));
        setPopup(false);
        setLoadingAfterBuy(true);
      } catch (error) {
        setLoadingAfterBuy(true);
        console.log(error);
      }
    }
  };

  const showCart = async () => {
    const cart = localStorage.getItem("cart");
    await setShopping(JSON.parse(cart));
    setLoading(false);
  };
  const [popup, setPopup] = useState(false);
  return (
    <div className="home pt-7">
      <div className="mx-2">
        <div className="nodeClone text-center pb-2 d-flex flex-column justify-content-center align-items-center mx-1 ">
          {loading ? (
            [...Array(5).keys()].map((item, i) => {
              return (
                <div
                  key={i}
                  role="status"
                  className=" w-full p-4 my-2 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className=" h-8 w-8  bg-gray-300 rounded-full dark:bg-gray-600  mb-2.5"></div>
                      <div className=" h-4 w-8 bg-gray-200 rounded-sm dark:bg-gray-700"></div>
                    </div>
                    <div className="h-6 w-8 bg-gray-300 rounded-sm dark:bg-gray-700 "></div>
                  </div>

                  <span className="sr-only">Loading...</span>
                </div>
              );
            })
          ) : shopping?.length !== 0 ? (
            shopping?.map((item, index) => (
              <div
                key={item.id}
                className="flex shadow-[0_0_5px_#c9c9c9] items-center justify-between rounded-lg px-4 py-2  mb-4 bg-[#eee] dark:bg-[#33373b]"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  <div className="flex flex-col gap-2 text-xs">
                    <span className="font-bold dark:text-[#c7c7c7]">
                      {item.name} x {item.quantity} prices
                    </span>
                    <span className="font-bold dark:text-[#c7c7c7]">
                      {item.price * item.quantity}{" "}
                      {currency === "default" ? "$" : "₺"}
                    </span>
                  </div>
                </div>
                <button
                  id={item.id}
                  type="button"
                  className="rounded-lg py-1 px-2 bg-[#d54b4b] text-white font-bold capitalize "
                  onClick={() => delItem(item.id)}
                >
                  {t("del")}
                </button>
              </div>
            ))
          ) : (
            <p className="text-[#27282a] dark:text-[#c7c7c7] font-bold text-xl m-3 capitalize">
              {t("thecart")}
            </p>
          )}
        </div>

        <button
          type="button"
          className={`${
            shopping.length ? "" : "pointer-events-none opacity-75"
          } rounded-lg block w-full py-1 px-2 bg-blue-500 text-[#c7c7c7] font-bold `}
          onClick={() => setPopup(true)}
        >
          {t("buy")}
        </button>
        {popup ? (
          <div className="fixed left-0 top-0 z-50 h-screen bg-[#14141491] w-full">
            <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-lg mx-auto w-[250px] h-auto bg-[#e9ecef] dark:bg-[#27282a]">
              <p className="text-[#878787] dark:text-[#fff] text-center capitalize">
                {t("areYouSureToBuy")}
                {lng === "ar" ? "؟" : "?"}
              </p>
              <div className="buttons flex items-center gap-2 ">
                <button
                  type="button "
                  className="bg-blue-500 capitalize rounded-sm px-2 py-1 text-[#efefefeb] dark:text-[#efefefeb]"
                  onClick={buyFunction}
                >
                  {loadingAfterBuy ? <span>...{t("loading")}</span> : t("yes")}{" "}
                </button>
                <button
                  type="button "
                  className="bg-red-500 capitalize rounded-sm px-2 py-1 text-[#efefefeb] dark:text-[#efefefeb]"
                  onClick={() => setPopup(!popup)}
                >
                  {t("no")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
