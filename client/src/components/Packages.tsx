import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Packages() {
  const { toast } = useToast();

  const handlePayment = (amount: number, packageName: string) => {
    //todo: remove mock functionality - Replace with actual Razorpay credentials
    const options = {
      key: "rzp_test_XXXXXXXXXXXXXXXX", 
      amount: amount * 100,
      currency: "INR",
      name: "DreamBridge",
      description: packageName,
      handler: function (response: any) {
        toast({
          title: "Payment Successful!",
          description: `Thank you for choosing ${packageName}. We'll be in touch shortly.`,
        });
        console.log("Payment successful:", response);
      },
      prefill: {
        name: "",
        email: "agrawalsarika20@gmail.com",
        contact: "+919910043394",
      },
      theme: {
        color: "#f97316",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleQuoteRequest = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
    toast({
      title: "Let's discuss your workshop needs",
      description: "Please fill out the contact form below and we'll get back to you shortly.",
    });
  };

  const packages = [
    {
      name: "Student Guidance Package",
      price: "₹9,999",
      description: "Comprehensive career and admission guidance",
      features: [
        "Personalized career counseling",
        "Admission strategy planning",
        "Resume and SOP review",
        "Mock interview preparation",
        "University selection guidance",
      ],
      action: () => handlePayment(9999, "Student Guidance Package"),
      buttonText: "Begin Now",
      featured: false,
    },
    {
      name: "Professional Roadmap",
      price: "₹12,999",
      description: "Career assessment and coaching for working professionals",
      features: [
        "In-depth career assessment",
        "Skill gap analysis",
        "Career transition planning",
        "Personal branding strategy",
        "LinkedIn profile optimization",
        "Ongoing mentorship (3 months)",
      ],
      action: () => handlePayment(12999, "Professional Roadmap"),
      buttonText: "Begin Now",
      featured: true,
    },
    {
      name: "Institutional Workshop",
      price: "Custom Quote",
      description: "Custom workshop for schools or colleges",
      features: [
        "Customized curriculum",
        "Interactive group sessions",
        "Expert facilitators",
        "Resource materials included",
        "Post-workshop support",
      ],
      action: handleQuoteRequest,
      buttonText: "Request a Quote",
      featured: false,
    },
  ];

  return (
    <section id="packages" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the package that best fits your career goals and aspirations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 flex flex-col h-full transition-all duration-300 ${
                pkg.featured
                  ? "border-2 border-vibrant-orange shadow-2xl scale-105 bg-gradient-to-br from-card to-vibrant-orange/5"
                  : "border-card-border hover:shadow-xl hover:scale-105"
              }`}
              data-testid={`card-package-${index}`}
            >
              {pkg.featured && (
                <div className="text-center mb-4">
                  <span className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
                {pkg.name}
              </h3>
              <p className="text-3xl font-bold text-primary mb-2 text-center">
                {pkg.price}
              </p>
              <p className="text-muted-foreground mb-6 text-center">
                {pkg.description}
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-vibrant-teal flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={pkg.action}
                className={`w-full ${
                  pkg.featured
                    ? "bg-gradient-to-r from-vibrant-orange to-vibrant-yellow hover:shadow-xl"
                    : ""
                }`}
                variant={pkg.featured ? "default" : "outline"}
                data-testid={`button-package-${index}`}
              >
                {pkg.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
