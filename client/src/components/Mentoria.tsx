import { motion } from "framer-motion";
import { Users, Building2, GraduationCap, Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Users,
    value: "3,50,000+",
    label: "Students and Professionals Mentored",
    color: "bg-vibrant-blue",
  },
  {
    icon: Building2,
    value: "240+",
    label: "Corporate Partners",
    color: "bg-vibrant-purple",
  },
  {
    icon: GraduationCap,
    value: "350+",
    label: "Schools and College Partners",
    color: "bg-vibrant-teal",
  },
  {
    icon: Play,
    value: "1000+",
    label: "Hours of Career Webinars",
    color: "bg-vibrant-orange",
  },
];

export default function Mentoria() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="text-vibrant-blue">Mentoria's</span>
            <br />
            <span className="text-vibrant-purple">Career Discovery Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every Leadcrest Consulting plan includes lifetime access to Mentoria: India's most trusted platform for
            career discovery, mentorship, and lifelong upskilling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover-elevate transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted">
                <CardContent className="p-6 text-center">
                  <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Card className="hover-elevate transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted max-w-md w-full">
            <CardContent className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-vibrant-blue">MENTORIA</div>
              </div>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => window.open("https://www.mentoria.com", "_blank")}
                data-testid="button-mentoria-platform"
              >
                Career Discovery Platform
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Click to explore Mentoria's comprehensive career platform
        </motion.p>
      </div>
    </section>
  );
}
