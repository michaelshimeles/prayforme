"use server"
import { prisma } from "@/lib/prisma";

export const getPrayerRequest = async () => {
  try {
    const prayerRequests = await prisma.request.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    console.log('prayerRequests', prayerRequests)
    return prayerRequests;
  } catch (error: any) {
    return error;
  }
};