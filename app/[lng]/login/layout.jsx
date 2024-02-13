import { useTranslation } from "@/app/i18n";
import { capitalize } from "../components/lib/capitalize";
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("log")),
  };
}
export default function layout({ children, params: { lng } }) {
  return <>{children}</>;
}
