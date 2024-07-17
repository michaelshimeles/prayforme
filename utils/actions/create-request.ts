"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import OpenAI from "openai";
import { UAParser } from "ua-parser-js";

const openai = new OpenAI();

export const createRequest = async (
  requestId: string,
  request: string,
  numOfPrayers: string
) => {
  const moderation = await openai.moderations.create({
    input: request,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a AI Bible assistant, your job is to send an encouraging bible verse for the prayer request that is given to you. Don't add anything else, just the bible verse",
      },
      {
        role: "user",
        content: "The prayer request:" + request,
      },
    ],
    model: "gpt-4o",
  });

  console.log('completion', completion?.choices?.[0]?.message?.content)

  const cookieStore = cookies();
  const headersList = headers();

  // Get IP address
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "Unknown";

  // Get user agent information
  const userAgent = headersList.get("user-agent") || "Unknown";
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getResult();

  // Get approximate location based on IP (you might need a geo-IP service for more accurate results)
  const location = headersList.get("x-vercel-ip-country") || "Unknown";

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
  if (moderation?.results?.[0]?.flagged) {
    await supabase
      .from("ModeratedRequest")
      .insert([
        {
          message: request,
          requestId: requestId,
          ip_address: ip,
          device: JSON.stringify(deviceInfo),
          location: location,
        },
      ])
      .select();

    return {
      flagged: true,
      message: "Prayer request has been flagged as inapproriate",
    };
  }

  try {
    const { data, error } = await supabase
      .from("Request")
      .insert([
        {
          request: request,
          requestId: requestId,
          num_of_prayers: numOfPrayers,
          encouragement: completion?.choices?.[0]?.message?.content
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