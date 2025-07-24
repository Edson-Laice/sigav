"use client";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

// Componente Skeleton para o footer
function AdminFooterSkeleton() {
  return (
    <footer className="w-full mt-auto bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Skeleton para cada coluna */}
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

        {/* Divisor */}
        <Skeleton className="h-px w-full my-6" />

        {/* Rodapé inferior */}
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

export function AdminFooter() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento dos dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AdminFooterSkeleton />;
  }

  return (
    <footer className="w-full mt-auto bg-background border-t border-border" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4 py-8">
        <h2 id="footer-heading" className="sr-only">Rodapé do SENAMI</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contatos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contatos</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="tel:+244222000000" className="hover:text-primary transition-colors">
                  +244 222 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="tel:+244923000000" className="hover:text-primary transition-colors">
                  +244 923 000 000 (Emergências)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <a href="mailto:info@senami.gov.ao" className="hover:text-primary transition-colors">
                  info@senami.gov.ao
                </a>
              </li>
            </ul>
          </div>

          {/* Localização */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Localização</h3>
            <address className="not-italic space-y-2">
              <p>Ministério do Interior</p>
              <p>Edifício SENAMI</p>
              <p>Rua Major Kanhangulo, Nº 100</p>
              <p>Luanda, Angola</p>
            </address>
          </div>

          {/* Horário */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Horário de Atendimento</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>08:00 - 15:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>09:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/documentos" className="hover:text-primary transition-colors">
                  Documentos Necessários
                </Link>
              </li>
              <li>
                <Link href="/taxas" className="hover:text-primary transition-colors">
                  Tabela de Taxas
                </Link>
              </li>
              <li>
                <Link href="/legislacao" className="hover:text-primary transition-colors">
                  Legislação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-border my-6" aria-hidden="true"></div>

        {/* Rodapé inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/image/SNM2.png"
              alt="Logo SENAMI"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-sm font-medium">SENAMI - SIGAV</span>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Serviço Nacional de Migração. Todos os direitos reservados.
          </div>

          <div className="flex gap-4">
            <Link href="/politica-privacidade" className="text-xs hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-uso" className="text-xs hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}