import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import PricingTabs from "@/components/PricingTabs";
import CustomPlans from "@/components/CustomPlans";
import BookingModal from "@/components/BookingModal";
import { useCms } from "@/hooks/useCms";

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const { data } = useCms();

  const standardPlans = data?.standardPlans ?? [];
  const customPlans = data?.customPlans ?? [];

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-card/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Mentoria Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your <span className="text-primary">Path to Success</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Tailored programs for every stage of your career journey
          </p>
        </motion.div>

        <PricingTabs
          plans={standardPlans}
          onBuyClick={(plan, category) =>
            setSelectedPlan({ planId: plan.planId, title: plan.title, category, price: plan.price })
          }
        />

        <CustomPlans
          plans={customPlans}
          onBuyClick={(plan) =>
            setSelectedPlan({ planId: plan.planId, title: plan.title, category: "Custom Mentorship", price: plan.price })
          }
        />

      </div>

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </section>
  );
}
