"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faClose,
  faMoon,
  faPhone,
  faSun,
  faTelegram,
} from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../Footer/client";
import { useTranslation } from "@/app/i18n/client";
import axios from "axios";
import { Values } from "../Context/Context";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { HELPNUMBERS } from "../lib/apis";
export default function Nav({ lng }) {
  const { t } = useTranslation(lng);
  const [numbers, setNumbers] = useState([]);
  const [bar, setBar] = useState(true);
  //
  const tapWidth = (e) => {
    const ul = document.querySelector(".myUl"),
      tap = ul.querySelector(".tap"),
      lis = ul.querySelectorAll("li");
    let firstLiW = e.currentTarget.offsetWidth,
      firstLiH = e.currentTarget.offsetHeight,
      leftLi = e.currentTarget.offsetLeft,
      topLi = e.currentTarget.offsetTop;
    // remove all active class\
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    tap.style.setProperty("--x", `${leftLi}px`);
    tap.style.setProperty("--y", `${topLi}px`);
    tap.style.setProperty("--w", `${firstLiW}px`);
    tap.style.setProperty("--h", `${firstLiH}px`);
    if (e.target.dataset.color) {
      tap.style.backgroundColor = e.target.dataset.color;
    }
    // close side bar
    showSideBar();
  };
  const starter = () => {
    const ul = document.querySelector(".myUl"),
      tap = ul.querySelector(".tap"),
      li = ul.querySelector("li.active") || ul.querySelector("li");

    let firstLiW = li.offsetWidth;
    let firstLiH = li.offsetHeight;
    let leftLi = li.offsetLeft;
    let topLi = li.offsetTop;
    // let firstLiH = li.offsetHeight;
    // tap.style.cssText = `width:${firstLiW}px; height:${firstLiH}px;`;
    tap.style.setProperty("--x", `${leftLi}px`);
    tap.style.setProperty("--y", `${topLi}px`);
    tap.style.setProperty("--w", `${firstLiW}px`);
    tap.style.setProperty("--h", `${firstLiH}px`);
    tap.style.backgroundColor = li.dataset.color;
  };
  const session = useSession();
  useEffect(() => {
    window.onresize = () => {
      starter();

      // tap.style.cssText = `width:${firstLiW}px; height:${firstLiH}px;`;
    };
    starter();
    setTimeout(() => {
      const li = document.querySelector("li.active");
      li.click();
    }, 0);
  }, [lng]);
  //
  const fetchNumbers = async () => {
    if (session.status === "authenticated") {
      const token = await session?.data?.user?.token;
      starter();
      try {
        const res = await axios.get(HELPNUMBERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNumbers(res.data.data);
      } catch (error) {}
    } else {
      starter();
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, [session]);
  // start nav logic ###############
  // show currency on click icon
  const [boolCurrency, setBoolCurrency] = useState(false);
  const showCurrency = (e) => {
    setBoolCurrency(!boolCurrency);
  };
  // choosen Currency
  // const [currency, setCurrency] = useState("USD");
  const {
    currency,
    setCurrency,
    pathLink,
    setPathLink,
    path,
    shopping,
    setShopping,
  } = useContext(Values);
  const chooseCurrency = (e) => {
    e.target.innerHTML === "USD" ? setCurrency("default") : setCurrency("lira");
  };
  const showSideBar = () => {
    setBar(!bar);
    const sidebar = document.querySelector(".sideBar");
    sidebar.classList.toggle("showSideBar");
  };
  // start side bar logic ##################
  const hoverButtons = (e) => {
    const left = e.pageX - e.target.offsetLeft,
      top = e.pageY - e.target.offsetTop;
    e.target.style.setProperty("--x", `${left}px`);
    e.target.style.setProperty("--y", `${top}px`);
  };
  // start dark mode
  const dark = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      // setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const [mode, setMode] = useState("");

  const themeChanger = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setMode("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setMode("dark");
    }
    // localStorage.theme = mode;
  };
  useEffect(() => {
    dark();
    // showCart();
  }, []);
  const [cartLength, setCartLength] = useState(0);
  const [popup, setPopup] = useState(false);
  // const showCart = async () => {
  //   const cart = localStorage.getItem("cart");
  //   await setShopping(JSON.parse(cart));
  //   // setLoading(false);
  //   setCartLength(shopping.length);
  // };
  const route = useRouter();
  return (
    <>
      <nav className="nav fixed top-0  z-10 bg-[#fff] dark:bg-[#27282a] p-4 flex items-center justify-between">
        <div className="logo flex items-center gap-2 text-[#5d5656] font-bold">
          {""}
          <span
            className={`${
              path.includes("shopping") ? "active" : ""
            } w-fit lg:w-auto block z-10 text-[#878787] dark:text-[#5d5656] cart`}
            onClick={(e) => {
              // tapWidth(e);
              if (session.status !== "authenticated") {
                // setPathLink(link.path);
                // console.log(pathLink);
                route.push("/login");
              }
            }}
            // data-color={"#959595"}
          >
            {shopping?.length === 0 ? (
              ""
            ) : (
              <span className="cartNumber w-[10px] h-[10px] md:w-[20px] md:h-[20px] top-[-7px] right-[-4px] text-[7px] md:top-[-13px] md:right-[-13px] md:text-[13px] text-[#5d5656] dark:text-white dark:bg-[#3a3c3f] bg-[whitesmoke]">
                {shopping?.length}
              </span>
            )}
            <Link
              href={"/shopping"}
              className="w-fit md:h-5 h-3 flex items-center justify-center "
              // data-color={"#5d5656"}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="md:h-5 h-3 text-[#5d5656] dark:text-white"
                // data-color={"#959595"}
              />
            </Link>
          </span>
          <Link
            href="/"
            className="text-[10px] md:text-base text-[#5d5656] dark:text-white"
          >
            Special Design
          </Link>
          <div
            className="currency text-[10px] md:text-base z-10 relative font-bold rounded-lg text-white bg-[#5d5656]"
            onClick={showCurrency}
          >
            <button type="button" id="currency" className="px-1 py-[1px]">
              {currency === "default" ? "USD" : "TR"}
            </button>
            {boolCurrency && (
              <div className="currencies bg-[#5d5656] rounded-md absolute">
                <div className="text-center" onClick={(e) => chooseCurrency(e)}>
                  USD
                </div>
                <div className="text-center" onClick={(e) => chooseCurrency(e)}>
                  TR
                </div>
              </div>
            )}
          </div>
          <Footer lng={lng} starter={starter} />
          <FontAwesomeIcon
            className="cursor-pointer md:h-5 h-3 text-[#5d5656] dark:text-white"
            icon={mode === "light" ? faMoon : faSun}
            onClick={themeChanger}
          />
        </div>
        <ul className="myUl text-white flex items-center">
          <div
            className={`lis h-full sideBar w-[200px] lg:w-auto gap-2 bg-[#fff] dark:bg-[#27282a] flex items-center fixed lg:flex-row flex-col ${
              lng === "ar" ? "ar" : ""
            }  top-[70px] lg:top-auto lg:relative  `}
          >
            <div className="tap z-10"></div>
            {[
              {
                linkName: "home",
                path: "/",
                className: `${
                  path.includes("privacy-policy") ||
                  path.includes("our_agents") ||
                  path.includes("login") ||
                  path.includes("register")
                    ? ""
                    : "active"
                } w-full  lg:w-auto block z-10`,
                datacolor: "#5d5656",
              },
              // { linkName: "about", path: "/about" },
              {
                linkName: "privacy",
                path: "/privacy-policy",
                className: `${
                  path.includes("privacy-policy") ? "active" : ""
                } w-full  lg:w-auto block z-10`,

                datacolor: "#5d5656",
              },

              {
                linkName: "agent",
                path: "/our_agents",
                className: `${
                  path.includes("our_agents") ? "active" : ""
                } w-full  lg:w-auto block z-10`,
                datacolor: "#5d5656",
              },
            ].map((link, i) => {
              return (
                <li
                  className={`${link.className} text-[#878787] dark:text-[#fff]`}
                  key={i}
                  onClick={(e) => {
                    tapWidth(e);
                    if (
                      link.path === "/privacy-policy" ||
                      link.path === "/our_agents"
                      // link.path === "/shopping"
                    ) {
                      if (session.status !== "authenticated") {
                        // ############################
                        // setPathLink(link.path);
                        // console.log(pathLink);
                        const ul = document.querySelector(".myUl"),
                          lis = ul.querySelectorAll("li");
                        lis.forEach((li) => {
                          li.classList.remove("active");
                        });
                        const logLi = document.querySelector(".logLi");
                        logLi.classList.add("active");
                        route.push("/login");
                        setTimeout(() => {
                          starter();
                        }, 0);
                      }
                    }
                  }}
                  data-color={link.datacolor}
                >
                  <Link
                    href={link.linkName === "log" ? "#" : link.path}
                    className="px-3 w-full block capitalize"
                    data-color={link.datacolor}
                  >
                    {t(link.linkName)}
                  </Link>
                </li>
              );
            })}
            {session.status !== "authenticated" ? (
              <>
                <li
                  className={`${
                    path.includes("login") ? "active" : ""
                  } w-full logLi  lg:w-auto block z-10 text-[#878787] dark:text-[#fff]`}
                  onClick={(e) => {
                    tapWidth(e);
                    // signIn();
                  }}
                  data-color={"#2fc02f"}
                >
                  <Link
                    href={"login"}
                    className="px-3 w-full block capitalize"
                    data-color={"#2fc02f"}
                  >
                    {t("log")}
                  </Link>
                </li>
                <li
                  className={`${
                    path.includes("register") ? "active" : ""
                  } w-full  lg:w-auto block z-10 text-[#878787] dark:text-[#fff]`}
                  onClick={(e) => {
                    tapWidth(e);
                  }}
                  data-color={"blue"}
                >
                  <Link
                    href={"register"}
                    className="px-3 w-full block capitalize"
                    data-color={"blue"}
                  >
                    {t("register")}
                  </Link>
                </li>
              </>
            ) : (
              <li
                className={`${
                  path.includes("logout") ? "active" : ""
                } w-full  lg:w-auto block z-10 text-[#878787] dark:text-[#fff]`}
                onClick={(e) => {
                  tapWidth(e);
                  // signOut({ redirect: false });
                  setPopup(true);
                  route.push("/");
                }}
                data-color={"red"}
              >
                <Link
                  href={"/"}
                  className="px-3 w-full block capitalize"
                  data-color={"red"}
                >
                  {t("logout")}
                </Link>
              </li>
            )}
          </div>
          {/* asdadsasd */}
        </ul>

        <FontAwesomeIcon
          icon={bar ? faBars : faClose}
          className="bar md:h-7 h-5 text-[#5d5656] dark:text-white block lg:hidden cursor-pointer "
          onClick={showSideBar}
        />
        {popup ? (
          <div className="fixed left-0 top-0 z-50 h-screen bg-[#14141491] w-full">
            <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-lg mx-auto w-[250px] h-auto bg-[#e9ecef] dark:bg-[#27282a]">
              <p className="text-[#878787] dark:text-[#fff] text-center capitalize">
                {t("areYouSignOut")}
                {lng === "ar" ? "؟" : "?"}
              </p>
              <div className="buttons flex items-center gap-2 ">
                <button
                  type="button "
                  className="bg-blue-500 capitalize rounded-sm px-2 py-1 text-[#efefefeb] dark:text-[#efefefeb]"
                  onClick={() => {
                    signOut({ redirect: false });
                    setPopup(false);
                    starter();
                  }}
                >
                  {t("yes")}
                </button>
                <button
                  type="button "
                  className="bg-red-500 capitalize rounded-sm px-2 py-1 text-[#efefefeb] dark:text-[#efefefeb]"
                  onClick={() => {
                    setPopup(!popup);
                    const ul = document.querySelector(".myUl"),
                      li = ul.querySelector("li");
                    li.classList.add("active");
                    starter();
                  }}
                >
                  {t("no")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
