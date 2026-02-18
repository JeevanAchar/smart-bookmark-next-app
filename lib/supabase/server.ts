import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function createSupabaseServerClient(canSetCookies: boolean) {
  return async () => {
    const cookieStore = await cookies();

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            if (!canSetCookies) {
              return;
            }

            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );
  };
}

export const createServerComponentClient = createSupabaseServerClient(false);
export const createRouteHandlerClient = createSupabaseServerClient(true);
