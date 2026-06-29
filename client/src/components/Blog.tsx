import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { imageUrl, type BlogPost } from "@/lib/sanity";
import { CMS_FALLBACK } from "@/lib/cmsFallback";

type BlogProps = {
  cmsPosts?: BlogPost[];
};

export default function Blog({ cmsPosts }: BlogProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const articles = (cmsPosts?.length ? cmsPosts : CMS_FALLBACK.blogPosts).slice(0, 6);

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
              key={article._id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-card-border hover-elevate h-full flex flex-col group"
                data-testid={`card-article-${article._id}`}
              >
                {article.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={imageUrl(article.image, 700)}
                      alt={article.image.alt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 group-hover:gap-3 transition-all"
                      >
                        Read <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
            
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/blog">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-vibrant-blue to-vibrant-teal hover:shadow-xl"
              data-testid="button-view-all-blogs"
            >
              View All Blogs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
