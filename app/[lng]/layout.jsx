// import './global.css'
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import "../css/index.scss";
import Nav from "./components/Nav/Nav";
import Context from "./components/Context/Context";
import Provider from "./components/provider/Providers";
import { useTranslation } from "../i18n";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    icons: {
      icon: "/cat-01.jpg",
    },
  };
}
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children, params: { lng } }) {
  const history = new Date();

  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={`${tajawal.className} dark:bg-[#1d1e1e] bg-[#f7f8fc]`}
        suppressHydrationWarning={true}
      >
        <Provider>
          <Context>
            <Nav lng={lng} />
            {children}
            <footer
              className={`${
                lng === "ar" ? "ar" : ""
              } text-center px-4 py-3 font-bold bg-[#e9ecef] dark:bg-[#27282a] dark:text-[#e9ecef]   footer text-sm sm:text-md `}
            >
              Techno plus {history.getFullYear()}
            </footer>
          </Context>
        </Provider>
      </body>
    </html>
  );
}
