"use client";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useTranslation } from '@/hooks/UseTranslation';
import { DynamicMap } from "../maps/DynamicMap";
import { useTheme } from "next-themes";

function AdminFooterSkeleton() {
  return (
    <footer className="w-full mt-auto bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(index === 3 ? 4 : 3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {index === 0 && <Skeleton className="h-4 w-4" />}
                    <Skeleton className={`h-4 ${index === 2 ? 'w-full' : 'w-40'}`} />
                    {index === 2 && i < 2 && <Skeleton className="h-4 w-16" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="h-px w-full my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </footer>
  );
}

type ThemeMode = 'light' | 'dark';

function getSafeTheme(
  theme: string | undefined,
  systemTheme: string | undefined
): ThemeMode {
  if (theme && theme !== 'system') {
    return theme as ThemeMode;
  }
  return (systemTheme as ThemeMode) || 'light';
}

export function AdminFooter() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() =>
    getSafeTheme(theme, systemTheme)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setMounted(true);
    setCurrentTheme(getSafeTheme(theme, systemTheme));

    return () => clearTimeout(timer);
  }, [theme, systemTheme]);

  if (isLoading || !mounted) {
    return <AdminFooterSkeleton />;
  }

  return (
    <footer className="w-full mt-auto bg-background border-t border-border" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4 py-8">
        <h2 id="footer-heading" className="sr-only">{t('footer_title')}</h2>

        {/* Map Section - Now at the top */}
        <div className="mb-8 relative rounded-lg overflow-hidden border border-border shadow-sm">
          <div className="relative z-0"> {/* Camada base com z-index 0 */}
            <DynamicMap darkMode={currentTheme === 'dark'} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t('footer_contacts')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="tel:+25822000000" className="hover:text-primary transition-colors">
                  {t('footer_phone1')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="tel:+25821000000" className="hover:text-primary transition-colors">
                  {t('footer_phone2')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="mailto:info@senami.gov.mz" className="hover:text-primary transition-colors">
                  {t('footer_email')}
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t('footer_location')}</h3>
            <address className="not-italic space-y-2">
              <p>{t('footer_address1')}</p>
              <p>{t('footer_address2')}</p>
              <p>{t('footer_address3')}</p>
              <p>{t('footer_address4')}</p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t('footer_hours')}</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>{t('footer_weekdays')}:</span>
                <span>{t('footer_hoursWeekdays')}</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer_saturday')}:</span>
                <span>{t('footer_hoursSaturday')}</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer_sunday')}:</span>
                <span className="text-destructive">{t('footer_closed')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border my-6" aria-hidden="true"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/image/SNM2.png"
              alt={t('footer_logoAlt')}
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-sm font-medium">{t('footer_sigav')}</span>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} {t('footer_copyright')}
          </div>

          <div className="flex gap-4">
            <Link href="/politica-privacidade" className="text-xs hover:text-primary transition-colors">
              {t('footer_privacy')}
            </Link>
            <Link href="/termos-uso" className="text-xs hover:text-primary transition-colors">
              {t('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}