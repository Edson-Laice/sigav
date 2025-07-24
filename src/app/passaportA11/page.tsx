"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";


// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


// Icons
import { Mail, Phone, RefreshCw, CalendarIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { TopNav } from "@/components/TopNav";
import { AdminFooter } from "@/components/admin/AdminFooter";
import { Resolver } from 'react-hook-form';

// Validation schema
const formSchema = z.object({
  // Document info
  documentType: z.string().min(1, "Selecione o tipo de documento"),
  modality: z.string().min(1, "Selecione a modalidade"),
  fee: z.string().min(1, "Selecione a taxa"),

  // Personal info
  fullName: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
  lastName: z.string().min(3, "Apelido muito curto").max(50, "Apelido muito longo"),
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  idNumber: z.string().regex(/^\d{12}[a-zA-Z]$/, "Número de BI inválido"),
  lifetimeId: z.string().min(1, "Selecione uma opção"),
  idExpiryDate: z.string().min(1, "Data de validade obrigatória"),
  idIssuePlace: z.string().min(3, "Local de emissão muito curto").max(35, "Local de emissão muito longo"),
  birthCountry: z.string().min(1, "Selecione o país de nascimento"),
  nationality: z.string().default("Moçambicana"),

  // Address
  province: z.string().min(1, "Selecione a província"),
  city: z.string().min(1, "Selecione a cidade/distrito"),
  neighborhood: z.string().max(140, "Máximo 140 caracteres").optional(),

  // Contact and scheduling
  travelReason: z.string().min(10, "Descreva o motivo da viagem").max(140, "Máximo 140 caracteres"),
  observation: z.string().optional(),
  documentLocation: z.string().min(1, "Selecione o local"),
  preferredDate: z.string().min(1, "Selecione uma data"),
  countryCode: z.string().min(1, "Selecione o código do país"),
  phone: z.string().regex(/^\d{9}$/, "Número inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),

  // Terms
  terms: z.boolean().refine(val => val, "Você deve aceitar os termos")
});

type FormData = z.infer<typeof formSchema>;

const totalSteps = 4; // Reduced from 6 to 4 steps

export default function PassportForm() {
 
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
  resolver: zodResolver(formSchema) as Resolver<FormData>,
  defaultValues: {
    documentType: "",
    modality: "",
    fee: "",
    fullName: "",
    lastName: "",
    birthDate: "",
    idNumber: "",
    lifetimeId: "",
    idExpiryDate: "",
    idIssuePlace: "",
    birthCountry: "",
    nationality: "Moçambicana",
    province: "",
    city: "",
    travelReason: "",
    documentLocation: "",
    countryCode: "258",
    phone: "",
    email: "",
    terms: false,
    preferredDate: "",
    observation: "",
    neighborhood: ""
  }
});

  const nextStep = async () => {
  const stepFields: Record<number, (keyof FormData)[]> = {
    0: ['documentType', 'modality', 'fee'],
    1: ['fullName', 'lastName', 'birthDate', 'idNumber', 'lifetimeId', 'idExpiryDate', 'idIssuePlace', 'birthCountry', 'province', 'city'],
    2: ['travelReason', 'documentLocation', 'preferredDate', 'countryCode', 'phone']
  };

  const currentFields = stepFields[currentStep] || [];
  const isValid = await form.trigger(currentFields);
  if (isValid) {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }
};

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: FormData) => {
    const termsValid = await form.trigger("terms");
    if (!termsValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Dados do formulário:", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Formulário submetido com sucesso!");
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Erro ao submeter:", error);
      alert("Ocorreu um erro ao submeter o formulário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (field: keyof FormData) => {
    return form.formState.errors[field]?.message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TopNav />
    
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 font-inter antialiased">
        <Card className="mx-auto max-w-4xl rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="bg-white text-gray-800 p-6 border-b border-gray-100">
            <CardTitle className="text-center uppercase text-2xl font-bold tracking-wide">
              PASSAPORTE PARA NACIONAIS MAIORES DE 18 ANOS (A11)
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Document Information */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-center text-gray-800 mb-6">Documento</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                      <Controller
                        name="documentType"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="documentType" className={cn(getErrorMessage("documentType") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passport">Passaporte</SelectItem>
                              <SelectItem value="id">Bilhete de Identidade</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("documentType") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("documentType")}</p>}
                    </div>

                    <div>
                      <label htmlFor="modality" className="block text-sm font-medium text-gray-700 mb-1">Modalidade</label>
                      <Controller
                        name="modality"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="modality" className={cn(getErrorMessage("modality") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="urgent">Urgente</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("modality") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("modality")}</p>}
                    </div>

                    <div>
                      <label htmlFor="fee" className="block text-sm font-medium text-gray-700 mb-1">Taxa</label>
                      <Controller
                        name="fee"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="fee" className={cn(getErrorMessage("fee") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Padrão</SelectItem>
                              <SelectItem value="express">Expresso</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("fee") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("fee")}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Information and Address */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-center text-gray-800 mb-6">Dados Pessoais e Endereço</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Info */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                      <Input id="fullName" {...form.register("fullName")} className={cn(getErrorMessage("fullName") && "border-red-500")} />
                      {getErrorMessage("fullName") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("fullName")}</p>}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apelido</label>
                      <Input id="lastName" {...form.register("lastName")} className={cn(getErrorMessage("lastName") && "border-red-500")} />
                      {getErrorMessage("lastName") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("lastName")}</p>}
                    </div>

                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                      <Controller
                        name="birthDate"
                        control={form.control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  getErrorMessage("birthDate") && "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(new Date(field.value), "PPP") : <span>Selecione uma data</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {getErrorMessage("birthDate") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("birthDate")}</p>}
                    </div>

                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">Nº de Bilhete de Identidade</label>
                      <Input id="idNumber" {...form.register("idNumber")} placeholder="123456789012A" className={cn(getErrorMessage("idNumber") && "border-red-500")} />
                      <p className="text-xs text-muted-foreground mt-1">12 dígitos e uma letra</p>
                      {getErrorMessage("idNumber") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("idNumber")}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vitalício</label>
                      <Controller
                        name="lifetimeId"
                        control={form.control}
                        render={({ field }) => (
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="lifetime-yes" />
                              <label htmlFor="lifetime-yes" className="font-normal text-gray-700">Sim</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="lifetime-no" />
                              <label htmlFor="lifetime-no" className="font-normal text-gray-700">Não</label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                      {getErrorMessage("lifetimeId") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("lifetimeId")}</p>}
                    </div>

                    <div>
                      <label htmlFor="idExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">Data de Validade do B.I</label>
                      <Controller
                        name="idExpiryDate"
                        control={form.control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  getErrorMessage("idExpiryDate") && "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(new Date(field.value), "PPP") : <span>Selecione uma data</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {getErrorMessage("idExpiryDate") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("idExpiryDate")}</p>}
                    </div>

                    <div>
                      <label htmlFor="idIssuePlace" className="block text-sm font-medium text-gray-700 mb-1">Local de Emissão</label>
                      <Input id="idIssuePlace" {...form.register("idIssuePlace")} className={cn(getErrorMessage("idIssuePlace") && "border-red-500")} />
                      {getErrorMessage("idIssuePlace") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("idIssuePlace")}</p>}
                    </div>

                    <div>
                      <label htmlFor="birthCountry" className="block text-sm font-medium text-gray-700 mb-1">País de Nascimento</label>
                      <Controller
                        name="birthCountry"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="birthCountry" className={cn(getErrorMessage("birthCountry") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mozambique">Moçambique</SelectItem>
                              <SelectItem value="portugal">Portugal</SelectItem>
                              <SelectItem value="south-africa">África do Sul</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("birthCountry") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("birthCountry")}</p>}
                    </div>

                    <div>
                      <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
                      <Input id="nationality" {...form.register("nationality")} readOnly className="bg-gray-100 cursor-not-allowed" />
                      {getErrorMessage("nationality") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("nationality")}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Província</label>
                      <Controller
                        name="province"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="province" className={cn(getErrorMessage("province") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maputo">Maputo</SelectItem>
                              <SelectItem value="gaza">Gaza</SelectItem>
                              <SelectItem value="inhambane">Inhambane</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("province") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("province")}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade/Distrito</label>
                      <Controller
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="city" className={cn(getErrorMessage("city") && "border-red-500")}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maputo-city">Cidade de Maputo</SelectItem>
                              <SelectItem value="matola">Matola</SelectItem>
                              <SelectItem value="xai-xai">Xai-Xai</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {getErrorMessage("city") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("city")}</p>}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                      <Textarea id="neighborhood" {...form.register("neighborhood")} className={cn(getErrorMessage("neighborhood") && "border-red-500")} />
                      <p className="text-xs text-muted-foreground mt-1">Opcional (máx. 140 caracteres)</p>
                      {getErrorMessage("neighborhood") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("neighborhood")}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Scheduling and Contact */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-center text-gray-800 mb-6">Agendamento e Contactos</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Scheduling */}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="travelReason" className="block text-sm font-medium text-gray-700 mb-1">Motivo da Viagem</label>
                        <Textarea id="travelReason" {...form.register("travelReason")} className={cn(getErrorMessage("travelReason") && "border-red-500")} />
                        {getErrorMessage("travelReason") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("travelReason")}</p>}
                      </div>

                      <div>
                        <label htmlFor="observation" className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
                        <Textarea id="observation" {...form.register("observation")} className={cn(getErrorMessage("observation") && "border-red-500")} />
                        {getErrorMessage("observation") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("observation")}</p>}
                      </div>

                      <div>
                        <label htmlFor="documentLocation" className="block text-sm font-medium text-gray-700 mb-1">Local para Tratar o Documento</label>
                        <Controller
                          name="documentLocation"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger id="documentLocation" className={cn(getErrorMessage("documentLocation") && "border-red-500")}>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="maputo">Maputo</SelectItem>
                                <SelectItem value="beira">Beira</SelectItem>
                                <SelectItem value="nampula">Nampula</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {getErrorMessage("documentLocation") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("documentLocation")}</p>}
                      </div>

                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">Data Pretendida</label>
                        <Controller
                          name="preferredDate"
                          control={form.control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                    getErrorMessage("preferredDate") && "border-red-500"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(new Date(field.value), "PPP") : <span>Selecione uma data</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                        {getErrorMessage("preferredDate") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("preferredDate")}</p>}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">Código do País</label>
                        <Controller
                          name="countryCode"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger id="countryCode" className={cn(getErrorMessage("countryCode") && "border-red-500")}>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="258">+258 (Moçambique)</SelectItem>
                                <SelectItem value="244">+244 (Angola)</SelectItem>
                                <SelectItem value="27">+27 (África do Sul)</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {getErrorMessage("countryCode") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("countryCode")}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telemóvel</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            {...form.register("phone")}
                            className={cn("pl-10", getErrorMessage("phone") && "border-red-500")}
                            placeholder="821234567"
                          />
                        </div>
                        {getErrorMessage("phone") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("phone")}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            {...form.register("email")}
                            className={cn("pl-10", getErrorMessage("email") && "border-red-500")}
                            placeholder="exemplo@gmail.com"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Opcional</p>
                        {getErrorMessage("email") && <p className="text-sm text-red-500 mt-1">{getErrorMessage("email")}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-center text-gray-800 mb-6">Verificação</h4>

                  <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <Controller
                        name="terms"
                        control={form.control}
                        render={({ field }) => (
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={cn(getErrorMessage("terms") && "border-red-500")}
                          />
                        )}
                      />
                      <label htmlFor="terms" className="text-sm font-medium text-gray-700">
                        Concordo com os termos e condições
                      </label>
                    </div>
                    {getErrorMessage("terms") && <p className="text-sm text-red-500">{getErrorMessage("terms")}</p>}
                  </div>
                </motion.div>
              )}

              <Separator className="my-8 bg-gray-200" />

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Voltar
                </Button>

                {currentStep < totalSteps - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Submetendo...
                      </>
                    ) : (
                      "Submeter"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <AdminFooter />
    </div>
  );
}