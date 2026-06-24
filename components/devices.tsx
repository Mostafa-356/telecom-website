import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { memo } from "react"

export const Devices = memo(function Devices() {
  const devices = [
    {
      name: "iPhone 15 Pro",
      price: "From $999",
      image: "/iphone-15-pro-titanium.png",
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
    },
    {
      name: "Samsung Galaxy S24",
      price: "From $799",
      image: "/samsung-galaxy-s24-black.png",
      features: ["AI Photography", "120Hz Display", "All-day Battery"],
    },
    {
      name: "Google Pixel 8",
      price: "From $699",
      image: "/placeholder-zzx7q.png",
      features: ["Magic Eraser", "Pure Android", "Titan M Security"],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Devices</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the newest smartphones with exclusive deals and flexible payment options
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={device.image || "/placeholder.svg"}
                    alt={device.name}
                    width={250}
                    height={300}
                    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{device.name}</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-4">{device.price}</p>
                  <ul className="space-y-2 mb-6">
                    {device.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Buy Now
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
