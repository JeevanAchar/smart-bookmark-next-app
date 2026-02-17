import React from "react";
import LandingPage from "@/app/components/LandingPage";
import { createClient } from "@/lib/supabase/server";
import DashBoard from "@/app/components/DashBoard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <DashBoard />;
  }

  return <LandingPage />;
}
