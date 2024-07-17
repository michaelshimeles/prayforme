import HeroSection from "@/components/homepage/hero-section";
import PrayerCard from "@/components/prayer-card";
import FacebookShare from "@/components/share/facebook-share";
import PinterestShare from "@/components/share/pinterest-share";
import TelegramShare from "@/components/share/telegram-share";
import TwitterShare from "@/components/share/twitter-share";
import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";
import { prisma } from "@/lib/prisma";
import { getPrayerRequest } from "@/utils/actions/get-prayer-request";
import { Prayer } from "@/utils/types";


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
            {response?.length > 0 && response?.map((prayer: Prayer) => (
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
