"use client";
import { AdminHeader } from "./AdminHeader";
import { AdminWelcomeCard } from "./ AdminWelcomeCard";
import { AdminSteps } from "./AdminSteps";
import { AdminShortcuts } from "./ AdminShortcuts";
import { AdminFooter } from "./AdminFooter";

export function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <AdminHeader />
      <main className="flex-1 flex flex-col min-h-screen bg-background">
        <section className="flex-1 flex flex-col gap-8 px-10 py-10 bg-gradient-to-br from-muted/30 to-background/80">
          <AdminWelcomeCard />
          <AdminSteps />
          <AdminShortcuts />
        </section>
        <AdminFooter />
      </main>
    </div>
  );
}