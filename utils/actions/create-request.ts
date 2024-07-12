"use server"
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createRequest = async (requestId: string, request: string) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  try {
    const { data, error } = await supabase
      .from("requests")
      .insert([{ request: request, request_id: requestId }])
      .select();

    if (error?.code) return error;

    revalidatePath("/")

    return data;
  } catch (error: any) {
    return error;
  }
};
