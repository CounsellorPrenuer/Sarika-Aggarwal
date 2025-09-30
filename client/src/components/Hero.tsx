import { Button } from "@/components/ui/button";
import { GraduationCap, Users, School, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-vibrant-blue/10 via-vibrant-teal/10 to-background z-0" />
      
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-vibrant-orange/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-vibrant-yellow/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-vibrant-teal/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4 text-vibrant-yellow" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Building Bridges to Your{" "}
          <span className="bg-gradient-to-r from-vibrant-blue to-vibrant-teal bg-clip-text text-transparent inline-block">
            Dream Career
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl sm:text-2xl md:text-3xl text-primary font-semibold mb-3 sm:mb-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Path from Aspirations to Achievements
        </motion.p>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Expert Career Guidance, Admission Support, and Skill-building Workshops for Students and Professionals
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("services")}
            className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow hover:shadow-xl transition-all text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
            data-testid="button-explore-services"
          >
            Explore Our Services
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="text-base sm:text-lg px-6 sm:px-8 border-2 hover:border-vibrant-orange hover:text-vibrant-orange transition-all backdrop-blur-sm w-full sm:w-auto"
            data-testid="button-book-consultation"
          >
            Book a Free Consultation
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: GraduationCap, value: "10+ Years", label: "of Experience", gradient: "from-vibrant-blue to-vibrant-teal" },
            { icon: Users, value: "1000+", label: "Students Guided", gradient: "from-vibrant-orange to-vibrant-yellow" },
            { icon: School, value: "50+", label: "Partner Schools", gradient: "from-vibrant-teal to-vibrant-blue" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-card-border hover-elevate transition-all"
              data-testid={`stat-${index}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className={`p-3 sm:p-4 bg-gradient-to-br ${stat.gradient} rounded-xl`}>
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{stat.value}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
