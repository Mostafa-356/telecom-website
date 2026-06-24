import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Wifi, Building, Headphones } from "lucide-react"
import { memo } from "react"

export const Services = memo(function Services() {
  const services = [
    {
      icon: Smartphone,
      title: "Mobile Plans",
      description: "Unlimited data, calls, and texts with 5G speeds",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Wifi,
      title: "Home Broadband",
      description: "Ultra-fast fiber internet for your home",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Building,
      title: "Business Solutions",
      description: "Enterprise-grade connectivity and support",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service and technical help",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Stay Connected</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From mobile plans to business solutions, we've got you covered with cutting-edge technology
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
