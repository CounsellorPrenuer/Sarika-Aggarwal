import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/lib/sanity";
import { CMS_FALLBACK } from "@/lib/cmsFallback";

type TestimonialsProps = {
  cmsTestimonials?: Testimonial[];
};

export default function Testimonials({ cmsTestimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = useMemo(
    () => (cmsTestimonials?.length ? cmsTestimonials : CMS_FALLBACK.testimonials).map((t) => ({
      quote: t.quote,
      name: t.name,
      role: t.role,
      rating: t.rating,
    })),
    [cmsTestimonials],
  );

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (!testimonials.length) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-vibrant-teal/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Real stories from individuals who transformed their careers with DreamBridge
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="p-6 sm:p-8 md:p-12 border-card-border shadow-xl" data-testid={`card-testimonial-${currentIndex}`}>
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-vibrant-yellow text-vibrant-yellow" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-lg sm:text-xl italic text-foreground mb-6 sm:mb-8 text-center leading-relaxed px-4">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                <div className="text-center">
                  <p className="font-bold text-foreground text-base sm:text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              data-testid="button-testimonial-prev"
              className="hover-elevate"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-vibrant-orange w-8" : "bg-muted w-2"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              data-testid="button-testimonial-next"
              className="hover-elevate"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
