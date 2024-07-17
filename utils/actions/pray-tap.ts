"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const prayTab = async (requestId: string, numOfPrayers: string) => {

  const prayer_number = Number(numOfPrayers) + 1;

  try {
    const updateNumOfPrayers = await prisma.request.update({
      where: {
        requestId: requestId,
      },
      data: {
        numOfPrayers: String(prayer_number),
      },
    });

    revalidatePath("/");

    return updateNumOfPrayers;
  } catch (error: any) {
    return error;
  }
};
