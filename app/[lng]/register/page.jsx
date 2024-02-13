"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "@/app/i18n/client";
import { t } from "i18next";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CREATEACOUNT } from "../components/lib/apis";
// import { useRouter } from "next/router";
// export function generateMetadata({ params: { lng } }) {
//   const { t } = useTranslation(lng);
//   return { title: t("register") };
// }
export default function page({ params: { lng } }) {
  const { t } = useTranslation(lng);
  // tell state
  const [tel, setTel] = useState("");
  const [countryCode, setCountryCode] = useState(""); // State for country code
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState(""); // State for country code
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const route = useRouter();
  const setInfoNumber = (value, country, e, formattedValue) => {
    setCountryCode(country.dialCode);

    if (value.indexOf(country.dialCode) !== -1) {
      setTel(value.slice(value.indexOf(country.dialCode) + countryCode.length));
      // console.log(value.slice(value.indexOf(country.dialCode).length));
    }
  };
  const submitInfo = async (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById("password"),
      surePassword = document.getElementById("surePassword");
    if (passwordInput.value !== surePassword.value) {
      surePassword.classList.add("active");
    } else {
      try {
        const response = await axios.post(CREATEACOUNT, {
          name: userName,
          location: city,
          country_code: `+${countryCode}`,
          phone: tel,
          password: password, // Make sure to send the actual password string
          fcm_token: "1111",
        });
        const res = await signIn("credentials", {
          phone: tel,
          password: password,
          country_code: `+${countryCode}`,
          redirect: false,
        });
        route.push("/");
      } catch (error) {
        // console.log(error)
        setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="register login sign h-screen ">
      <div className="form w-full sm:w-fit p-5  md:p-10">
        <h4 className="p-4">{t("new")}</h4>
        <form className="p-4 flex flex-col bg-white" onSubmit={submitInfo}>
          <p className="px-4 py-2 m-2 bg-orange-800 capitalize">
            {t("notice")}
          </p>
          <label
            htmlFor="username"
            className="flex flex-col mb-4 gap-2 capitalize"
          >
            {t("user")}
            <input
              type="text"
              placeholder={t("user")}
              name="text"
              id="username"
              className="rounded-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="city" className="flex flex-col mb-4 gap-2 capitalize">
            {t("country")}
            <input
              type="text"
              placeholder={t("country")}
              name="text"
              id="city"
              className="rounded-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label htmlFor="tel" className="flex flex-col mb-4 gap-2 capitalize">
            {t("tel")}
            <PhoneInput
              country={"sy"}
              // value={tel}
              containerClass="direction"
              inputClass="inputPhone"
              onChange={(value, country, e, formattedValue) =>
                setInfoNumber(value, country, e, formattedValue)
              }
              required
            />
          </label>
          {/* <label htmlFor="" className="flex flex-col  mb-4 gap-2 capitalize">
            {t("email")}
            <input
              type="email"
              placeholder={t("enterEmail")}
              name="email"
              id="email"
              className="rounded-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label> */}
          <div className="select flex flex-col outline-none gap-2 mb-4 ">
            <span className="text-[#959595] capitalize">{t("currency")}</span>
            <select name="Currency" id="currency" className="rounded-sm">
              <option value="USD">USD</option>
              <option value="TR">TR</option>
            </select>
          </div>
          {/* PASSWORD */}
          <div className="gap-2  flex-col sm:flex-row flex">
            <label htmlFor="password" className=" flex flex-col gap-2">
              {t("password")}
              <input
                type="password"
                placeholder={t("enterPassword")}
                name="password"
                id="password"
                className="rounded-sm mb-3"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label htmlFor="surePassword" className=" flex flex-col gap-2">
              {t("surePassword")}
              <input
                type="password"
                placeholder={t("surePassword")}
                name="surePassword"
                id="surePassword"
                className="rounded-sm mb-3"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {/* PASSWORD */}
          {/* buttons */}
          <div className="buttons flex justify-center items-center mb-3 gap-2">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-800 ccc flex-1 p-2 text-white font-bold rounded-md  "
            >
              {t("log")}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800  flex-1 p-2 text-white font-bold rounded-md"
            >
              {t("register")}
            </button>
          </div>
          {/* buttons */}
          {error.length ? (
            <div className="text-red-500 font-bold text-center">{error}</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
