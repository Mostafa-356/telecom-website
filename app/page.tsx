import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Plans } from "@/components/plans"
import { Devices } from "@/components/devices"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home | Telecom Website - Premium 5G Mobile Services',
  description: 'Experience ultra-fast 5G connectivity with unlimited data plans, crystal-clear calling, and world-class customer support. Sign up today and get exclusive offers.',
  openGraph: {
    url: 'https://yourdomain.com/',
    type: 'website',
    title: 'Telecom Website - Premium 5G Mobile Services',
    description: 'Experience ultra-fast 5G connectivity with unlimited data plans and exceptional service.',
    images: [
      {
        url: 'https://yourdomain.com/og-home.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Plans />
      <Devices />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
