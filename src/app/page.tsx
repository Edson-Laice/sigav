"use client";
import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/AdminLayout";


export default function AdminHome() {

  const [mounted, setMounted] = useState(false);
 

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return <AdminLayout />;
}