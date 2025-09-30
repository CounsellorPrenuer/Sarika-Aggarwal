import { Button } from "@/components/ui/button";
import { GraduationCap, Users, School } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-vibrant-blue/10 via-vibrant-teal/10 to-background z-0" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-vibrant-orange/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-vibrant-yellow/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-vibrant-teal/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Building Bridges to Your{" "}
          <span className="bg-gradient-to-r from-vibrant-blue to-vibrant-teal bg-clip-text text-transparent">
            Dream Career
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
          Your Path from Aspirations to Achievements
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Expert Career Guidance, Admission Support, and Skill-building Workshops for Students and Professionals
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={() => scrollToSection("services")}
            className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow hover:shadow-xl transition-all text-lg px-8"
            data-testid="button-explore-services"
          >
            Explore Our Services
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="text-lg px-8 border-2 hover:border-vibrant-orange hover:text-vibrant-orange transition-all backdrop-blur-sm"
            data-testid="button-book-consultation"
          >
            Book a Free Consultation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-card-border hover-elevate transition-all" data-testid="stat-experience">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-vibrant-blue to-vibrant-teal rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">10+ Years</h3>
            <p className="text-muted-foreground">of Experience</p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-card-border hover-elevate transition-all" data-testid="stat-students">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-vibrant-orange to-vibrant-yellow rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">1000+</h3>
            <p className="text-muted-foreground">Students Guided</p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-card-border hover-elevate transition-all" data-testid="stat-partners">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-vibrant-teal to-vibrant-blue rounded-xl">
                <School className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">50+</h3>
            <p className="text-muted-foreground">Partner Schools</p>
          </div>
        </div>
      </div>
    </section>
  );
}
