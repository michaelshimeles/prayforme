import HeroSection from "@/components/homepage/hero-section";
import PrayerCard from "@/components/prayer-card";
import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";
import { Prayer } from "@/utils/types";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getPrayerRequest = async () => {
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
      .select();

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};



export default async function Home() {

  const response = await getPrayerRequest()

  console.log("prayer", response)
  return (
    <div className="flex flex-col min-h-dvh bg-[#F9F9F9]">
      <NavBar />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9] mt-16">
        <div className="container px-4 md:px-6 space-y-8">
          <HeroSection />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response?.map((prayer: Prayer) => (
              <PrayerCard prayer={prayer} key={prayer.id} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>

  );
}
