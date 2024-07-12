"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const prayTab = async (
  requestId: string,
  numOfPrayers: string
) => {
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

  const prayer_number = Number(numOfPrayers) + 1;
  try {
    const { data, error } = await supabase
      .from("requests")
      .update([
        {
          num_of_prayers: String(prayer_number),
        },
      ])
      .eq("request_id", requestId)
      .select();

    if (error?.code) return error;

    revalidatePath("/");

    return data;
  } catch (error: any) {
    return error;
  }
};
