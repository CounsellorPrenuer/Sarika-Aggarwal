import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  //todo: remove mock functionality
  const testimonials = [
    {
      quote: "Sarika's guidance was instrumental in helping me choose the right career path. Her personalized approach and deep understanding of my strengths made all the difference.",
      name: "Priya Sharma",
      role: "Engineering Student",
      rating: 5,
    },
    {
      quote: "The workshop conducted by DreamBridge for our college was incredibly insightful. Our students gained valuable skills and clarity about their future careers.",
      name: "Dr. Rajesh Kumar",
      role: "College Principal",
      rating: 5,
    },
    {
      quote: "As a working professional looking to transition careers, Sarika's coaching gave me the confidence and roadmap I needed to make the leap successfully.",
      name: "Amit Patel",
      role: "Marketing Professional",
      rating: 5,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from individuals who transformed their careers with DreamBridge
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 border-card-border shadow-xl" data-testid={`card-testimonial-${currentIndex}`}>
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-vibrant-yellow text-vibrant-yellow" />
              ))}
            </div>
            <p className="text-xl italic text-foreground mb-8 text-center leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="text-center">
              <p className="font-bold text-foreground text-lg">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-muted-foreground">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </Card>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-vibrant-orange w-8" : "bg-muted"
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
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
