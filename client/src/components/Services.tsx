import { Card } from "@/components/ui/card";
import { Compass, Users, BookOpen } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Compass,
      title: "Career Guidance",
      description: "Personalized counseling to help you discover the right career path tailored to your strengths and aspirations.",
      gradient: "from-vibrant-blue to-vibrant-teal",
    },
    {
      icon: Users,
      title: "Workshops & Seminars",
      description: "Interactive sessions for schools, colleges, and corporates designed to build essential skills and knowledge.",
      gradient: "from-vibrant-orange to-vibrant-yellow",
    },
    {
      icon: BookOpen,
      title: "Admission Guidance",
      description: "Expert support for navigating college and university admissions with confidence and clarity.",
      gradient: "from-vibrant-teal to-vibrant-blue",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support to guide you through every step of your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-card-border"
              data-testid={`card-service-${index}`}
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 bg-gradient-to-br ${service.gradient} rounded-xl`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
