import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"

export const Hero = memo(function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">5G Network Now Available</span>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              {/* Optimized H1 - No gradient clip, simpler rendering */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                <span className="text-purple-600">Connect</span> to the{" "}
                <span className="text-blue-600">Future</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience lightning-fast 5G speeds, unlimited data, and crystal-clear calls. Join millions who trust
                our premium telecom services for their connectivity needs.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg w-full sm:w-auto"
                >
                  View Plans
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 bg-transparent w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Network Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
          
          {/* Image - Optimized for LCP */}
          <div className="relative">
            {/* Removed heavy blur effects */}
            <Image
              src="/5g-smartphone.png"
              alt="5G Network Visualization"
              width={500}
              height={600}
              priority={true}
              loading="eager"
              className="relative z-10 rounded-2xl shadow-2xl w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  )
})
