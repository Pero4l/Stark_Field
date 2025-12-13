import { 
  CheckCircle
} from 'lucide-react';

const PricingPage = () => {

    const plans = [
    {
      name: "Community",
      price: "Free",
      description: "Perfect for small-scale farmers getting started",
      features: [
        "Basic community access",
        "Weather updates",
        "5 marketplace listings/month",
        "Standard support",
        "Mobile app access"
      ],
      color: "border-gray-300",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      name: "Professional",
      price: "$29/month",
      description: "Ideal for growing farms and cooperatives", 
      features: [
        "Everything in Community",
        "Advanced analytics dashboard",
        "Unlimited marketplace listings",
        "Priority weather alerts",
        "Direct messaging",
        "API access",
        "Priority support"
      ],
      color: "border-green-500 ring-2 ring-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99/month",
      description: "For large commercial operations",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced market insights",
        "White-label options",
        "24/7 phone support",
        "Custom training sessions"
      ],
      color: "border-purple-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <div>
        {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Growth Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as your farm grows. Every plan includes our core community features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-20 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl shadow-xl border-2 ${plan.color} p-8 hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'transform scale-105' : 'hover:scale-105'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-gray-900">{plan.price.split('/')[0]}</span>
                    {plan.price.includes('/') && <span className="text-gray-600">/{plan.price.split('/')[1]}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full ${plan.buttonColor} text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  {plan.name === 'Community' ? 'Start Free' : 'Start Trial'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage