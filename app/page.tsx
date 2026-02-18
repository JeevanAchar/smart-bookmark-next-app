import React from "react";
import LandingPage from "@/app/components/LandingPage";
import { createServerComponentClient } from "@/lib/supabase/server";
import DashBoard from "@/app/components/DashBoard";

export default async function Home() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <DashBoard />;
  }

  return <LandingPage />;
}
