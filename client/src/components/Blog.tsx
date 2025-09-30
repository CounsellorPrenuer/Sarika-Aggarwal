import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

export default function Blog() {
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
    <section id="blog" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and tips to help you navigate your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 border-card-border hover-elevate"
              data-testid={`card-article-${index}`}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => console.log("Read more:", article.title)}
                  data-testid={`button-read-article-${index}`}
                >
                  Read <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
