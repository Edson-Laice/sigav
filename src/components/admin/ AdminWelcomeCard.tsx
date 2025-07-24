"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Settings, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/UseTranslation";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export function AdminWelcomeCard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento dos dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative rounded-2xl shadow-xl p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50 overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Skeleton className="h-[100px] w-[100px] rounded-xl" />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" />
            <Skeleton className="h-6 w-5/6 mx-auto md:mx-0" />
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Skeleton className="h-12 w-36 rounded-md" />
              <Skeleton className="h-12 w-36 rounded-md" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="relative rounded-2xl shadow-xl p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 opacity-20">
        <Image
          src="https://img.icons8.com/?size=100&id=8lfJc28xt9AZ&format=png&color=000000"
          alt="Airplane icon"
          width={150}
          height={150}
          className="rotate-12"
        />
      </div>

      <div className="absolute -left-10 bottom-0 opacity-20">
        <Image
          src="https://img.icons8.com/?size=100&id=epJmvGW9mBwY&format=png&color=000000"
          alt="Passport icon"
          width={120}
          height={120}
          className="-rotate-12"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src="/image/SNM2.png"
              alt="SENAMI Logo"
              width={100}
              height={100}
              className="rounded-xl shadow-lg border-2 border-white bg-white p-2"
              priority
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3">
            {t("welcome")}
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
            {t("manage")} <span className="text-primary font-medium">SENAMI - SIGAV</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button asChild variant="default" size="lg" className="group">
              <Link href="/agendar" className="flex items-center">
                <CalendarDays className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                <span className="font-semibold">{t("new_appointment")}</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/admin/settings" className="flex items-center">
                <Settings className="mr-2 w-5 h-5 group-hover:animate-spin group-hover:duration-1000" />
                <span className="font-medium">{t("settings")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating decoration */}
      <div className="absolute right-8 bottom-4 flex items-center gap-1 text-xs text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span>Sistema Integrado de Gestão de Agendamento e Vistos</span>
      </div>
    </motion.div>
  );
}

// Componente SkeletonDemo separado
export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}