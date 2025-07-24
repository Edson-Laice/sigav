"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/UseTranslation";
import { TopNav } from "@/components/TopNav";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { AdminFooter } from "@/components/admin/AdminFooter";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function SchedulePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="container mx-auto px-4 py-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-2">
            {t("service_categories")}
          </h3>
          <p className="text-muted-foreground">
            {t("select_service_category_description")}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="foreign" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="national">
                <div className="flex items-center justify-center gap-2">
                  <Image 
                    src="/images/flagmoz.png" 
                    alt="Moz Flag" 
                    width={24} 
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">
                    {t("national_citizen")}
                  </span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="foreign">
                <div className="flex items-center justify-center gap-2">
                  <Image 
                    src="/images/flagforeign.png" 
                    alt="Foreign Flag" 
                    width={24} 
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">
                    {t("foreign_citizen")}
                  </span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* National Citizens Tab */}
            <TabsContent value="national" className="mt-6">
              <Card>
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle>{t("services_for_nationals")}</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    {t("select_document_type_nationals")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Accordion type="multiple" className="w-full space-y-2">
                    {/* Passport Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="passport" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-primary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("passport")}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <div className="space-y-2">
                            {[
                              { id: "A11", text: t("passport_adults") },
                              { id: "A12", text: t("passport_minors") },
                              { id: "A13", text: t("passport_acquired_nationality") },
                              { id: "A14", text: t("passport_minor_foreign_parents") }
                            ].map((item) => (
                              <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                  <motion.a 
                                    whileHover={{ x: 5 }}
                                    href="#" 
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <span>
                                      {item.text} <span className="text-muted-foreground">({item.id})</span>
                                    </span>
                                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                                  </motion.a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("click_to_schedule")} {item.text.toLowerCase()}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    {/* Travel Document Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="travel-document" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-primary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("travel_document_miners")} (A2)
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.a 
                                whileHover={{ x: 5 }}
                                href="#" 
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                              >
                                <span>
                                  {t("travel_document_miners_full")} <span className="text-muted-foreground">(A2)</span>
                                </span>
                                <ExternalLink className="text-muted-foreground h-4 w-4" />
                              </motion.a>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t("click_to_schedule")} {t("travel_document_miners_full").toLowerCase()}
                            </TooltipContent>
                          </Tooltip>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    {/* Emergency Certificate Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="emergency-certificate" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-primary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("emergency_certificate_nationals")} (A3)
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.a 
                                whileHover={{ x: 5 }}
                                href="#" 
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                              >
                                <span>
                                  {t("emergency_certificate_nationals_full")} <span className="text-muted-foreground">(A3)</span>
                                </span>
                                <ExternalLink className="text-muted-foreground h-4 w-4" />
                              </motion.a>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t("click_to_schedule")} {t("emergency_certificate_nationals_full").toLowerCase()}
                            </TooltipContent>
                          </Tooltip>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Foreign Citizens Tab */}
            <TabsContent value="foreign" className="mt-6">
              <Card>
                <CardHeader className="bg-secondary text-secondary-foreground">
                  <CardTitle>{t("services_for_foreigners")}</CardTitle>
                  <CardDescription className="text-secondary-foreground/80">
                    {t("select_document_type_foreigners")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Accordion type="multiple" className="w-full space-y-2" defaultValue={["visa", "visa-extension"]}>
                    {/* Visa Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="visa" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-secondary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("visa_application")}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <div className="space-y-2">
                            {[
                              { id: "B11", text: t("temporary_stay_visa") },
                              { id: "B12", text: t("residence_visa") },
                              { id: "B14", text: t("student_visa") },
                              { id: "B15", text: t("investment_visa") },
                              { id: "B16", text: t("cultural_visa") },
                              { id: "B17", text: t("other_visas") }
                            ].map((item) => (
                              <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                  <motion.a 
                                    whileHover={{ x: 5 }}
                                    href="#" 
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <span>
                                      {item.text} <span className="text-muted-foreground">({item.id})</span>
                                    </span>
                                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                                  </motion.a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("click_to_schedule")} {item.text.toLowerCase()}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    {/* Work Visa Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="work-visa" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-secondary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("work_visa_application")}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <div className="space-y-2">
                            {[
                              { id: "B131", text: t("employee_work_visa") },
                              { id: "B132", text: t("cooperation_work_visa") },
                              { id: "B233", text: t("missionary_visa_extension") }
                            ].map((item) => (
                              <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                  <motion.a 
                                    whileHover={{ x: 5 }}
                                    href="#" 
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <span>
                                      {item.text} <span className="text-muted-foreground">({item.id})</span>
                                    </span>
                                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                                  </motion.a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("click_to_schedule")} {item.text.toLowerCase()}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    {/* Visa Extension Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="visa-extension" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-secondary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("visa_extension")}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <div className="space-y-2">
                            {[
                              { id: "B21", text: t("temporary_stay_visa_extension") },
                              { id: "B24", text: t("student_visa_extension") },
                              { id: "B25", text: t("investment_visa_extension") },
                              { id: "B26", text: t("cultural_visa_extension") },
                              { id: "B27", text: t("other_visas_extension") }
                            ].map((item) => (
                              <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                  <motion.a 
                                    whileHover={{ x: 5 }}
                                    href="#" 
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <span>
                                      {item.text} <span className="text-muted-foreground">({item.id})</span>
                                    </span>
                                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                                  </motion.a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("click_to_schedule")} {item.text.toLowerCase()}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    {/* DIR Section */}
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="dire" className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]]:bg-accent">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-secondary rounded-full"></div>
                            <span className="text-lg font-semibold text-left">
                              {t("dire")}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                          <div className="space-y-2">
                            {[
                              { id: "B38", text: t("dire_renewal") },
                              { id: "B31", text: t("dire_spouse") },
                              { id: "B32", text: t("dire_minor_children") },
                              { id: "B33", text: t("dire_cooperation_spouse") },
                              { id: "B34", text: t("dire_cooperation_child") },
                              { id: "B35", text: t("dire_missionary_spouse") },
                              { id: "B36", text: t("dire_missionary_child") },
                              { id: "B37", text: t("dire_other_dependents") }
                            ].map((item) => (
                              <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                  <motion.a 
                                    whileHover={{ x: 5 }}
                                    href="#" 
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <span>
                                      {item.text} <span className="text-muted-foreground">({item.id})</span>
                                    </span>
                                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                                  </motion.a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("click_to_schedule")} {item.text.toLowerCase()}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>
      <AdminFooter/>
    </div>
    
  );
}