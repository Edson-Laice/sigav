// Update your UseTranslation.tsx file
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";
import zh from "@/locales/zh.json";
import { useLanguage } from "../contexts/LanguageProvider";

// Create a type from your Portuguese translations (assuming it's the most complete)
type TranslationKeys = keyof typeof pt;

// Create a type for the translation records
type TranslationRecord = Partial<Record<TranslationKeys, string>>;

const translations: Record<"pt" | "en" | "fr" | "es" | "zh", TranslationRecord> = {
  pt,
  en,
  fr,
  es,
  zh
};

export function useTranslation() {
  const { lang, setLang } = useLanguage();
  
  const t = (key: TranslationKeys) => {
    const translation = translations[lang][key];
    return translation || key; // Fallback to the key if translation is missing
  };
  
  return { t, lang, setLang };
}