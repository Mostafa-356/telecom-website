import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Globe, Award } from "lucide-react"
import { memo } from "react"

export const Features = memo(function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast 5G",
      description: "Experience download speeds up to 10Gbps with our advanced 5G network coverage across the country.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Your data is protected with military-grade encryption and advanced threat detection systems.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Stay connected in over 200 countries with our extensive international roaming partnerships.",
    },
    {
      icon: Award,
      title: "Award Winning Service",
      description: "Recognized as the #1 network provider for customer satisfaction three years running.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Telecom Services?</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            We're not just another network provider. We're your partner in staying connected to what matters most.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-purple-100 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
