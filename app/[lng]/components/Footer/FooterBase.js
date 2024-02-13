import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../../i18n/settings";
import Lan from "./Lan";

export const FooterBase = ({ t, lng, path = "", starter }) => {
  return (
    <>
      <Lan lng={lng} starter={starter} />
    </>
  );
};
