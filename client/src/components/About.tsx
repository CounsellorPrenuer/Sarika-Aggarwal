import profileUrl from "@assets/profile_1759214045918.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Target, Heart } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-vibrant-blue/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Meet Sarika Agrawal
            </h2>
            <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-4 sm:mb-6">
              Your Dedicated Career Coach and Guide
            </h3>
            <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                As a dedicated Career Coach and Guide, Sarika Agrawal founded DreamBridge to help individuals navigate the often-complex journey from education to career. She is passionate about empowering her clients to bridge the gap between their aspirations and real-world achievements.
              </p>
              <p>
                With extensive experience in career counseling, admissions processes, and conducting impactful workshops, Sarika provides the tools, clarity, and confidence students and professionals need to succeed. Her personalized approach ensures that every individual receives a roadmap tailored to their unique strengths and goals.
              </p>
              <p>
                Whether you're a student exploring career options, a professional seeking growth, or an institution looking for expert guidance, DreamBridge is here to support you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {[
                { icon: Award, label: "Excellence" },
                { icon: Target, label: "Goal-Oriented" },
                { icon: Heart, label: "Passionate" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-3 sm:p-4 bg-card rounded-xl border border-card-border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-br from-vibrant-orange to-vibrant-yellow opacity-20 blur-2xl rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src={profileUrl}
                alt="Sarika Agrawal"
                className="relative rounded-2xl shadow-2xl w-1/4 sm:w-full max-w-sm border-4 border-card-border"
                data-testid="img-profile"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
