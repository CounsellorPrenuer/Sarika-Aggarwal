import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PaymentDetailsModal } from "./PaymentDetailsModal";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentModalData {
  amount: number;
  packageName: string;
}

export default function Packages() {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<PaymentModalData | null>(null);

  const handleBeginPayment = (amount: number, packageName: string) => {
    setCurrentPackage({ amount, packageName });
    setIsModalOpen(true);
  };

  const handlePaymentDetailsSubmit = async (details: {
    name: string;
    email: string;
    phone?: string;
  }) => {
    if (!currentPackage) return;

    try {
      const intentResponse = await fetch("/api/payment/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: currentPackage.amount,
          packageName: currentPackage.packageName,
          name: details.name,
          email: details.email,
          phone: details.phone,
        }),
      });

      const intentResult = await intentResponse.json();

      if (!intentResult.success) {
        throw new Error("Failed to create payment intent");
      }

      const paymentId = intentResult.payment.id;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: currentPackage.amount * 100,
        currency: "INR",
        name: "DreamBridge",
        description: currentPackage.packageName,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const result = await verifyResponse.json();

            if (result.success) {
              toast({
                title: "Payment Successful!",
                description: `Thank you for choosing ${currentPackage.packageName}. We'll be in touch shortly.`,
              });
            } else {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support.",
                variant: "destructive",
              });
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to verify payment. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: details.name,
          email: details.email,
          contact: details.phone || "",
        },
        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
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
      action: () => handleBeginPayment(9999, "Student Guidance Package"),
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
      action: () => handleBeginPayment(12999, "Professional Roadmap"),
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
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-vibrant-yellow/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Select the package that best fits your career goals and aspirations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`p-6 sm:p-8 flex flex-col h-full transition-all duration-300 ${
                  pkg.featured
                    ? "border-2 border-vibrant-orange shadow-2xl md:scale-105 bg-gradient-to-br from-card to-vibrant-orange/5 relative"
                    : "border-card-border hover:shadow-xl hover:scale-105"
                }`}
                data-testid={`card-package-${index}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center mt-2">
                  {pkg.name}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
                  {pkg.price}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 text-center">
                  {pkg.description}
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + (index * 0.1) + (featureIndex * 0.05) }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-vibrant-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                    </motion.li>
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
            </motion.div>
          ))}
        </div>
      </div>
      <PaymentDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePaymentDetailsSubmit}
        packageName={currentPackage?.packageName || ""}
        amount={currentPackage?.amount || 0}
      />
    </section>
  );
}
