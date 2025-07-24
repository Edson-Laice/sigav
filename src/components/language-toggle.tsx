"use client";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  // Implemente a lógica de alternar idioma conforme sua stack (i18n, next-intl, etc)
  return (
    <Button variant="ghost" size="icon" aria-label="Alternar linguagem">
      <Globe />
    </Button>
  );
}