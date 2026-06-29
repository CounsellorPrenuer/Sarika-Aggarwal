import { Card } from "@/components/ui/card";
import { Compass, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { imageUrl, type Service } from "@/lib/sanity";
import { CMS_FALLBACK } from "@/lib/cmsFallback";

const iconGradients = [
  "from-vibrant-blue to-vibrant-teal",
  "from-vibrant-orange to-vibrant-yellow",
  "from-vibrant-teal to-vibrant-blue",
];
const icons = [Compass, Users, BookOpen];

type ServicesProps = {
  cmsServices?: Service[];
};

export default function Services({ cmsServices }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = (cmsServices?.length ? cmsServices : CMS_FALLBACK.services).map((service, index) => ({
    title: service.title,
    description: service.description,
    image: service.image,
    gradient: iconGradients[index % iconGradients.length],
    icon: icons[index % icons.length],
  }));

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-vibrant-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-vibrant-orange/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Our Services</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive support to guide you through every step of your career journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-card-border group h-full overflow-hidden"
                data-testid={`card-service-${index}`}
              >
                {service.image && (
                  <img
                    src={imageUrl(service.image, 600)}
                    alt={service.image.alt || service.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                )}
                <motion.div 
                  className="flex justify-center mb-4 sm:mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`p-3 sm:p-4 bg-gradient-to-br ${service.gradient} rounded-xl shadow-lg relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`} />
                    <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
                  </div>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
