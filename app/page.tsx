import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Features } from "@/components/site/features"
import { Showcase } from "@/components/site/showcase"
import { PricingCalculator } from "@/components/site/pricing-calculator"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <PricingCalculator />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
