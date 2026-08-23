import Hero from "./_components/home/Hero";
import FeaturedProperties from "./_components/home/FeaturedProperties";
import WhyRentNest from "./_components/home/WhyRentNest";
import FAQ from "./_components/home/FAQ";
import CTA from "./_components/home/CTA";
import { Suspense } from "react";
import FeaturedPropertiesSkeleton from "./_components/home/FeaturedPropertiesSkeleton";

export default function HomePage() {
  return (
    <main>
      <Hero />

      
      <Suspense fallback={<FeaturedPropertiesSkeleton/>}><FeaturedProperties /></Suspense>

      <WhyRentNest />

      <FAQ />

      <CTA />
    </main>
  );
}
