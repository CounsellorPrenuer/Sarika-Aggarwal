import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type CategoryType = "freshers" | "middle-management" | "senior-professionals";

interface PackageData {
  name: string;
  price: string;
  for: string;
  features: string[];
  action?: () => void;
  buttonText: string;
  featured?: boolean;
}

export default function Packages() {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<PaymentModalData | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("freshers");

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

  const handleNotifyMe = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
    toast({
      title: "Get Notified",
      description: "Please fill out the contact form below and we'll notify you when packages are available.",
    });
  };

  const categoryInfo: Record<CategoryType, { title: string; subtitle: string; heading: string; subheading: string }> = {
    "freshers": {
      title: "Freshers",
      subtitle: "Strategic career foundation & professional readiness",
      heading: "Packages for Freshers",
      subheading: "Strategic career foundation & professional readiness"
    },
    "middle-management": {
      title: "Middle Management",
      subtitle: "Leadership development & strategic advancement",
      heading: "Packages for Middle Management",
      subheading: "Leadership development & strategic advancement"
    },
    "senior-professionals": {
      title: "Senior Professionals",
      subtitle: "Executive transformation & C-suite positioning",
      heading: "Packages for Senior Professionals",
      subheading: "Executive transformation & C-suite positioning"
    }
  };

  const packagesByCategory: Record<CategoryType, PackageData[]> = {
    "freshers": [
      {
        name: "Ascend",
        price: "₹6,499",
        for: "For College Graduates",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "1 career coaching session for specialisation/job selection",
          "Lifetime access to Knowledge Gateway",
          "Pre-recorded webinars by industry experts"
        ],
        action: () => handleBeginPayment(6499, "Ascend - Freshers"),
        buttonText: "Choose Ascend",
        featured: false
      },
      {
        name: "Ascend Plus",
        price: "₹10,599",
        for: "For College Graduates",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "3 career coaching sessions",
          "Lifetime access to Knowledge Gateway",
          "Guidance on Masters' admissions in India and abroad",
          "CV reviews during internships/graduation",
          "Guidance until you get into the job you love",
          "Career helpline access"
        ],
        action: () => handleBeginPayment(10599, "Ascend Plus - Freshers"),
        buttonText: "Choose Ascend Plus",
        featured: true
      }
    ],
    "middle-management": [
      {
        name: "Ascend",
        price: "₹6,499",
        for: "For Working Professionals",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "1 career coaching session focused on career transition, growth and upskilling",
          "Lifetime access to Knowledge Gateway",
          "Pre-recorded webinars by industry experts"
        ],
        action: () => handleBeginPayment(6499, "Ascend - Middle Management"),
        buttonText: "Choose Ascend",
        featured: false
      },
      {
        name: "Ascend Plus",
        price: "₹10,599",
        for: "For Working Professionals",
        features: [
          "Psychometric assessment to measure your interests, personality and abilities",
          "3 career coaching sessions",
          "Lifetime access to Knowledge Gateway",
          "CV reviews and Interview Prep",
          "Guidance until you get into the job you love",
          "Career helpline access"
        ],
        action: () => handleBeginPayment(10599, "Ascend Plus - Middle Management"),
        buttonText: "Choose Ascend Plus",
        featured: true
      }
    ],
    "senior-professionals": []
  };

  const renderPackages = (category: CategoryType) => {
    const packages = packagesByCategory[category];

    if (packages.length === 0) {
      return (
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Packages Coming Soon
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              We're preparing specialized packages for senior professionals.
            </p>
            <Button 
              onClick={handleNotifyMe}
              variant="outline"
              size="lg"
              data-testid="button-notify-senior"
            >
              Get Notified When Available
            </Button>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
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
              data-testid={`card-package-${category}-${index}`}
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
                {pkg.for}
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
                data-testid={`button-package-${category}-${index}`}
              >
                {pkg.buttonText}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-vibrant-yellow/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Select the category that best fits your career stage
          </p>
        </motion.div>

        <Tabs 
          defaultValue="freshers" 
          className="w-full"
          onValueChange={(value) => setActiveCategory(value as CategoryType)}
        >
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-1 sm:grid-cols-3 mb-8 sm:mb-12 h-auto gap-2 sm:gap-0 bg-transparent p-0 sm:p-1 sm:bg-muted">
            <TabsTrigger 
              value="freshers" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-freshers"
            >
              <span className="font-bold text-base">{categoryInfo.freshers.title}</span>
              <span className="text-xs text-muted-foreground text-center">{categoryInfo.freshers.subtitle}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="middle-management" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-middle-management"
            >
              <span className="font-bold text-base">{categoryInfo["middle-management"].title}</span>
              <span className="text-xs text-muted-foreground text-center">{categoryInfo["middle-management"].subtitle}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="senior-professionals" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-senior-professionals"
            >
              <span className="font-bold text-base">{categoryInfo["senior-professionals"].title}</span>
              <span className="text-xs text-muted-foreground text-center">{categoryInfo["senior-professionals"].subtitle}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="freshers" className="mt-0">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {categoryInfo.freshers.heading}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {categoryInfo.freshers.subheading}
              </p>
            </div>
            {renderPackages("freshers")}
          </TabsContent>

          <TabsContent value="middle-management" className="mt-0">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {categoryInfo["middle-management"].heading}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {categoryInfo["middle-management"].subheading}
              </p>
            </div>
            {renderPackages("middle-management")}
          </TabsContent>

          <TabsContent value="senior-professionals" className="mt-0">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {categoryInfo["senior-professionals"].heading}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {categoryInfo["senior-professionals"].subheading}
              </p>
            </div>
            {renderPackages("senior-professionals")}
          </TabsContent>
        </Tabs>
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
