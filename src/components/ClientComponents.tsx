'use client';

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from '@/hooks/UseTranslation';

export default function ClientComponents() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Cor do ícone baseado no tema
  const iconColor = theme === 'dark' ? 'text-gray-200' : 'text-white';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-80 rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h3 className="font-semibold dark:text-gray-200">
              {t('online_support') || "Atendimento Online"}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('how_can_we_help') || "Como podemos ajudar você hoje?"}
              </p>
            </div>
            <div className="space-y-2">
              <a
                href="https://wa.me/25875211387"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-green-100 px-3 py-2 text-sm text-green-800 transition hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-900"
              >
                <i className="ri-whatsapp-line text-lg"></i>
                {t('whatsapp') || "WhatsApp"}
              </a>
              <a
                href="mailto:laiceedson@gmail.com"
                className="flex items-center gap-2 rounded bg-blue-100 px-3 py-2 text-sm text-blue-800 transition hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900"
              >
                <i className="ri-mail-line text-lg"></i>
                {t('email') || "Email"}
              </a>
              <a
                href="tel:+25875211387"
                className="flex items-center gap-2 rounded bg-purple-100 px-3 py-2 text-sm text-purple-800 transition hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-900"
              >
                <i className="ri-phone-line text-lg"></i>
                {t('phone') || "Telefone"}
              </a>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl dark:bg-primary-600 dark:hover:bg-primary-700"
        aria-label={t('online_support') || "Atendimento Online"}
      >
        {isOpen ? (
          <X size={24} className={iconColor} />
        ) : (
          <MessageCircle size={24} className={iconColor} />
        )}
      </button>
    </div>
  );
}