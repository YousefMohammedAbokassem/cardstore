'use client'
import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng, starter }) => {
  const { t } = useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} starter={starter} />;
};
