import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";
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

type CategoryType = "8-9-students" | "10-12-students" | "college-graduates" | "working-professionals";

interface Feature {
  text: string;
  included: boolean;
}

interface PackageData {
  name: string;
  planName: string;
  price: string;
  features: Feature[];
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
  const [activeCategory, setActiveCategory] = useState<CategoryType>("8-9-students");

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

  const categoryInfo: Record<CategoryType, { title: string; subtitle: string }> = {
    "8-9-students": {
      title: "8-9 Students",
      subtitle: "Early career exploration & skill development"
    },
    "10-12-students": {
      title: "10-12 Students",
      subtitle: "College preparation & career planning"
    },
    "college-graduates": {
      title: "College Graduates",
      subtitle: "Career launch & professional development"
    },
    "working-professionals": {
      title: "Working Professionals",
      subtitle: "Career advancement & upskilling"
    }
  };

  const packagesByCategory: Record<CategoryType, PackageData[]> = {
    "8-9-students": [
      {
        name: "STANDARD",
        planName: "Discover",
        price: "₹5,500",
        features: [
          { text: "Psychometric assessment to measure your interests", included: true },
          { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV building during internship/graduation", included: false }
        ],
        action: () => handleBeginPayment(5500, "Discover - 8-9 Students"),
        buttonText: "BUY NOW",
        featured: false
      },
      {
        name: "PREMIUM",
        planName: "Discover plus+",
        price: "₹15,000",
        features: [
          { text: "Psychometric assessments to measure your interests, personality and abilities", included: true },
          { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV building during internship/graduation", included: true }
        ],
        action: () => handleBeginPayment(15000, "Discover plus+ - 8-9 Students"),
        buttonText: "BUY NOW",
        featured: true
      }
    ],
    "10-12-students": [
      {
        name: "STANDARD",
        planName: "Achieve Online",
        price: "₹5,999",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews during internship/graduation", included: false }
        ],
        action: () => handleBeginPayment(5999, "Achieve Online - 10-12 Students"),
        buttonText: "BUY NOW",
        featured: false
      },
      {
        name: "PREMIUM",
        planName: "Achieve Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "4 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews during internship/graduation", included: true }
        ],
        action: () => handleBeginPayment(10599, "Achieve Plus+ - 10-12 Students"),
        buttonText: "BUY NOW",
        featured: true
      }
    ],
    "college-graduates": [
      {
        name: "STANDARD",
        planName: "Ascend Online",
        price: "₹6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false }
        ],
        action: () => handleBeginPayment(6499, "Ascend Online - College Graduates"),
        buttonText: "BUY NOW",
        featured: false
      },
      {
        name: "PREMIUM",
        planName: "Ascend Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "3 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true }
        ],
        action: () => handleBeginPayment(10599, "Ascend Plus+ - College Graduates"),
        buttonText: "BUY NOW",
        featured: true
      }
    ],
    "working-professionals": [
      {
        name: "STANDARD",
        planName: "Ascend Online",
        price: "₹6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false }
        ],
        action: () => handleBeginPayment(6499, "Ascend Online - Working Professionals"),
        buttonText: "BUY NOW",
        featured: false
      },
      {
        name: "PREMIUM",
        planName: "Ascend Plus+",
        price: "₹10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "2 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true }
        ],
        action: () => handleBeginPayment(10599, "Ascend Plus+ - Working Professionals"),
        buttonText: "BUY NOW",
        featured: true
      }
    ]
  };

  const renderPackages = (category: CategoryType) => {
    const packages = packagesByCategory[category];

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
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  {pkg.name}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {pkg.planName}
                </h3>
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  {pkg.price}
                </p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {pkg.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + (index * 0.1) + (featureIndex * 0.05) }}
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-vibrant-teal flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm sm:text-base ${feature.included ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                      {feature.text}
                    </span>
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
          defaultValue="8-9-students" 
          className="w-full"
          onValueChange={(value) => setActiveCategory(value as CategoryType)}
        >
          <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 sm:grid-cols-4 mb-8 sm:mb-12 h-auto gap-2 sm:gap-0 bg-transparent p-0 sm:p-1 sm:bg-muted">
            <TabsTrigger 
              value="8-9-students" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-8-9-students"
            >
              <span className="font-bold text-base">{categoryInfo["8-9-students"].title}</span>
              <span className="text-xs text-muted-foreground text-center hidden sm:block">{categoryInfo["8-9-students"].subtitle}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="10-12-students" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-10-12-students"
            >
              <span className="font-bold text-base">{categoryInfo["10-12-students"].title}</span>
              <span className="text-xs text-muted-foreground text-center hidden sm:block">{categoryInfo["10-12-students"].subtitle}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="college-graduates" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-college-graduates"
            >
              <span className="font-bold text-base">{categoryInfo["college-graduates"].title}</span>
              <span className="text-xs text-muted-foreground text-center hidden sm:block">{categoryInfo["college-graduates"].subtitle}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="working-professionals" 
              className="flex flex-col items-center gap-1 py-4 px-4 data-[state=active]:bg-card data-[state=active]:shadow-md"
              data-testid="tab-working-professionals"
            >
              <span className="font-bold text-base">{categoryInfo["working-professionals"].title}</span>
              <span className="text-xs text-muted-foreground text-center hidden sm:block">{categoryInfo["working-professionals"].subtitle}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="8-9-students" className="mt-0">
            {renderPackages("8-9-students")}
          </TabsContent>

          <TabsContent value="10-12-students" className="mt-0">
            {renderPackages("10-12-students")}
          </TabsContent>

          <TabsContent value="college-graduates" className="mt-0">
            {renderPackages("college-graduates")}
          </TabsContent>

          <TabsContent value="working-professionals" className="mt-0">
            {renderPackages("working-professionals")}
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
