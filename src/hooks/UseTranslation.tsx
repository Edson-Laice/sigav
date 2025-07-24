import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";
import zh from "@/locales/zh.json";
import { useLanguage } from "../contexts/LanguageProvider";

type TranslationKeys = keyof typeof pt;

const translations: Record<"pt" | "en" | "fr" | "es" | "zh", Record<TranslationKeys, string>> = { pt, en, fr, es, zh };

export function useTranslation() {
  const { lang, setLang } = useLanguage();
  const t = (key: TranslationKeys) => translations[lang][key] || key;
  return { t, lang, setLang };
}