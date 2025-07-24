"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/UseTranslation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
}

export function SearchDialog({ open, onOpenChange, searchQuery }: SearchDialogProps) {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState("1");
  
  const getInputPlaceholder = () => {
    switch(searchType) {
      case "1": return t("provide_appointment_code");
      case "2": return t("provide_bi_number");
      case "3": return t("provide_passport_number");
      case "4": return t("provide_visa_number");
      default: return t("provide_appointment_code");
    }
  };

  const getInputLabel = () => {
    switch(searchType) {
      case "1": return t("appointment_code");
      case "2": return t("bi_number");
      case "3": return t("passport_number");
      case "4": return t("visa_number");
      default: return t("appointment_code");
    }
  };

  return (
    <AnimatePresence>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[725px] p-0 overflow-hidden border-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 shadow-2xl rounded-lg"
          >
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="uppercase text-[#4F565C] dark:text-gray-300">
                  {t("system_title")}
                </DialogTitle>
                <motion.p 
                  className="text-[#4F565C] dark:text-gray-400 mt-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {t("search_here")}
                </motion.p>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <motion.div 
                  className="grid grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="search-type">{t("search_by")}</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-white/70 dark:bg-gray-800/70">
                        <SelectValue placeholder={t("select")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                        <SelectItem value="1">{t("appointment_code")}</SelectItem>
                        <SelectItem value="2">{t("bi")}</SelectItem>
                        <SelectItem value="3">{t("passport")}</SelectItem>
                        <SelectItem value="4">{t("visa")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="code">{getInputLabel()}</Label>
                    <Input 
                      id="code" 
                      placeholder={getInputPlaceholder()}
                      defaultValue={searchType === "1" ? searchQuery : ""}
                      className="bg-white/70 dark:bg-gray-800/70"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="nickname">{t("nickname")}</Label>
                    <Input 
                      id="nickname" 
                      placeholder={t("provide_nickname")}
                      className="w-full bg-white/70 dark:bg-gray-800/70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">{t("phone_or_email")}</Label>
                    <Input 
                      id="contact" 
                      placeholder={t("provide_contact")} 
                      className="w-full bg-white/70 dark:bg-gray-800/70"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-primary/90 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary transition-all"
                  >
                    <span className="mr-2">{t("search")}</span>
                    <i className="ri-search-line" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}