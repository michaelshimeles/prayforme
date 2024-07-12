import HeroSection from "@/components/homepage/hero-section";
import PrayerCard from "@/components/prayer-card";
import NavBar from "@/components/wrapper/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F9F9F9]">
      <NavBar />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9] mt-16">
        <div className="container px-4 md:px-6 space-y-8">
          <HeroSection />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
            <PrayerCard />
          </div>
        </div>
      </section>
    </div>

  );
}
