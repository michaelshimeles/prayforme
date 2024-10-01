"use server";
import { revalidatePath } from "next/cache";

export const prayTab = async (requestId: string, numOfPrayers: string) => {
  const prayer_number = Number(numOfPrayers) + 1;
  console.log("prayer_number", prayer_number);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pray-tap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        requestId,
        numOfPrayers: prayer_number,
      }),
    });

    revalidatePath("/");

    return;
  } catch (error: any) {
    return error;
  }
};
