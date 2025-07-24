"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

// Componente Skeleton para os passos
function AdminStepsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-6 rounded-xl border border-border bg-background h-full">
          <div className="flex flex-col items-center text-center h-full">
            <Skeleton className="w-8 h-8 rounded-full mb-4" />
            <div className="flex-1 w-full space-y-3">
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-4/5 mx-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminSteps() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento dos dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      number: 1,
      title: "1º PASSO",
      description: "Navegue até a lista de documentos para Nacionais e Estrangeiros através da opção Agendar Serviço"
    },
    {
      number: 2,
      title: "2º PASSO",
      description: "Selecione o documento que pretende, preencha o formulário por completo e clique em Submeter"
    },
    {
      number: 3,
      title: "3º PASSO",
      description: "Confirme o seu agendamento e receberá a notificação por SMS ou e-mail com o respectivo código de agendamento"
    }
  ];

  if (isLoading) {
    return <AdminStepsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl border border-border bg-background hover:shadow-md transition-shadow h-full"
        >
          <div className="flex flex-col items-center text-center h-full">
            <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mb-4 font-bold">
              {step.number}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3 text-primary">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}