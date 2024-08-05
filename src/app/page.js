import Image from "next/image";
import HeroSection from '@/components/HeroSection'
import Testimonials from '@/components/Testimonials'
import LatestPosts from '@/components/LatestPosts'
export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div>
        <LatestPosts />
      </div>
      <div>
        <Testimonials />
      </div>

    </>
  );
}
