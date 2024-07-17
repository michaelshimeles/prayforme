"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import { getInfo } from "../functions/info";
import { FlaggedRequest, PrayerResponse } from "../types";

const openai = new OpenAI();

export const createRequest = async (
  requestId: string,
  request: string,
  numOfPrayers: string
): Promise<PrayerResponse | FlaggedRequest> => {
  const moderation = await openai.moderations.create({
    input: request,
  });

  const { ipAddress, device, location } = getInfo();

  if (moderation?.results?.[0]?.flagged) {
    await prisma.moderatedRequest.create({
      data: {
        message: request,
        requestId: requestId,
        ipAddress,
        device,
        location,
      },
    });

    return {
      flagged: true,
      message: "Prayer request has been flagged as inappropriate",
    } as FlaggedRequest;
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI Bible assistant. Your job is to send an encouraging Bible verse for the prayer request that is given to you. Don't add anything else, just the Bible verse",
      },
      {
        role: "user",
        content: "The prayer request: " + request,
      },
    ],
    model: "gpt-4",
  });

  console.log("completion", completion?.choices?.[0]?.message?.content);

  try {
    const data = await prisma.request.create({
      data: {
        requestId: requestId,
        content: request,
        numOfPrayers: numOfPrayers,
        encouragement: completion?.choices?.[0]?.message?.content || "",
      },
    });

    revalidatePath("/");

    return data as PrayerResponse;
  } catch (error: any) {
    console.error(error);
    return { error: error.message } as any;
  }
};
