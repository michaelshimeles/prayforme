"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import OpenAI from "openai";

const openai = new OpenAI();

export const createRequest = async (
  requestId: string,
  request: string,
  numOfPrayers: string
) => {
  const moderation = await openai.moderations.create({
    input: request,
  });

  console.log("moderation", moderation);

  if (moderation?.results?.[0]?.flagged) {
    return {
      flagged: true,
      message: "Prayer request has been flagged as inapproriate",
    };
  }

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
      .insert([
        {
          request: request,
          request_id: requestId,
          num_of_prayers: numOfPrayers,
        },
      ])
      .select();

    if (error?.code) return error;

    revalidatePath("/");

    return data;
  } catch (error: any) {
    return error;
  }
};
