import { useTranslation } from "@/app/i18n";
import { capitalize } from "../components/lib/capitalize";
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("notFound")),
  };
}

export default async function page({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return (
    <main className="home notFound capitalize text-xl md:text-3xl font-bold text-[#3f3f3f94] dark:text-[#c7c7c7] flex items-center justify-center">
      {t("notFound")}
    </main>
  );
}
