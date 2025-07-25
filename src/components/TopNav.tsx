"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useTranslation } from "@/hooks/UseTranslation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { SearchDialog } from "./SearchDialog";
import { Skeleton } from "@/components/ui/skeleton";

type Lang = "pt" | "en" | "fr" | "es" | "zh";

type Language = {
  code: Lang;
  countryCode: string;
  label: string;
};

const LANGUAGES: Language[] = [
  { code: "pt", countryCode: "MZ", label: "Português" },
  { code: "en", countryCode: "GB", label: "English" },
  { code: "fr", countryCode: "FR", label: "Français" },
  { code: "es", countryCode: "ES", label: "Español" },
  { code: "zh", countryCode: "CN", label: "中文" },
];

const DEFAULT_LANGUAGE = LANGUAGES[0];

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(navigator.userAgent);
}

export function TopNav() {
  const { t, lang, setLang } = useTranslation();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const currentLanguage = LANGUAGES.find(l => l.code === lang) || DEFAULT_LANGUAGE;

  const handleGreenLineClick = (e: React.MouseEvent) => {
    const phone = "+25890243";
    if (!isMobile()) {
      e.preventDefault();
      navigator.clipboard.writeText(phone);
      toast(`${t("green_line")} (90243)`, {
        description: t("number_copied"),
        icon: <i className="ri-phone-line text-green-600 text-xl" />
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleInputClick = () => {
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Skeleton className="h-[38px] w-[90px] rounded-lg" />
            
            <div className="flex items-center gap-2 md:hidden">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="hidden md:flex items-center gap-2 md:gap-3">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          <div className="w-full md:hidden mt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2">
          {/* Primeira linha (mobile) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/image/SIGAV_Final.png"
                alt="SIGAV Logo"
                width={90}
                height={38}
                className="rounded-lg cursor-pointer"
                priority
              />
            </Link>

            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:+25890243"
                onClick={handleGreenLineClick}
                className="flex items-center gap-1 p-2 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition"
              >
                <i className="ri-phone-line text-xl" />
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition"
                    aria-label={t("select_language")}
                  >
                    <ReactCountryFlag
                      countryCode={currentLanguage.countryCode}
                      svg
                      style={{
                        width: '1.25em',
                        height: '1.25em',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                      aria-label={currentLanguage.label}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {LANGUAGES.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setLang(language.code)}
                      className={lang === language.code ? "bg-accent font-medium" : ""}
                    >
                      <ReactCountryFlag
                        countryCode={language.countryCode}
                        svg
                        style={{
                          width: '1em',
                          height: '1em',
                          marginRight: '0.5em',
                          borderRadius: '50%'
                        }}
                        aria-hidden
                      />
                      {language.label}
                      {lang === language.code && (
                        <i className="ri-check-line ml-auto text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <ModeToggle />

              <Link
                href="/access"
                className="flex items-center gap-2 p-2 rounded-md border hover:bg-accent transition"
              >
                <i className="ri-login-circle-line text-xl" />
              </Link>
            </div>
          </div>

          {/* Segunda linha (mobile) - Agendar e Pesquisa */}
          <div className="w-full md:hidden mt-2">
            <div className="flex items-center gap-2">
              <Menubar className="border-none">
                <MenubarMenu>
                  <MenubarTrigger asChild>
                    <Link
                      href="/agendar"
                      className="font-semibold px-3 py-2 rounded-md transition text-sm hover:bg-accent w-full"
                    >
                      {t("schedule")}
                    </Link>
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
              
              <form onSubmit={handleSearch} className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={handleInputClick}
                  placeholder={t("search_placeholder")}
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition text-sm cursor-pointer"
                  readOnly
                />
              </form>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link
                    href="/agendar"
                    className="font-semibold px-3 py-2 rounded-md transition text-sm hover:bg-accent"
                  >
                    {t("schedule")}
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
            
            <form onSubmit={handleSearch} className="relative flex-1">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={handleInputClick}
                placeholder={t("search_placeholder")}
                className="w-full pl-10 pr-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition text-sm cursor-pointer"
                readOnly
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-2 md:gap-3">
            <a
              href="tel:+25890243"
              onClick={handleGreenLineClick}
              className="flex items-center gap-2 font-semibold px-3 py-2 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition text-sm"
            >
              <i className="ri-phone-line text-xl" />
              <span className="hidden sm:inline">{t("green_line")}</span> (90243)
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition"
                  aria-label={t("select_language")}
                >
                  <ReactCountryFlag
                    countryCode={currentLanguage.countryCode}
                    svg
                    style={{
                      width: '1.25em',
                      height: '1.25em',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    aria-label={currentLanguage.label}
                  />
                  <span className="uppercase text-sm hidden sm:inline">{currentLanguage.code}</span>
                  <i className="ri-arrow-down-s-line text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                {LANGUAGES.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className={lang === language.code ? "bg-accent font-medium" : ""}
                  >
                    <ReactCountryFlag
                      countryCode={language.countryCode}
                      svg
                      style={{
                        width: '1em',
                        height: '1em',
                        marginRight: '0.5em',
                        borderRadius: '50%'
                      }}
                      aria-hidden
                    />
                    {language.label}
                    {lang === language.code && (
                      <i className="ri-check-line ml-auto text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />

            <Link
              href="/access"
              className="flex items-center gap-2 font-semibold px-3 py-2 rounded-md border hover:bg-accent transition text-sm"
            >
              <i className="ri-login-circle-line text-xl" />
              <span className="hidden sm:inline">{t("access")}</span>
            </Link>
          </div>
        </div>
      </header>

      <SearchDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        searchQuery={search} 
      />
    </>
  );
}