"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "@/app/i18n/client";
import { useContext, useState } from "react";
import { Values } from "../components/Context/Context";
// export async function generateMetadata({ params: { lng } }) {
//   const { t } = await useTranslation(lng);
//   return { title: t("log") };
// }
export default function page({ params: { lng } }) {
  const router = useRouter();
  const handleSignUp = () => {
    router.push("/register");
  };
  // const [error, setError] = useState("");
  // const session = useSession();
  // const { data: session, status: sessionStatus} = useSession();

  ////////////////////////
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [countryCode, setCountryCode] = useState(""); // State for country code
  const [error, setError] = useState("");
  const { t } = useTranslation(lng);
  const setInfoNumber = (value, country, e, formattedValue) => {
    setCountryCode(country.dialCode);
    if (value.indexOf(country.dialCode) !== -1) {
      setTel(value.slice(value.indexOf(country.dialCode) + countryCode.length));
      // console.log(value.slice(value.indexOf(country.dialCode).length));
    }
  };
  const { pathLink, setPathLink, path } = useContext(Values);
  const [loading, setLoading] = useState(false);
  const submitInfo = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      phone: tel,
      password: password,
      country_code: `+${countryCode}`,
      redirect: false,
    });
    setLoading(true);
    if (res.ok === true) {
      setLoading(false);
      // to return the user to the page that he came from it
      router.replace("/");
      // window.history = 0;
      // return the default path
      setPathLink(path);
    }
    if (res.ok === false) {
      setLoading(false);
      console.log(res.error);
      setError(res.error);
      // throw new Error(res.error);
    }
  };
  // ar/asdas
  return (
    <div className="login recover sign h-screen">
      <div className="form w-full sm:w-[500px] p-5  md:p-10">
        <h4 className="p-4">{t("register")}</h4>
        <form className="p-4 flex flex-col bg-white" onSubmit={submitInfo}>
          <label htmlFor="tel" className="flex flex-col mb-4 gap-2 capitalize">
            {t("tel")}
            <PhoneInput
              country={"sy"}
              // value={tel}

              // dir="ltr"
              containerClass="direction"
              inputClass="inputPhone"
              onChange={(value, country, e, formattedValue) =>
                setInfoNumber(value, country, e, formattedValue)
              }
              inputProps={{
                required: true,
              }}
            />
          </label>
          <label
            htmlFor={"password"}
            className={"flex flex-col mb-4 gap-2 capitalize"}
          >
            {t("password")}
            <input
              type={"password"}
              placeholder={t("enterPassword")}
              name={"password"}
              id={"password"}
              className={"rounded-sm"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor={"checkbox"} className={"flex mb-4 gap-2 capitalize"}>
            {t("remember")}
            <input
              type={"checkbox"}
              name={"checkbox"}
              id={"checkbox"}
              className={"cursor-pointer"}
            />
          </label>
          {/* buttons */}
          <div className="buttons flex justify-center items-center mb-3 gap-2">
            <button
              type="submit"
              className="bg-green-500 flex-1 p-2 text-white font-bold rounded-md  "
            >
              {loading ? <span>...{t("loading")}</span> : t("log")}
            </button>
            <button
              type="button"
              className="bg-blue-500  flex-1 p-2 text-white font-bold rounded-md"
            >
              {t("register")}
            </button>
          </div>
          {/* buttons */}
          {error.length ? (
            <div className="text-red-500 font-bold text-center capitalize">
              {t("thePhoneOrNumber")}
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="px-4 py-2 text-[15px] text-blue-500 link text-sm ">
          <Link href={"/recover"} className="capitalize">
            {t("did")}
          </Link>
        </div>
      </div>
    </div>
  );
}
