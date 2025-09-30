import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllBlogs() {
  const { data: blogsData, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/blogs"],
  });

  const blogs = blogsData?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              All Articles
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Explore our collection of career guidance articles and insights
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogs.map((blog) => (
                <Card 
                  key={blog.id} 
                  className="p-6 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-card-border"
                  data-testid={`card-blog-${blog.id}`}
                >
                  <div className="flex-grow">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`text-blog-title-${blog.id}`}>
                      {blog.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Link href={`/blogs/${blog.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      data-testid={`button-read-blog-${blog.id}`}
                    >
                      Read Full Article
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
