import Hero from "./_components/Hero"
import FeaturedProperties from "./_components/FeaturedProperties"
import WhyRentNest from "./_components/WhyRentNest"
import FAQ from "./_components/FAQ"
import CTA from "./_components/CTA"

export default function HomePage() {
  return (
    <main>
      <Hero />

      <FeaturedProperties />

      <WhyRentNest />

      <FAQ />

      <CTA />
    </main>
  )
}