import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  //todo: remove mock functionality
  const articles = [
    {
      title: "Top 5 Mistakes to Avoid in Your College Application",
      excerpt: "Learn about the common pitfalls that students face when applying to colleges and how to avoid them for a successful admission.",
      date: "March 15, 2024",
      category: "Admissions",
    },
    {
      title: "How to Choose a Career You'll Love",
      excerpt: "Discover the key factors to consider when selecting a career path that aligns with your passions, skills, and long-term goals.",
      date: "March 10, 2024",
      category: "Career Guidance",
    },
    {
      title: "The Importance of Skill Development in Today's Job Market",
      excerpt: "Understand why continuous learning and skill development are crucial for staying competitive in the modern workforce.",
      date: "March 5, 2024",
      category: "Professional Development",
    },
  ];

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-vibrant-orange/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Latest Articles
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Insights and tips to help you navigate your career journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                className="p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-card-border hover-elevate h-full flex flex-col group"
                data-testid={`card-article-${index}`}
              >
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{article.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 group-hover:gap-3 transition-all"
                    onClick={() => console.log("Read more:", article.title)}
                    data-testid={`button-read-article-${index}`}
                  >
                    Read <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
