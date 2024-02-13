"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import EffectFade from "../../components/games/EffectFade";
// import Skeleton from "../../components/Skeleton/Skeleton";

import { Values } from "../../components/Context/Context";
import Skeleton from "../../components/Skeleton/Skeleton";
import { LOCALAPI, PRODUCYTINFO } from "../../components/lib/apis";

export default function page({ params: { categoryId, productId, lng } }) {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(lng);
  const path = usePathname();
  const [info, setInfo] = useState([]);
  const [price, setPrice] = useState(1);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [imageCard, setImageCard] = useState(0);
  const [nameCard, setNameCard] = useState(0);
  const [popup, setPopup] = useState(false);
  const [showSuccessful, setShowSuccessful] = useState(false);

  const { currency, setShopping, shopping } = useContext(Values);
  const router = useRouter();
  const fetchApi = async () => {
    try {
      const fetchApi = await axios.get(`${PRODUCYTINFO}/${productId}`, {
        headers: {
          currency: currency,
        },
      });
      setInfo(fetchApi.data.data);
      setLoading(false);
    } catch (error) {
      router.push("/not-found");
      setLoading(false);
    }
  };
  const [quantity, setQuantity] = useState(1);
  const funDetails = (e) => {
    setPrice(e.target.dataset.price);
    setDescription(e.target.dataset.description);
    setIdProduct(e.target.dataset.target);
    setImageCard(e.target.dataset.image);
    setNameCard(e.target.dataset.name);

    //                     data-image={`${PRODUCTSAPI}${item?.card_image}`}
    //                     data-name={item?.name}
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const addToShopping = () => {
    const existingItemIndex = shopping.findIndex(
      (item) => item.infoId === info?.id
    );
    if (existingItemIndex !== -1) {
      // If the product ID already exists, update the corresponding item
      const updatedShopping = [...shopping];
      updatedShopping[existingItemIndex] = {
        // id: 14,
        // name: "card_6",
        // description: "1000 توكن",
        // price: 8000,
        // card_image: "/images/categories/1706362589.png",
        id: idProduct,
        price: price,
        image: imageCard,
        name: nameCard,
        infoId: info?.id,
        quantity: quantity,
        // Add other properties as needed
      };
      setShopping(updatedShopping);
      setPopup(false);
      setShowSuccessful(true);

      setTimeout(() => {
        setShowSuccessful(false);
      }, 5000);
    } else {
      // If the product ID doesn't exist, add a new item to the shopping array
      setShopping([
        ...shopping,
        {
          id: idProduct,
          price: price,
          image: imageCard,
          name: nameCard,
          infoId: info?.id,
          quantity: quantity,
          // Add other properties as needed
        },
      ]);
      setPopup(false);
      setShowSuccessful(true);

      setTimeout(() => {
        setShowSuccessful(false);
      }, 5000);
    }
  };
  useEffect(() => {
    fetchApi();
    setTotal(price * quantity);
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
      if (card.classList.contains("active")) {
        card.click();
      }
    });
  }, [currency, price]);
  useEffect(() => {
    if (info?.has_cards === 0) {
      setPrice(info?.cards?.[0].price);
      setDescription(info?.cards?.[0].description);
      setImageCard(`${LOCALAPI}${info?.cards?.[0].card_image}`);
      setNameCard(info?.cards?.[0].name);
      setIdProduct(info?.cards?.[0].id);
    }
  }, [info]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shopping));
    const carts = localStorage.getItem("cart");
  }, [shopping]);
  return (
    <main className={`${lng === "ar" ? "ar" : ""} home py-5 payInputs`}>
      <EffectFade />
      <div className="px-4 py-10 images gap-x-5 gap-y-8 flex flex-wrap justify-center">
        {/* images */}
        {parseInt(info?.has_cards) === 1 ? (
          loading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>
              <>
                {info.cards?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        item.is_available === 0 ? "cursor-not-allowed" : ""
                      } `}
                    >
                      <div
                        className={`${
                          item.is_available === 0 ? "disabledCard" : ""
                        }  cursor-pointer cards`}
                        key={item?.id}
                        // target = id
                        data-target={item?.id}
                        data-price={item?.price}
                        data-description={item?.description}
                        data-image={`${LOCALAPI}${item?.card_image}`}
                        data-name={item?.name}
                        onClick={(e) => funDetails(e)}
                      >
                        <div
                          className={`${
                            item.is_available === 0 ? "disabledCard" : ""
                          } pointer-events-none w-48 p-2 block border dark:border-[#33373b] childProduct rounded`}
                          role="status"
                        >
                          <img
                            className="flex items-center justify-center h-48 mb-2 rounded"
                            src={`${LOCALAPI}${item?.card_image}`}
                            width={400}
                            height={400}
                            alt="no image"
                          />
                          <div className="h-10 p-2 dark:text-[#c7c7c7]  sm:text-lg text-base font-bold flex items-center justify-center rounded-sm capitalize">
                            {item.is_available === 0
                              ? "unavailable"
                              : `${t(item.price)} ${
                                  currency === "default" ? "$" : "₺"
                                }`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            </>
          )
        ) : loading ? (
          <Skeleton />
        ) : (
          <div className="imageIcon h-[100px] w-96 container">
            <img
              src={`${LOCALAPI}${info?.image}`}
              alt="no image"
              className="h-full w-full"
            />
          </div>
        )}
      </div>
      {/* inputs */}
      <div className="inputs mx-2 flex items-center gap-2 my-2">
        <label
          htmlFor="num"
          className="capitalize flex flex-col gap-2 flex-1 dark:text-[#c7c7c7]"
        >
          {t("quantity")}
          <input
            className="bg-[#efefefeb] dark:bg-[#33373b] outline-none border border-solid border-[#ced4da] dark:border-[#555555] text-[#495057] dark:text-[#c7c7c7] "
            type="number"
            name="num"
            id="num"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        {/*  */}
        <label
          htmlFor="total"
          className="capitalize flex flex-col gap-2 flex-1 dark:text-[#c7c7c7]"
        >
          {t("total")}

          <input
            className="bg-[#e9ecefb9] dark:bg-[#33373b71] cursor-not-allowed text-[#495057] dark:text-[#c7c7c7]"
            type="text"
            name="total"
            id="total"
            disabled
            value={
              quantity *
              (info?.has_cards === 0 ? info?.cards?.[0]?.price : price)
            }
          />
        </label>
      </div>
      {/*  */}
      <div className="my-3 bg-blue-300 dark:bg-[#8787ff] p-3 mx-2 text-blue-800 dark:text-blue-200 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {
            // info?.cards[0]?.icon &&
            <img
              className=" w-4 h-4 rounded-full"
              src={
                info?.cards?.[0]?.icon ? `${LOCALAPI}${info.cards[0].icon}` : ""
              }
              alt=""
            />
          }{" "}
          x {quantity}
          {"  "}
          {info?.has_cards === 0
            ? `${info?.cards[0].description}`
            : `${description}`}
        </div>
        <i>{price * quantity}</i>
      </div>
      {/* <div className="my-2 bg-blue-200 p-3 mx-2 text-blue-800 flex items-center justify-between">
        <p>{}</p>
      </div> */}
      {/* ####################### */}
      <div className="mx-2">
        <button
          type="button"
          className={`${
            info?.has_cards === 1 ? "active" : ""
          } px-2 py-2 w-full bg-[#5c5cdf] font-bold text-white dark:text-[#c7c7c7] rounded-md`}
          onClick={() => setPopup(!popup)}
        >
          {t("add")}
        </button>
      </div>
      {popup ? (
        <div className="fixed left-0 top-0 z-50 h-screen bg-[#14141491] w-full">
          <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-lg mx-auto w-[250px] h-auto bg-[#e9ecef] dark:bg-[#27282a]">
            <p className="text-[#878787] dark:text-[#fff] text-center capitalize">
              {t("areYou")} <span>{nameCard}</span> {t("worth")}{" "}
              <span>{price * quantity}</span> {t("toThe")}
              {lng === "ar" ? "؟" : "?"}
            </p>
            <div className="buttons flex items-center gap-2 ">
              <button
                type="button "
                className="bg-blue-500 capitalize rounded-sm px-2 py-1 text-[#efefefeb] dark:text-[#efefefeb]"
                onClick={addToShopping}
              >
                {t("yes")}
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
      {showSuccessful ? (
        <div className="bg-[#2fc02f] p-2 text-white capitalize ">
          {t("successfulAdd")}
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
