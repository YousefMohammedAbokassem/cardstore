import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";
import Games from "./components/games/Games";
import { capitalize } from "./components/lib/capitalize";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("home")),
  };
}

export default async function Page({ params: { lng } }) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);

  return (
    <main className={`${lng === "ar" && "ar"} home pt-7`}>
      <Games lng={lng} />
    </main>
  );
}
