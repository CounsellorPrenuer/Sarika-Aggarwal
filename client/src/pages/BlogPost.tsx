import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import type { BlogPost as BlogPostType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost() {
  const params = useParams();
  const blogId = params.id;

  const { data: blogData, isLoading } = useQuery<{ success: boolean; data: BlogPostType }>({
    queryKey: ["/api/blogs", blogId],
    enabled: !!blogId,
  });

  const blog = blogData?.data;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded w-1/4" />
              <div className="h-12 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-32 bg-muted animate-pulse rounded" />
            </div>
          ) : !blog ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-foreground mb-4">Blog post not found</h2>
              <Link href="/blogs">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Blogs
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/blogs">
                <Button variant="ghost" className="gap-2 mb-8" data-testid="button-back-blogs">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Blogs
                </Button>
              </Link>

              <article>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {blog.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-blog-title">
                  {blog.title}
                </h1>

                {blog.imageUrl && (
                  <div className="w-full h-64 sm:h-96 overflow-hidden rounded-lg mb-8">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none" data-testid="text-blog-content">
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {blog.content}
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
