import FacebookShare from "@/components/facebook-share";
import HeroSection from "@/components/homepage/hero-section";
import PinterestShare from "@/components/pinterest-share";
import PrayerCard from "@/components/prayer-card";
import TelegramShare from "@/components/telegram-share";
import TwitterShare from "@/components/twitter-share";
import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";
import { Prayer } from "@/utils/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const getPrayerRequest = async () => {
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
      .select()
      .order('id', { ascending: false })

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};



export default async function Home() {

  const response = await getPrayerRequest()

  return (
    <div className="flex flex-col min-h-dvh bg-[#F9F9F9]">
      <div className="px-[1rem] fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-[500px] w-full">
        <NavBar />
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9] mt-16 md:mt-4">
        <div className="container px-4 md:px-6 space-y-8">
          <HeroSection />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response?.map((prayer: Prayer) => (
              <PrayerCard prayer={prayer} key={prayer.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Footer />
          <div className="flex flex-wrap justify-center items-center gap-3">
            <TwitterShare />
            <FacebookShare />
            <TelegramShare />
            <PinterestShare />
          </div>
        </div>
      </section>
    </div>

  );
}
