import Hero from '@/sections/Hero';
import Modules from '@/sections/Modules';
import AIStudy from '@/sections/AIStudy';
import Community from '@/sections/Community';
import Organization from '@/sections/Organization';
import ProfileSection from '@/sections/ProfileSection';
import HowItWorks from '@/sections/HowItWorks';
import Stats from '@/sections/Stats';
import FAQ from '@/sections/FAQ';
import FinalCTA from '@/sections/FinalCTA';

export default function Page() {
  return (
    <>
      <Hero />
      <Modules />
      <AIStudy />
      <Community />
      <Organization />
      <ProfileSection />
      <HowItWorks />
      <Stats />
      <FAQ />
      <FinalCTA />
    </>
  );
}
