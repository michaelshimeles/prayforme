"use server";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";

const openai = new OpenAI();

export const createRequest = async (
  requestId: string,
  request: string,
  numOfPrayers: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          request,
          requestId,
          numOfPrayers,
        }),
      }
    );

    const result = await response.json();

    revalidatePath("/");

    return result;
  } catch (error: any) {
    return error;
  }
};
