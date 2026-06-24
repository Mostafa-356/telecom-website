import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { memo } from "react"

export const Plans = memo(function Plans() {
  const plans = [
    {
      name: "Essential",
      price: "25",
      description: "Perfect for light users",
      features: ["10GB Data", "Unlimited Calls & Texts", "4G Network Access", "Basic Support"],
      popular: false,
    },
    {
      name: "Premium",
      price: "45",
      description: "Most popular choice",
      features: [
        "Unlimited Data",
        "Unlimited Calls & Texts",
        "5G Network Access",
        "Premium Support",
        "International Roaming",
        "Mobile Hotspot",
      ],
      popular: true,
    },
    {
      name: "Ultimate",
      price: "65",
      description: "For power users",
      features: [
        "Unlimited Everything",
        "Priority 5G Network",
        "24/7 Premium Support",
        "Global Roaming",
        "Unlimited Hotspot",
        "Device Insurance",
        "Entertainment Bundle",
      ],
      popular: false,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible plans designed to fit your lifestyle and budget
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "ring-2 ring-purple-500 shadow-2xl scale-105" : "shadow-lg"} transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
