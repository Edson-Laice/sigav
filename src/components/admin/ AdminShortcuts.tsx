"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/UseTranslation";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

// Componente Skeleton para os atalhos
function AdminShortcutsSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border shadow-md bg-background p-5 flex flex-col items-center text-center"
          >
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <Skeleton className="h-9 w-20 mt-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminShortcuts() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento dos dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // SHORTCUTS traduzidos
  const SHORTCUTS = [
    {
      label: t("shortcut_passport_national"),
      description: t("shortcut_passport_national_desc"),
      href: "/passaportA11",
    },
    {
      label: t("shortcut_passport_minor"),
      description: t("shortcut_passport_minor_desc"),
      href: "/passaportA12",
    },
    {
      label: t("shortcut_visa_temp"),
      description: t("shortcut_visa_temp_desc"),
      href: "/visaB11",
    },
    {
      label: t("shortcut_visa_resident"),
      description: t("shortcut_visa_resident_desc"),
      href: "/visaB12",
    },
    {
      label: t("shortcut_dire"),
      description: t("shortcut_dire_desc"),
      href: "/direB38",
    },
    {
      label: t("shortcut_other"),
      description: t("shortcut_other_desc"),
      href: "/agendar",
    },
  ];

  if (isLoading) {
    return <AdminShortcutsSkeleton />;
  }

  return (
    <section>
      <h3 className="text-xl font-bold mb-6 text-accent-foreground">
        {t("shortcuts")}
      </h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {SHORTCUTS.map(({ label, href, description }) => (
          <motion.div
            key={label}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 10px 36px 0 rgba(0,0,0,0.12)",
            }}
            className="rounded-xl border border-border shadow-md bg-background p-5 flex flex-col items-center text-center group transition"
          >
            <span className="font-semibold text-base text-primary mb-1">
              {label}
            </span>
            <span className="text-xs text-muted-foreground mb-3">
              {description}
            </span>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mt-auto group-hover:bg-primary/10"
            >
              <Link href={href}>
                <ArrowRight className="w-4 h-4 mr-1" />
                {t("access")}
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}