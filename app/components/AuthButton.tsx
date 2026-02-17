"use client";

import { JSX, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/app/context/UserContext";

export default function AuthButton(): JSX.Element {
  const supabase = createClient();
  const { user, setUser } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signIn = async () => {
    setIsSigningIn(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: location.origin + "/auth/callback",
        },
      });
    } catch (error) {
      globalThis.alert("Error signing in");
      console.error(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    globalThis.location.reload();
  };

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="inline-flex items-center justify-center gap-2 rounded-xl border cursor-pointer
         border-[rgba(18,18,26,0.2)] bg-white px-[1.1rem] py-[0.6rem] text-[0.95rem]
          font-semibold transition-[transform,opacity] duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSigningIn}
      >
        <span className="bg-[linear-gradient(to_right,#f32170,#ff6b08,#cf23cf,#eedd44)] bg-size-[200%_100%] bg-clip-text text-transparent">
          Sign in with Google
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg">Welcome, {user.user_metadata.full_name}</p>
      <button
        onClick={logout}
        className="text-red-500 underline font-sans italic cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
