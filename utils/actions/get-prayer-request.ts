"use server"
import { prisma } from "@/lib/prisma";

export const getPrayerRequest = async () => {
  try {
    const prayerRequests = await prisma.request.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return prayerRequests;
  } catch (error: any) {
    return error;
  }
};