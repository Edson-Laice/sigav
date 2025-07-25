// app/not-found.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from '@/hooks/UseTranslation';

// Animations com tipagem correta
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const floatingVariants: Variants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export default function NotFound() {
  const { t, lang } = useTranslation();

  // Verifique se as chaves de tradução existem no seu arquivo de traduções
  const translations = {
    title: t('title'),
    description: t('description'),
    homeButton: t('homeButton'),
    helpButton: t('helpButton'),
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      key={lang} // Isso força o rerender quando o idioma muda
    >
      <motion.div 
        className="max-w-lg text-center space-y-6"
        variants={containerVariants}
      >
        <motion.div
          className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full"
          variants={floatingVariants}
          animate="float"
        >
          <RocketIcon className="h-10 w-10 text-primary" />
        </motion.div>

        <motion.h1 
          className="text-5xl font-extrabold tracking-tight text-primary"
          variants={itemVariants}
        >
          404
        </motion.h1>

        <motion.h2 
          className="text-2xl font-semibold"
          variants={itemVariants}
        >
          {translations.title}
        </motion.h2>

        <motion.p 
          className="text-muted-foreground"
          variants={itemVariants}
        >
          {translations.description}
        </motion.p>

        <motion.div 
          className="flex gap-4 justify-center pt-4"
          variants={itemVariants}
        >
          <Button asChild variant="outline">
            <Link href="/">{translations.homeButton}</Link>
          </Button>
          <Button asChild>
            <Link href="/contato">{translations.helpButton}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}