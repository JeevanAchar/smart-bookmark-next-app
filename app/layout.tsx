import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { createServerComponentClient } from "@/lib/supabase/server";
import { UserProvider } from "@/app/context/UserContext";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Bookmark",
  description: "Smart Bookmark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      style={{
        background:
          "radial-gradient(circle at top left, #fff5e6 0%, transparent 40%), radial-gradient(circle at 20% 20%, rgba(74,149,206,0.22) 0%, transparent 55%), radial-gradient(circle at 90% 10%, rgba(242,201,76,0.22) 0%, transparent 35%), #f7f4ee",
      }}
    >
      <body
        className={`${lato.className} antialiased`}
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
      >
        <UserProvider initialUser={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
